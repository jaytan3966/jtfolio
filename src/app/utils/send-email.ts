import { FormData } from "../components/sections/contact";

export async function sendEmail(data: FormData) {
  const res = await fetch('/api/email', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Email send failed: ${res.status}`);
  }

  return res.json();
}
