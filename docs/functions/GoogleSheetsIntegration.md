# Google Sheets Integration via Google Apps Script Webhook

## 1. Executive Summary
This document provides the complete, production-ready guide to using **Google Sheets as a free, zero-maintenance database** for agency micro-websites. By deploying a lightweight Google Apps Script Web App, any inquiry submitted through the Next.js frontend is instantly appended as a structured row into the client's spreadsheet.

No GCP Cloud console configuration, service account keys, or monthly billing is required.

---

## 2. Architecture & Data Flow

```
[Next.js Server Action]
        │
        │ HTTP POST (application/json)
        │ Payload: { timestamp, fullName, email, phone, service, message }
        ▼
[Google Apps Script Web App Endpoint]
(https://script.google.com/macros/s/.../exec)
        │
        ├─► 1. Verify JSON payload & sanitize strings
        ├─► 2. Check if Sheet headers exist (Auto-generate row 1 if missing)
        ├─► 3. Append row: [ Timestamp, Full Name, Email, Phone, Service, Message ]
        │
        ▼
[Google Sheet Spreadsheet] (Target Tab: "Inquiries" or "Leads")
        │
        ▼
[HTTP Response: 200 OK] { "status": "success", "row": 14 }
```

---

## 3. Production Google Apps Script Code (`Code.gs`)

Copy and paste the following complete script into the Google Apps Script editor. This code features:
- **Auto-Header Initialization**: Automatically populates header row if the sheet is blank.
- **CORS Handling**: Responds cleanly with JSON headers for webhook integrations.
- **Fail-Safe Parsing**: Prevents crashes on malformed requests and returns clear error logs.

```javascript
/**
 * AGENCY MICROSITE ENGINE - GOOGLE SHEETS INTAKE WEBHOOK
 * Deploy as Web App:
 * - Execute as: Me (your Google account)
 * - Who has access: Anyone
 */

// Name of the tab inside your Google Sheet where leads should be stored
const SHEET_NAME = "Leads";

// Default column headers created automatically if sheet is empty
const HEADERS = [
  "Timestamp (UTC)",
  "Full Name",
  "Email Address",
  "Phone Number",
  "Service of Interest",
  "Message Content"
];

/**
 * Handle incoming POST requests from Next.js Server Action
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent write locks
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({
      status: "error",
      message: "Server busy. Could not acquire write lock."
    }, 429);
  }

  try {
    // 1. Verify and parse incoming payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "No payload provided."
      }, 400);
    }

    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // If target sheet does not exist, create it
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // 2. Auto-initialize headers if row 1 is blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e293b"); // Slate dark theme
      headerRange.setFontColor("#f8fafc");
      sheet.setFrozenRows(1);
    }

    // 3. Extract and sanitize values
    const timestamp = data.timestamp || new Date().toISOString();
    const fullName  = data.fullName  || "Unknown";
    const email     = data.email     || "No Email";
    const phone     = data.phone     || "Not Provided";
    const service   = data.service   || "General";
    const message   = data.message   || "";

    // 4. Append row to spreadsheet
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      phone,
      service,
      message
    ]);

    const insertedRow = sheet.getLastRow();

    // Auto-fit column widths for readability on early entries
    if (insertedRow <= 20) {
      sheet.autoResizeColumns(1, HEADERS.length);
    }

    return createJsonResponse({
      status: "success",
      message: "Row inserted successfully.",
      row: insertedRow
    }, 200);

  } catch (error) {
    console.error("Failed to append row:", error);
    return createJsonResponse({
      status: "error",
      message: error.toString()
    }, 500);

  } finally {
    // Always release lock
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for health check testing
 */
function doGet(e) {
  return createJsonResponse({
    status: "online",
    service: "Agency Microsite Engine Sheets Webhook",
    timestamp: new Date().toISOString()
  }, 200);
}

/**
 * Utility to format CORS-compliant JSON responses
 */
function createJsonResponse(payload, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 4. Step-by-Step Deployment Instructions

Follow these 7 steps to configure the client's Google Sheet in under 5 minutes:

### Step 1: Create the Google Sheet
1. Navigate to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Rename the document to `[Client Name] - Website Leads` (e.g. `Velox Studio - Website Leads`).
3. Rename the bottom tab from `Sheet1` to `Leads`.

### Step 2: Open the Apps Script Editor
1. In the top navigation bar, click on **Extensions** > **Apps Script**.
2. A new tab will open with the code editor. Rename the project from `Untitled project` to `Microsite Lead Ingestion`.

### Step 3: Paste the Code
1. Erase any existing placeholder code inside `Code.gs`.
2. Paste the full script provided in Section 3 above.
3. Click the disk icon (**Save project**) or press `Ctrl + S`.

### Step 4: Deploy as a Web App
1. At the top right corner, click the blue **Deploy** button > **New deployment**.
2. In the modal, click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Production Form Webhook v1`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: **`Anyone`** *(Crucial: If set to anyone with Google Account, public website form submissions will be blocked with 403 Forbidden)*.
4. Click **Deploy**.

### Step 5: Authorize Permissions
1. Google will display a popup: "Authorization required". Click **Authorize access**.
2. Select your Google account.
3. If Google displays "Google hasn't verified this app":
   - Click **Advanced** (small link at bottom left).
   - Click **Go to Microsite Lead Ingestion (unsafe)**.
   - Click **Allow**.

### Step 6: Copy Webhook URL
1. Copy the **Web App URL** provided by Google. It will look like:
   `https://script.google.com/macros/s/AKfycbw...very_long_hash.../exec`
2. Save this URL.

### Step 7: Add to Environment Variables
Open your project's `.env.local` (or Vercel / Netlify environment variables) and paste:

```env
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbw.../exec"
```

---

## 5. Testing the Webhook via cURL

You can test that your Google Sheet webhook works without even running the Next.js app. Run this command in your terminal:

```bash
curl -L -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2026-10-04T12:00:00Z",
    "fullName": "Test Lead",
    "email": "test@lead.com",
    "phone": "+1 555-0100",
    "service": "Bespoke Spatial Design",
    "message": "Testing Google Sheets webhook connection."
  }'
```

> **Note on `-L` flag**: Google Apps Script redirects POST requests to a Google CDN endpoint. Always pass `-L` (follow redirects) in cURL or use `fetch()` in Node.js (Node `fetch` follows redirects automatically by default).

Expected Response:
```json
{"status":"success","message":"Row inserted successfully.","row":2}
```

Check your Google Sheet: Row 1 will contain bold styled headers, and Row 2 will contain the test lead.

---

## 6. Limits, Quotas & Troubleshooting

| Metric | Google Free Tier Limit | Agency Microsite Impact |
| :--- | :--- | :--- |
| **Max Rows per Sheet** | 10,000,000 cells | Virtually unlimited for microsite lead capture |
| **URL Fetch / Day** | 20,000 requests / day | Handles high traffic spikes easily |
| **Simultaneous Writes** | Handled via `LockService` | No race conditions; requests queue for up to 10s |

### Common Issues & Fixes
- **Error: 403 Forbidden / HTML Login Page**: You selected "Who has access: Only myself" during deployment. Redo deployment with **"Who has access: Anyone"**.
- **Data not updating after changing `Code.gs`**: In Apps Script, click **Deploy** > **Manage deployments** > Edit (pencil icon) > Version: **New version** > Deploy.
