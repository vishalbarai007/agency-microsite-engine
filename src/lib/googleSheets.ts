export interface GoogleSheetLeadPayload {
  timestamp?: string;
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export async function appendLeadToGoogleSheet(payload: GoogleSheetLeadPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("[Google Sheets Warning]: GOOGLE_SHEETS_WEBHOOK_URL not configured. Skipping sheet dispatch.");
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: payload.timestamp || new Date().toISOString(),
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone || "Not Provided",
        service: payload.service,
        message: payload.message
      }),
      cache: "no-store"
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Google Sheets Webhook Error]:", res.status, errText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Google Sheets Network Error]:", error);
    return false;
  }
}
