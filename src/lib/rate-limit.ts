interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
// Only run cleanup in production (not during tests)
if (process.env.NODE_ENV !== "test") {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, value] of store.entries()) {
        if (now > value.resetTime) {
          store.delete(key);
        }
      }
    },
    5 * 60 * 1000,
  );
}

export interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Check if an IP address has exceeded the rate limit.
 */
export function checkRateLimit(
  ip: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const key = ip;

  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + options.windowMs,
    });

    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetTime: now + options.windowMs,
    };
  }

  if (entry.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count += 1;
  store.set(key, entry);

  return {
    allowed: true,
    remaining: options.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client IP from Next.js request headers.
 */
export function getClientIp(req: import("next").NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

/**
 * Reset all rate limit entries (for testing only).
 */
export function resetRateLimitStore(): void {
  store.clear();
}
