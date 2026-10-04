import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be less than 80 characters."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+() -]{7,20}$/, "Please provide a valid phone number (min 7 digits).")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .min(1, "Please select an area of interest."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(1500, "Message cannot exceed 1500 characters."),
  honeypot: z
    .string()
    .max(0, "Bot detected.")
    .optional()
    .or(z.literal(""))
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address."),
  honeypot: z.string().max(0).optional().or(z.literal(""))
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
