import { toast } from "react-toastify";

/**
 * Parses Django REST Framework API errors and shows each one
 * as an individual toast notification.
 *
 * Handles all DRF error formats:
 *  - Field errors:       { field: ["msg1", "msg2"] }
 *  - Non-field errors:   { non_field_errors: ["msg"] }
 *  - Detail string:      { detail: "msg" }
 *  - Generic error:      { error: "msg" }
 *  - Network errors:     no response at all
 *
 * @param {unknown} err - The error caught in a try/catch block (axios error).
 */
export const handleApiError = (err) => {
  // ── Network / no-response error ──────────────────────────────────────────
  if (!err.response) {
    toast.error("Unable to connect to the server.");
    return;
  }

  const data = err.response?.data;

  // ── No data in the response ───────────────────────────────────────────────
  if (!data) {
    toast.error("An unexpected error occurred. Please try again.");
    return;
  }

  // ── Collect all messages into a flat array ────────────────────────────────
  const messages = [];

  // Iterate every key returned by the API
  Object.entries(data).forEach(([key, value]) => {
    // Normalise value: wrap strings in an array for uniform processing
    const errors = Array.isArray(value) ? value : [value];

    errors.forEach((msg) => {
      const text = typeof msg === "string" ? msg : JSON.stringify(msg);

      if (key === "non_field_errors" || key === "detail" || key === "error") {
        // These are global messages — show as-is
        messages.push(text);
      } else {
        // Field-level error — capitalise the field name and prepend it
        const fieldLabel =
          key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
        messages.push(`${fieldLabel}: ${text}`);
      }
    });
  });

  // ── Fire one toast per message ────────────────────────────────────────────
  if (messages.length > 0) {
    messages.forEach((msg) => toast.error(msg));
  } else {
    // Fallback if the response body format is completely unknown
    toast.error("An unexpected error occurred. Please try again.");
  }
};
