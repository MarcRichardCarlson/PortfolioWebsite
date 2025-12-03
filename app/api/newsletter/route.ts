import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod';
import crypto from 'crypto';
import { addSubscriber, getSubscribers, removeSubscriber } from '@/lib/newsletter';

// Constants
const MAX_EMAIL_LENGTH = 254; // RFC 5321 limit
const MAX_REQUEST_SIZE = 10 * 1024; // 10KB
const MAX_ID_LENGTH = 64; // Reasonable limit for subscriber ID

// Input validation schema with length constraints
const newsletterSchema = z.object({
    email: z.string().email().max(MAX_EMAIL_LENGTH, 'Email address is too long'),
});

// Rate limiting configuration
const limiter = rateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500
});

// Secure API key comparison to prevent timing attacks
const secureCompare = (a: string, b: string): boolean => {
    if (!a || !b || a.length !== b.length) {
        return false;
    }
    try {
        return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
    } catch {
        return false;
    }
};

// Get client IP address with validation
const getClientIP = (request: Request): string => {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        // Take the first IP if multiple are present (original client)
        const ips = forwarded.split(',').map(ip => ip.trim());
        // Validate IP format (basic check)
        const validIP = ips.find(ip => {
            // IPv4 or IPv6 basic validation
            return /^[\d.]+$/.test(ip) || /^[\da-f:]+$/i.test(ip);
        });
        if (validIP) return validIP;
    }
    
    // Fallback to other headers
    const realIP = request.headers.get('x-real-ip');
    if (realIP) return realIP;
    
    return 'unknown';
};

// Validate request size
const validateRequestSize = (request: Request): boolean => {
    const contentLength = request.headers.get('content-length');
    if (contentLength) {
        const size = parseInt(contentLength, 10);
        if (size > MAX_REQUEST_SIZE) {
            return false;
        }
    }
    return true;
};

export async function POST(request: Request) {
    try {
        // Validate request size
        if (!validateRequestSize(request)) {
            return NextResponse.json(
                { error: 'Request too large' },
                { status: 413 }
            );
        }

        // Apply rate limiting with validated IP
        const ip = getClientIP(request);
        const isAllowed = await limiter.check(5, `NEWSLETTER_SUBSCRIPTION_${ip}`);

        if (!isAllowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { email } = newsletterSchema.parse(body);

        // Additional email length check
        if (email.length > MAX_EMAIL_LENGTH) {
            return NextResponse.json(
                { error: 'Email address is too long' },
                { status: 400 }
            );
        }

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
        // Check for admin API key with timing-safe comparison
        const apiKey = request.headers.get('x-api-key');
        const expectedKey = process.env.ADMIN_API_KEY;
        
        if (!apiKey || !expectedKey || !secureCompare(apiKey, expectedKey)) {
            // Use same delay to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 100));
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
        // Validate request size
        if (!validateRequestSize(request)) {
            return NextResponse.json(
                { error: 'Request too large' },
                { status: 413 }
            );
        }

        // Apply rate limiting with validated IP
        const ip = getClientIP(request);
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

        // Validate ID format and length
        if (id.length > MAX_ID_LENGTH || !/^[a-f0-9]+$/i.test(id)) {
            return NextResponse.json(
                { error: 'Invalid subscriber ID format' },
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