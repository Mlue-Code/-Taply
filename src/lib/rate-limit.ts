interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

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

export interface RateLimitOptions {
  maxRequests: number; // Max requests allowed
  windowMs: number; // Time window in milliseconds
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Check if an IP address has exceeded the rate limit.
 *
 * @param ip - The client IP address
 * @param options - Rate limit configuration
 * @returns Whether the request is allowed
 */
export function checkRateLimit(
  ip: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const key = ip;

  const entry = store.get(key);

  // First request or window expired
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

  // Window still active
  if (entry.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment counter
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
    // x-forwarded-for can be "ip1, ip2, ip3" - take first
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}
