"server-only";
"use server";

import { newsletterSchema, NewsletterFormData } from "@/types/formSchemas";
import { appendLeadToGoogleSheet } from "@/lib/googleSheets";

export async function submitNewsletter(data: NewsletterFormData): Promise<{ success: boolean; message: string }> {
  const validation = newsletterSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Please provide a valid email address." };
  }

  if (validation.data.honeypot && validation.data.honeypot.trim().length > 0) {
    return { success: true, message: "Subscribed!" };
  }

  await appendLeadToGoogleSheet({
    fullName: "Newsletter Subscriber",
    email: validation.data.email,
    service: "Newsletter Subscription",
    message: "Requested periodic architectural case studies and private release alerts."
  });

  return { success: true, message: "Thank you for subscribing to our private dispatches." };
}
