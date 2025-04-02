interface RateLimitConfig {
    interval: number;
    uniqueTokenPerInterval: number;
}

interface RateLimitInfo {
    count: number;
    resetTime: number;
}

class RateLimiter {
    private store: Map<string, RateLimitInfo>;
    private config: RateLimitConfig;

    constructor(config: RateLimitConfig) {
        this.store = new Map();
        this.config = config;
    }

    async check(limit: number, token: string): Promise<boolean> {
        const now = Date.now();
        const info = this.store.get(token);

        if (!info) {
            this.store.set(token, {
                count: 1,
                resetTime: now + this.config.interval,
            });
            return true;
        }

        if (now > info.resetTime) {
            this.store.set(token, {
                count: 1,
                resetTime: now + this.config.interval,
            });
            return true;
        }

        if (info.count >= limit) {
            return false;
        }

        info.count += 1;
        return true;
    }
}

export function rateLimit(config: RateLimitConfig): RateLimiter {
    return new RateLimiter(config);
} 