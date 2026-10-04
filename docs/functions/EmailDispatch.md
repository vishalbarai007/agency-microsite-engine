# Real-Time Email Dispatch via Resend API

## 1. Executive Summary
The Email Dispatch module delivers instant sales lead alerts directly to the client's inbox the second a prospect submits an inquiry on the microsite. By utilizing the modern **Resend REST API** directly inside Next.js Server Actions, this module eliminates the fragility of legacy SMTP servers (which frequently break due to app password expirations or Gmail security locks) and guarantees sub-3-second delivery with clean, mobile-responsive HTML templates.

---

## 2. Tech Stack & Dependencies

| Tool | Purpose | Advantage |
| :--- | :--- | :--- |
| **Resend REST API** | Transactional email delivery | Works natively in Edge/Serverless runtimes with simple HTTP POST requests |
| **Next.js Server Action** | Background dispatcher | Keeps `RESEND_API_KEY` completely hidden from the browser |
| **Inline Styled HTML Template** | Lead display layout | Compatible across Apple Mail, Gmail, Outlook, and mobile email apps |

---

## 3. Why Resend Over Legacy Nodemailer / Gmail SMTP?

1. **Zero Cold-Start Latency**: Legacy SMTP requires opening TCP sockets and performing multi-step handshakes (`EHLO`, `STARTTLS`, `AUTH LOGIN`). On serverless runtimes (Vercel, AWS Lambda), this causes 3 to 6 second delays and frequent timeouts. Resend uses a single HTTPS POST request completed in under 250ms.
2. **No Fragile App Passwords**: Using personal Gmail accounts with Nodemailer requires generating Google App Passwords that frequently expire, trigger 2FA re-verification locks, or get flagged as suspicious activity by Google security.
3. **DKIM & SPF Authentication**: Resend lets clients verify their custom domain with DNS records (`resend._domainkey`), ensuring lead alerts never land in spam folders.
4. **Free Tier**: Resend provides 3,000 emails/month free, which is more than enough for static agency microsites.

---

## 4. Email Dispatch Implementation Code (`src/lib/resend.ts`)

```typescript
/**
 * Utility to dispatch lead notification emails via Resend
 */
export interface LeadEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  timestamp: string;
  siteName?: string;
}

export async function sendLeadNotificationEmail(payload: LeadEmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_DESTINATION_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "Microsite Lead <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.warn("[Resend Warning]: Missing RESEND_API_KEY or NOTIFICATION_DESTINATION_EMAIL in env. Skipping email dispatch.");
    return false;
  }

  const { fullName, email, phone, service, message, timestamp, siteName } = payload;
  const subject = `🔥 New Lead: ${fullName} - ${service}`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Lead</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090d16; margin: 0; padding: 24px; color: #f8fafc;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #111827; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">
    <!-- Header -->
    <tr>
      <td style="padding: 24px 32px; background: linear-gradient(135deg, #1e293b, #0f172a); border-bottom: 1px solid #334155;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #38bdf8;">${siteName || "Agency Microsite"} &bull; Instant Lead Alert</span>
        <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">New Client Inquiry Received</h1>
      </td>
    </tr>

    <!-- Lead Info Table -->
    <tr>
      <td style="padding: 24px 32px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="35%" style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Prospect Name:</td>
            <td width="65%" style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: 700; border-bottom: 1px solid #1e293b;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Email Address:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1e293b;">
              <a href="mailto:${email}" style="color: #38bdf8; font-size: 14px; text-decoration: none; font-weight: 600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Phone:</td>
            <td style="padding: 10px 0; color: #ffffff; font-size: 14px; border-bottom: 1px solid #1e293b;">
              ${phone ? `<a href="tel:${phone}" style="color: #38bdf8; text-decoration: none;">${phone}</a>` : '<span style="color: #64748b;">Not provided</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Service / Interest:</td>
            <td style="padding: 10px 0; color: #34d399; font-size: 14px; font-weight: 700; border-bottom: 1px solid #1e293b;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600;">Submission Time:</td>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">${timestamp}</td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="margin-top: 24px; padding: 18px; background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 8px;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 0.08em; margin-bottom: 8px;">Project Requirements & Message:</div>
          <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</p>
        </div>

        <!-- Quick Reply CTA -->
        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re:%20Inquiry%20from%20${encodeURIComponent(fullName)}" style="display: inline-block; background-color: #38bdf8; color: #090d16; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 6px;">
            Reply Directly to Lead &rarr;
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 16px 32px; background-color: #0b0f19; text-align: center; border-top: 1px solid #1e293b;">
        <span style="font-size: 12px; color: #64748b;">Automated lead capture powered by Agency Microsite Engine</span>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        html: htmlBody
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Resend API Error]:", response.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Resend Network Error]:", error);
    return false;
  }
}
```

---

## 5. Environment Variables Configuration

Add these variables to `.env.local` and your Vercel project settings:

```env
# Resend API Key from https://resend.com/api-keys
RESEND_API_KEY="re_123456789_abcdefg"

# Destination email inbox where the client wants to receive inquiries
NOTIFICATION_DESTINATION_EMAIL="sales@clientdomain.com"

# Verified sender email (Use onboarding@resend.dev during testing)
FROM_EMAIL="Inquiries <onboarding@resend.dev>"
```

---

## 6. Testing & Quality Verification

1. **Verify Sender Domain**: In Resend Dashboard &rarr; Domains &rarr; Add custom domain and paste the 3 DNS records (TXT, MX, CNAME) into Cloudflare/GoDaddy.
2. **Instant Test**: Fill the frontend contact form and click submit.
3. Check target inbox:
   - Email subject should be `🔥 New Lead: [Name] - [Service]`.
   - Clicking "Reply" should immediately pre-populate the prospect's email address as the recipient due to `reply_to: email`.
