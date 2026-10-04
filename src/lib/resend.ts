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
    <tr>
      <td style="padding: 24px 32px; background: linear-gradient(135deg, #1e293b, #0f172a); border-bottom: 1px solid #334155;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #38bdf8;">${siteName || "Agency Microsite"} &bull; Instant Lead Alert</span>
        <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">New Client Inquiry Received</h1>
      </td>
    </tr>
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

        <div style="margin-top: 24px; padding: 18px; background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 8px;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 0.08em; margin-bottom: 8px;">Project Requirements & Message:</div>
          <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</p>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re:%20Inquiry%20from%20${encodeURIComponent(fullName)}" style="display: inline-block; background-color: #38bdf8; color: #090d16; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 6px;">
            Reply Directly to Lead &rarr;
          </a>
        </div>
      </td>
    </tr>
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
