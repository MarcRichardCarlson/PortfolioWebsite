import { NextResponse } from 'next/server';
import axios from 'axios';
import { rateLimit } from '@/lib/rate-limit';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_BASE_URL;

if (!API_KEY || !BASE_URL) {
    throw new Error('Missing API key or base URL for weather service');
}

export async function GET(request: Request) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const { success } = await rateLimit(ip);

        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429 }
            );
        }

        // Input validation
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');

        if (!city || typeof city !== 'string' || city.length > 100) {
            return NextResponse.json(
                { error: 'Invalid city parameter' },
                { status: 400 }
            );
        }

        // Sanitize input
        const sanitizedCity = city.replace(/[^a-zA-Z\s-]/g, '');

        const response = await axios.get(BASE_URL, {
            params: {
                q: sanitizedCity,
                appid: API_KEY,
                units: 'metric',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Weather API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
} 