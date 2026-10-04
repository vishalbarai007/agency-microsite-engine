# Agent Rule: Forms & Validation Standards

## Objective
The agent must follow strict validation and security rules whenever generating or modifying form components in the project.

---

## Rules for Form Implementation

1. **Zod Validation Schema**:
   - Always define validation schemas in `src/types/formSchemas.ts`.
   - Never write loose, unchecked client forms.
   - Enforce trimmed strings, valid email formats, and string length limits (`min(2)`, `max(80)` on names; `min(10)`, `max(1500)` on messages).

2. **Server Action Security**:
   - Every form must invoke a Server Action marked `"server-only"` and `"use server"`.
   - Re-validate all payloads on the server using `schema.safeParse()`.
   - Implement the **invisible honeypot trap**: an empty string input. If `honeypot` contains any characters, silently drop the submission without writing to Google Sheets or sending emails.

3. **Multi-Destination Storage**:
   - Server Actions must support concurrent execution via `Promise.all()` to dispatch to:
     - Google Sheets (via `process.env.GOOGLE_SHEETS_WEBHOOK_URL`)
     - Resend Email (via `process.env.RESEND_API_KEY` and `process.env.NOTIFICATION_DESTINATION_EMAIL`)
   - Catch errors on individual destination promises so one failure does not abort the other.

4. **Client UX Feedback**:
   - Use `useTransition` to track `isPending` state and disable submit buttons.
   - Display toast notifications using `sonner` (`toast.success` / `toast.error`).
   - Clear input values on successful submission.
