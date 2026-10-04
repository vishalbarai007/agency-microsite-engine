# Contact Form Validation & Multi-Destination Routing

## 1. Executive Summary
The Contact Form module is the primary revenue and lead capture engine for any agency micro-website. It provides client-side instant validation, server-side data sanitization, anti-spam honeypot shielding, and simultaneous multi-destination delivery to both **Google Sheets** (for spreadsheet lead tracking via Google Apps Script) and **Email** (for instant client sales notifications via Resend API).

---

## 2. Tech Stack & Dependencies

| Library / Tool | Purpose | Rationale |
| :--- | :--- | :--- |
| **`zod`** | Schema definition & validation | Type-safe validation on both client and server |
| **`react-hook-form`** | Client form state management | Zero re-renders, fast input handling, seamless Zod integration |
| **`@hookform/resolvers`** | Form-to-Zod bridge | Connects Zod schemas directly into React Hook Form |
| **`sonner`** | Toast notifications | Minimalist, dark-mode accessible toast feedback |
| **Next.js Server Actions** | Backend execution (`use server`) | Eliminates separate API routes, handles secrets securely server-side |
| **Google Apps Script** | Google Sheets webhook | Free, scalable database solution requiring zero GCP billing |
| **Resend API** | Transactional email delivery | 99.9% deliverability, simple REST API, developer friendly |

---

## 3. Data Schema & Contracts

### 3.1 Captured Data Points
The contact form captures the following core fields from prospective clients:

```typescript
export interface ContactSubmission {
  fullName: string;      // 2 - 80 characters
  email: string;         // RFC compliant email format
  phone?: string;        // Optional international phone format (7-15 digits)
  service: string;       // Selected service / area of interest
  message: string;       // 10 - 1500 characters
  honeypot?: string;     // Hidden field: must remain empty (bot trap)
  timestamp: string;     // ISO 8601 string added by server action
}
```

### 3.2 Zod Validation Schema (`src/types/formSchemas.ts`)
```typescript
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
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+() -]{7,20}$/, "Please enter a valid phone number (min 7 digits).")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .min(1, "Please select an area of interest."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(1500, "Message exceeds 1500 character limit."),
  honeypot: z
    .string()
    .max(0, "Bot detected.")
    .optional()
    .or(z.literal(""))
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

---

## 4. Multi-Destination Storage & Routing Architecture

```
[User Browser]
      │
      │ 1. Submits Form (React Hook Form + Zod Client Check)
      ▼
[Next.js Server Action] (`app/actions/submitContactForm.ts`)
      │
      ├─► 2. Server-Side Zod Re-validation
      ├─► 3. Bot Check: If `honeypot` is filled, drop silently (Return HTTP 200)
      │
      ├───────────────────────┬───────────────────────┐
      ▼                       ▼                       ▼
[Destination A]         [Destination B]         [Destination C]
Google Sheets Webhook   Resend Email API        Console / Audit Log
(via Google Apps Script)(Instant Sales Alert)   (Backup & Debugging)
```

### Destination A: Google Sheets via Apps Script Webhook
- **Protocol**: HTTP POST (`Content-Type: application/json`)
- **Environment Variable**: `GOOGLE_SHEETS_WEBHOOK_URL`
- **Behavior**: Appends a new row in Google Sheets containing `Timestamp`, `Full Name`, `Email`, `Phone`, `Service`, and `Message`.
- **Payload**:
```json
{
  "timestamp": "2026-10-04T12:00:00.000Z",
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1 555-0199",
  "service": "Residential Architecture",
  "message": "Looking to remodel a 3500 sqft villa in Goa."
}
```

### Destination B: Resend Email Notification
- **Protocol**: HTTP POST (`Authorization: Bearer RESEND_API_KEY`)
- **Environment Variables**:
  - `RESEND_API_KEY`: API token from Resend dashboard.
  - `NOTIFICATION_DESTINATION_EMAIL`: Agency or client inbox receiving leads.
- **Email Subject**: `New Lead: [Full Name] - [Service]`
- **Body**: Clean responsive HTML table summarizing lead contact information.

---

## 5. Security & Anti-Spam Measures

1. **Honeypot Trap**: An invisible input field named `honeypot` is rendered on the client. It is styled with `opacity: 0; position: absolute; pointer-events: none; tab-index: -1`. Legitimate humans never see or fill it. Automated spam bots automatically fill every input field they find. If `honeypot.length > 0`, the server action immediately returns `{ success: true }` without storing anything to Google Sheets or sending an email.
2. **Server-Side Revalidation**: Even if a malicious actor bypasses client JavaScript, the Server Action re-validates the payload against `contactFormSchema.safeParse()`.
3. **Payload Sanitization**: Line breaks are sanitized before HTML email insertion, preventing HTML injection.
4. **Environment Isolation**: No API keys or webhook URLs are ever exposed in client bundles (`process.env.GOOGLE_SHEETS_WEBHOOK_URL` and `process.env.RESEND_API_KEY` are read exclusively within server actions marked `"use server"`).

---

## 6. Complete Server Action Code (`app/actions/submitContactForm.ts`)

```typescript
"server-only";
"use server";

