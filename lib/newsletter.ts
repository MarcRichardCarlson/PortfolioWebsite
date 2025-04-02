import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Define the schema for subscriber data
const subscriberSchema = z.object({
    email: z.string().email(),
    subscribedAt: z.string(),
    id: z.string()
});

// Define the schema for the entire newsletter data
const newsletterSchema = z.object({
    subscribers: z.array(subscriberSchema)
});

type Subscriber = z.infer<typeof subscriberSchema>;
type NewsletterData = z.infer<typeof newsletterSchema>;

// Define the path for the newsletter data file
const dataDir = path.join(process.cwd(), 'data');
const newsletterPath = path.join(dataDir, 'newsletter.json');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize the newsletter file if it doesn't exist
if (!fs.existsSync(newsletterPath)) {
    fs.writeFileSync(newsletterPath, JSON.stringify({ subscribers: [] }, null, 2));
}

// Read the newsletter data
const readNewsletterData = (): NewsletterData => {
    try {
        const data = fs.readFileSync(newsletterPath, 'utf-8');
        return newsletterSchema.parse(JSON.parse(data));
    } catch (error) {
        console.error('Error reading newsletter data:', error);
        return { subscribers: [] };
    }
};

// Write the newsletter data
const writeNewsletterData = (data: NewsletterData) => {
    try {
        fs.writeFileSync(newsletterPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing newsletter data:', error);
        throw new Error('Failed to save newsletter data');
    }
};

// Add a new subscriber
export const addSubscriber = async (email: string): Promise<Subscriber> => {
    const data = readNewsletterData();

    // Check if email already exists
    if (data.subscribers.some((sub: Subscriber) => sub.email === email)) {
        throw new Error('Email already subscribed');
    }

    const newSubscriber: Subscriber = {
        email,
        subscribedAt: new Date().toISOString(),
        id: crypto.randomBytes(16).toString('hex')
    };

    data.subscribers.push(newSubscriber);
    writeNewsletterData(data);

    return newSubscriber;
};

// Get all subscribers (admin only)
export const getSubscribers = async (): Promise<Subscriber[]> => {
    const data = readNewsletterData();
    return data.subscribers;
};

// Remove a subscriber
export const removeSubscriber = async (id: string): Promise<void> => {
    const data = readNewsletterData();
    const initialLength = data.subscribers.length;

    data.subscribers = data.subscribers.filter((sub: Subscriber) => sub.id !== id);

    if (data.subscribers.length === initialLength) {
        throw new Error('Subscriber not found');
    }

    writeNewsletterData(data);
}; 