import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const saveEmailToNewsletter = (email: string) => {
  const newsletterFilePath = path.resolve(process.cwd(), 'newsletterSubscribers.json');
  let existingEmails: string[] = [];

  if (fs.existsSync(newsletterFilePath)) {
    const fileContent = fs.readFileSync(newsletterFilePath, 'utf8');
    existingEmails = JSON.parse(fileContent);
  }

  if (!existingEmails.includes(email)) {
    existingEmails.push(email);
    fs.writeFileSync(newsletterFilePath, JSON.stringify(existingEmails, null, 2), 'utf8');
    console.log(`Email ${email} added to the newsletter list.`);
  } else {
    console.log(`Email ${email} already exists in the newsletter list.`);
  }
};

const sendNewsletter = async (emails: string[]) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject: 'Our Latest Newsletter!',
    text: 'Here is our latest newsletter. Stay tuned for more updates!',
    html: '<p><strong>Our Latest Newsletter</strong></p><p>Stay tuned for more updates!</p>',
  };

  await transporter.sendMail(mailOptions);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestApiKey = req.headers['x-api-key']; // Retrieve the API key from headers

  // Verify API Key
  if (!requestApiKey || requestApiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      saveEmailToNewsletter(email);
      res.status(200).json({ message: 'Email saved to newsletter list' });
    } catch (error) {
      console.error('Error saving email to newsletter list:', error);
      res.status(500).json({ error: 'Failed to save email to newsletter list' });
    }
  } else if (req.method === 'GET') {
    const newsletterFilePath = path.resolve(process.cwd(), 'newsletterSubscribers.json');

    try {
      if (!fs.existsSync(newsletterFilePath)) {
        return res.status(404).json({ error: 'No subscribers found.' });
      }

      const fileContent = fs.readFileSync(newsletterFilePath, 'utf8');
      const subscribers = JSON.parse(fileContent);

      if (subscribers.length === 0) {
        return res.status(404).json({ error: 'No subscribers found.' });
      }

      // Send the newsletter
      await sendNewsletter(subscribers);

      res.status(200).json({ message: 'Newsletter sent successfully to all subscribers.' });
    } catch (error) {
      console.error('Error reading or sending newsletters:', error);
      res.status(500).json({ error: 'Failed to send the newsletter.' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
