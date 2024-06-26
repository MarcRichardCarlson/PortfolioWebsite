// /pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../lib/sequelize';
import Contact from '../../models/Contact';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await sequelize.sync();

  if (req.method === 'POST') {
    const { name, lastName, email, subject, message } = req.body;

    // Basic validation
    if (!name || !lastName || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      const newContact = await Contact.create({
        name,
        lastName,
        email,
        subject,
        message,
      });

      res.status(200).json({ message: 'Form submitted successfully!', data: newContact });
    } catch (error) {
      res.status(500).json({ error: 'Error saving data to the database' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
