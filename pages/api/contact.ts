import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import validator from 'email-validator';

const newsletterFilePath = path.resolve(process.cwd(), 'newsletterSubscribers.json');

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
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute
  message: { error: 'Too many requests, please try again later.' },
});

// Save email to newsletter list
const saveEmailToNewsletter = (email: string) => {
  try {
    let existingEmails: string[] = [];

    // Read existing emails if file exists
    if (fs.existsSync(newsletterFilePath)) {
      const fileContent = fs.readFileSync(newsletterFilePath, 'utf8');
      existingEmails = JSON.parse(fileContent);
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
  }
};


// Input sanitization
const sanitizeInput = (input: string) => input.replace(/[<>`"'&;]/g, '');

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await limiter(req, res, () => {}); // Apply rate limiting

  if (req.method === 'POST') {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const { name, lastName, email, subject, message, agreeToNewsletter } = req.body;

    // Validate email
    if (!validator.validate(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedLastName = sanitizeInput(lastName);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedSubject = sanitizeInput(subject);

    // Prepare email options
    const mailOptions = {
      from: email,
      to: process.env.RECIVER_EMAIL,
      subject: `Contact Form Submission: ${sanitizedSubject}`,
      text: `You have a new message from ${sanitizedName} ${sanitizedLastName} (${email}): \n\n${sanitizedMessage}`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');

      // Save to newsletter if agreed
      if (agreeToNewsletter) {
        saveEmailToNewsletter(email);
      }

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
