import crypto from 'crypto';

// Generate secure random tokens
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// Hash sensitive data
export function hashData(data: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(data, actualSalt, 10000, 64, 'sha512');
  return `${actualSalt}:${hash.toString('hex')}`;
}

// Verify hashed data
export function verifyHash(data: string, hashedData: string): boolean {
  const [salt, hash] = hashedData.split(':');
  const verifyHash = crypto.pbkdf2Sync(data, salt, 10000, 64, 'sha512');
  return hash === verifyHash.toString('hex');
}

// Sanitize HTML content
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Rate limiting helper
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000 // 1 minute
  ) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Get existing requests for this identifier
    const requests = this.requests.get(identifier) || [];
    
    // Filter out old requests
    const recentRequests = requests.filter(time => time > windowStart);
    
    // Check if under limit
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

// CSRF token generation and validation
export class CSRFProtection {
  private static secret = process.env.CSRF_SECRET || 'default-secret-change-in-production';
  
  static generateToken(sessionId: string): string {
    const timestamp = Date.now().toString();
    const data = `${sessionId}:${timestamp}`;
    const signature = crypto
      .createHmac('sha256', this.secret)
      .update(data)
      .digest('hex');
    
    return Buffer.from(`${data}:${signature}`).toString('base64');
  }
  
  static validateToken(token: string, sessionId: string, maxAge: number = 3600000): boolean {
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const [receivedSessionId, timestamp, signature] = decoded.split(':');
      
      // Check session ID
      if (receivedSessionId !== sessionId) {
        return false;
      }
      
      // Check age
      const tokenAge = Date.now() - parseInt(timestamp);
      if (tokenAge > maxAge) {
        return false;
      }
      
      // Verify signature
      const data = `${receivedSessionId}:${timestamp}`;
      const expectedSignature = crypto
        .createHmac('sha256', this.secret)
        .update(data)
        .digest('hex');
      
      return signature === expectedSignature;
    } catch {
      return false;
    }
  }
}

// Input validation helpers
export const validators = {
  slug: (value: string): boolean => /^[a-z0-9-]+$/.test(value),
  alphanumeric: (value: string): boolean => /^[a-zA-Z0-9]+$/.test(value),
  safeString: (value: string): boolean => /^[a-zA-Z0-9\s\-_.]+$/.test(value),
  phoneNumber: (value: string): boolean => /^\+?[\d\s\-()]+$/.test(value),
};