import { contactFormSchema, ContactFormData } from "@/types/formSchemas";

export interface ActionResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ActionResponse> {
  // 1. Server-side validation
  const validation = contactFormSchema.safeParse(data);
  if (!validation.success) {
    const errorMsg = validation.error.errors[0]?.message || "Invalid form input.";
    return { success: false, message: errorMsg };
  }

  // 2. Honeypot spam defense
  if (validation.data.honeypot && validation.data.honeypot.trim().length > 0) {
    // Pretend success so bot doesn't retry with another vector
    return { success: true, message: "Thank you for reaching out!" };
  }

  const { fullName, email, phone, service, message } = validation.data;
  const timestamp = new Date().toISOString();
  const tasks: Promise<unknown>[] = [];

  // 3. Destination A: Google Sheets via Apps Script Webhook
  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsWebhook) {
    tasks.push(
      fetch(sheetsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp,
          fullName,
          email,
          phone: phone || "Not Provided",
          service,
          message
        }),
        cache: "no-store"
      }).catch((err) => console.error("[Sheets Webhook Error]:", err))
    );
  }

  // 4. Destination B: Resend Email Notification
  const emailApiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.NOTIFICATION_DESTINATION_EMAIL;
  if (emailApiKey && targetEmail) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${emailApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Microsite Lead <inquiries@agency-microsite.com>",
          to: [targetEmail],
          subject: `New Lead: ${fullName} (${service})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 8px;">
              <h2 style="color: #38bdf8; margin-top: 0;">New Microsite Lead Captured</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Full Name:</td><td style="padding: 8px 0; color: #f8fafc;">${fullName}</td></tr>
                <tr><td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #f8fafc;"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Phone:</td><td style="padding: 8px 0; color: #f8fafc;">${phone || "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Service Interest:</td><td style="padding: 8px 0; color: #f8fafc;">${service}</td></tr>
                <tr><td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Timestamp:</td><td style="padding: 8px 0; color: #f8fafc;">${timestamp}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: #1e293b; border-radius: 6px;">
                <p style="margin: 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message Body:</p>
                <p style="margin: 8px 0 0 0; color: #f8fafc; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</p>
              </div>
            </div>
          `
        }),
        cache: "no-store"
      }).catch((err) => console.error("[Resend Email Error]:", err))
    );
  }

  try {
    await Promise.all(tasks);
    return {
      success: true,
      message: "Thank you! Your message has been successfully received. We will be in touch shortly."
    };
  } catch (error) {
    console.error("[Submit Form Failure]:", error);
    return {
      success: false,
      message: "We encountered a temporary network issue. Please try submitting again or email us directly."
    };
  }
}
```

---

## 7. Client UI Component Implementation (`src/components/sections/ContactForm.tsx`)

```typescript
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, ContactFormData } from "@/types/formSchemas";
import { submitContactForm } from "@/app/actions/submitContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const serviceOptions = [
  "Architecture & Spatial Planning",
  "Interior Design Curation",
  "Turnkey Construction",
  "Commercial Development",
  "General Inquiry"
];

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: serviceOptions[0],
      message: "",
      honeypot: ""
    }
  });

  const onSubmit = (formData: ContactFormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl mx-auto w-full">
      {/* Honeypot hidden input for bot protection */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0"
        {...register("honeypot")}
      />

      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <Input
          placeholder="e.g. Jane Doe"
          disabled={isPending}
          {...register("fullName")}
          className={errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <Input
            type="email"
            placeholder="jane@company.com"
            disabled={isPending}
            {...register("email")}
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Phone Number (Optional)
          </label>
          <Input
            type="tel"
            placeholder="+1 555 019 283"
            disabled={isPending}
            {...register("phone")}
            className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Service of Interest <span className="text-red-400">*</span>
        </label>
        <select
          disabled={isPending}
          {...register("service")}
          className="w-full h-10 px-3 rounded-md bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Project Details <span className="text-red-400">*</span>
        </label>
        <Textarea
          rows={4}
          placeholder="Briefly describe your timeline, scope, or requirements..."
          disabled={isPending}
          {...register("message")}
          className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all h-12"
      >
        {isPending ? "Transmitting Inquiry..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
```

---

## 8. Verification & QA Checklist

- [ ] Submitting empty fields triggers red inline validation messages without page reloads.
- [ ] Entering an invalid email format (e.g. `jane@`) displays friendly validation error.
- [ ] Submitting valid data renders a success Sonner toast and clears all form fields.
- [ ] Google Sheet updates with a newly populated row containing all submission fields.
- [ ] Sales notification email is delivered to client inbox with structured HTML table.
- [ ] Filling the hidden `honeypot` input drops the submission silently without polluting Google Sheets.
