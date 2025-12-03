import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import validator from 'email-validator';
import { rateLimit } from '@/lib/rate-limit';

const newsletterFilePath = path.resolve(process.cwd(), 'newsletterSubscribers.json');

// Constants for input validation
const MAX_FIELD_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_REQUEST_SIZE = 10 * 1024; // 10KB

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rate limiter: limit each IP to 5 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
});

// Secure API key comparison to prevent timing attacks
const secureCompare = (a: string, b: string): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
};

// Get client IP address with validation
const getClientIP = (req: NextApiRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    // Take the first IP if multiple are present (original client)
    const ips = forwarded.split(',').map(ip => ip.trim());
    // Validate IP format (basic check)
    const validIP = ips.find(ip => /^[\d.]+$/.test(ip) || /^[\da-f:]+$/i.test(ip));
    if (validIP) return validIP;
  }
  return req.socket?.remoteAddress || 'unknown';
};

// Enhanced input sanitization - removes dangerous characters and normalizes
const sanitizeInput = (input: string, maxLength: number = MAX_FIELD_LENGTH): string => {
  if (typeof input !== 'string') return '';
  
  // Truncate to max length first
  let sanitized = input.slice(0, maxLength);
  
  // Remove control characters, null bytes, and dangerous characters
  sanitized = sanitized
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/[\uFEFF]/g, '') // Remove BOM
    .replace(/[<>`"'&;]/g, '') // Remove HTML/script injection chars
    .replace(/[\r\n\t]/g, ' ') // Normalize whitespace
    .trim();
  
  return sanitized;
};

// Sanitize email address to prevent header injection
const sanitizeEmail = (email: string): string => {
  // Remove newlines, carriage returns, and other dangerous characters
  return email.replace(/[\r\n\t<>]/g, '').trim();
};

// Validate input length
const validateLength = (input: string, maxLength: number, fieldName: string): void => {
  if (input.length > maxLength) {
    throw new Error(`${fieldName} exceeds maximum length of ${maxLength} characters`);
  }
};

// Save email to newsletter list with improved security
const saveEmailToNewsletter = (email: string) => {
  try {
    // Validate email path to prevent directory traversal
    const resolvedPath = path.resolve(process.cwd(), 'newsletterSubscribers.json');
    if (!resolvedPath.startsWith(process.cwd())) {
      throw new Error('Invalid file path');
    }

    let existingEmails: string[] = [];

    // Read existing emails if file exists
    if (fs.existsSync(newsletterFilePath)) {
      const fileContent = fs.readFileSync(newsletterFilePath, 'utf8');
      // Validate JSON structure
      try {
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed)) {
          existingEmails = parsed;
        }
      } catch (parseError) {
        console.error('Error parsing newsletter file:', parseError);
        existingEmails = [];
      }
    }

    // Avoid duplicates
    if (!existingEmails.includes(email)) {
      existingEmails.push(email);
      fs.writeFileSync(newsletterFilePath, JSON.stringify(existingEmails, null, 2), 'utf8');
      console.log(`Email ${email} added to the newsletter list.`);
    } else {
      console.log(`Email ${email} already exists in the newsletter list.`);
    }
  } catch (error) {
    console.error('Error saving email to newsletter list:', error);
    throw error;
  }
};

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check request size
  const contentLength = req.headers['content-length'];
  if (contentLength && parseInt(contentLength, 10) > MAX_REQUEST_SIZE) {
    return res.status(413).json({ error: 'Request too large' });
  }

  // Apply rate limiting
  const clientIP = getClientIP(req);
  const isAllowed = await limiter.check(5, `CONTACT_FORM_${clientIP}`);
  
  if (!isAllowed) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }

  if (req.method === 'POST') {
    // Public endpoint - protected by rate limiting only
    // No API key required for public contact form
    try {
      const { name, lastName, email, subject, message, agreeToNewsletter } = req.body;

      // Validate required fields
      if (!name || !lastName || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      // Validate and sanitize email
      const sanitizedEmail = sanitizeEmail(email);
      if (!validator.validate(sanitizedEmail)) {
        return res.status(400).json({ error: 'Invalid email address.' });
      }

      // Validate and sanitize inputs with length checks
      validateLength(name, MAX_FIELD_LENGTH, 'Name');
      validateLength(lastName, MAX_FIELD_LENGTH, 'Last name');
      validateLength(subject, MAX_FIELD_LENGTH, 'Subject');
      validateLength(message, MAX_MESSAGE_LENGTH, 'Message');

      const sanitizedName = sanitizeInput(name, MAX_FIELD_LENGTH);
      const sanitizedLastName = sanitizeInput(lastName, MAX_FIELD_LENGTH);
      const sanitizedMessage = sanitizeInput(message, MAX_MESSAGE_LENGTH);
      const sanitizedSubject = sanitizeInput(subject, MAX_FIELD_LENGTH);

      // Validate recipient email
      const recipientEmail = process.env.RECIVER_EMAIL;
      if (!recipientEmail || !validator.validate(recipientEmail)) {
        console.error('Invalid recipient email configuration');
        return res.status(500).json({ error: 'Server configuration error.' });
      }

      // Prepare email options with sanitized email in from field
      // Use a safe from address to prevent header injection
      const mailOptions = {
        from: `"${sanitizedName} ${sanitizedLastName}" <${sanitizedEmail}>`,
        replyTo: sanitizedEmail, // Use replyTo for actual email
        to: recipientEmail,
        subject: `Contact Form Submission: ${sanitizedSubject}`,
        text: `You have a new message from ${sanitizedName} ${sanitizedLastName} (${sanitizedEmail}): \n\n${sanitizedMessage}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');

      // Save to newsletter if agreed
      if (agreeToNewsletter === true) {
        saveEmailToNewsletter(sanitizedEmail);
      }

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      if (error instanceof Error && error.message.includes('exceeds maximum length')) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
