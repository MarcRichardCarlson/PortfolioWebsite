import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod';
import { addSubscriber, getSubscribers, removeSubscriber } from '@/lib/newsletter';

// Input validation schema
const newsletterSchema = z.object({
    email: z.string().email(),
});

// Rate limiting configuration
const limiter = rateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500
});

export async function POST(request: Request) {
    try {
        // Apply rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const isAllowed = await limiter.check(5, `NEWSLETTER_SUBSCRIPTION_${ip}`);

        if (!isAllowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { email } = newsletterSchema.parse(body);

        // Add subscriber
        const subscriber = await addSubscriber(email);

        return NextResponse.json(
            { message: 'Successfully subscribed to newsletter', subscriber },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }
        if (error instanceof Error && error.message === 'Email already subscribed') {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 409 }
            );
        }
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe to newsletter' },
            { status: 500 }
        );
    }
}

// Admin-only endpoint to get subscribers
export async function GET(request: Request) {
    try {
        // Check for admin API key
        const apiKey = request.headers.get('x-api-key');
        if (apiKey !== process.env.ADMIN_API_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const subscribers = await getSubscribers();
        return NextResponse.json({ subscribers });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subscribers' },
            { status: 500 }
        );
    }
}

// Endpoint to unsubscribe
export async function DELETE(request: Request) {
    try {
        // Apply rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const isAllowed = await limiter.check(5, `NEWSLETTER_UNSUBSCRIPTION_${ip}`);

        if (!isAllowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Subscriber ID is required' },
                { status: 400 }
            );
        }

        await removeSubscriber(id);
        return NextResponse.json(
            { message: 'Successfully unsubscribed from newsletter' }
        );
    } catch (error) {
        if (error instanceof Error && error.message === 'Subscriber not found') {
            return NextResponse.json(
                { error: 'Subscriber not found' },
                { status: 404 }
            );
        }
        console.error('Newsletter unsubscription error:', error);
        return NextResponse.json(
            { error: 'Failed to unsubscribe from newsletter' },
            { status: 500 }
        );
    }
} 