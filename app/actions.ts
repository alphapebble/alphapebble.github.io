"use server";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input sanitization function
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function subscribeAction(formData: FormData) {
  try {
    // Honeypot check
    if (formData.get("confirm_email")) {
      return { success: true };
    }

    const email = formData.get("email");
    const firstName = formData.get("firstname");
    const company = formData.get("company");

    // Validation
    if (!email || typeof email !== "string") {
      return { error: "A valid email is required." };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { error: "Please enter a valid email address." };
    }

    // Rate limiting
    if (!checkRateLimit(email)) {
      return { error: "Too many requests. Please try again later." };
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedFirstName = firstName
      ? sanitizeInput(firstName as string)
      : "";
    const sanitizedCompany = company ? sanitizeInput(company as string) : "";

    // Log subscription (in production, use proper logging service)
    console.log("New Subscription:", {
      email: sanitizedEmail,
      firstName: sanitizedFirstName,
      company: sanitizedCompany,
      timestamp: new Date().toISOString(),
    });

    // Here you would integrate with a service like Resend
    // try {
    //   await resend.emails.send({ ... });
    //   return { success: true };
    // } catch (error) {
    //   return { error: 'Something went wrong.' };
    // }

    // Simulate processing time
    await new Promise((res) => setTimeout(res, 1000));

    return { success: true };
  } catch (error) {
    console.error("Subscription error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
