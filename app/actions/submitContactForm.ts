"server-only";
"use server";

import { contactFormSchema, ContactFormData } from "@/types/formSchemas";
import { appendLeadToGoogleSheet } from "@/lib/googleSheets";
import { sendLeadNotificationEmail } from "@/lib/resend";
import { siteConfig } from "@/data/siteConfig";

export interface ActionResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ActionResponse> {
  // 1. Zod Server-side Validation
  const validation = contactFormSchema.safeParse(data);
  if (!validation.success) {
    const errorMsg = validation.error.errors[0]?.message || "Invalid form values submitted.";
    return { success: false, message: errorMsg };
  }

  // 2. Honeypot check for automated spam bots
  if (validation.data.honeypot && validation.data.honeypot.trim().length > 0) {
    // Pretend success so bot doesn't retry with another vector
    return { success: true, message: "Thank you for reaching out!" };
  }

  const { fullName, email, phone, service, message } = validation.data;
  const timestamp = new Date().toISOString();

  // 3. Multi-Destination Broadcast (Google Sheets + Resend Email)
  const tasks: Promise<boolean>[] = [];

  // Destination A: Google Sheets
  tasks.push(
    appendLeadToGoogleSheet({
      timestamp,
      fullName,
      email,
      phone,
      service,
      message
    })
  );

  // Destination B: Resend Email
  tasks.push(
    sendLeadNotificationEmail({
      fullName,
      email,
      phone,
      service,
      message,
      timestamp,
      siteName: siteConfig.name
    })
  );

  try {
    await Promise.all(tasks);
    return {
      success: true,
      message: "Thank you! Your inquiry has been received. Our team will contact you shortly."
    };
  } catch (error) {
    console.error("[Submit Contact Form Error]:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again or reach out directly via email."
    };
  }
}
