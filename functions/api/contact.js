/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Sends a contact-form submission by email via Resend (https://resend.com).
 * No API key or email credential lives in the frontend code — the values
 * below are read from Cloudflare Pages environment variables (dashboard:
 * Pages project → Settings → Environment variables):
 *
 *   RESEND_API_KEY     Resend API key (required to send)
 *   CONTACT_TO_EMAIL   The inbox that receives submissions (required)
 *   RESEND_FROM_EMAIL  Optional sender. Defaults to Resend's test sender,
 *                      which only delivers to the Resend account owner's
 *                      address — use a verified domain sender for production.
 *
 * If the variables are not set, this returns HTTP 501 and the frontend
 * shows a clear "not connected yet" message instead of pretending the
 * message was sent. Spam protection: a honeypot field plus server-side
 * validation and length limits. This is not a substitute for a CAPTCHA
 * if the form ever attracts serious spam — see README.md.
 */

const MAX_LENGTHS = {
  name: 100,
  company: 100,
  email: 254,
  projectDescription: 5000,
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  let data;
  try {
    data = await context.request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  // Honeypot: bots fill this hidden field; real visitors never do.
  if (data.website) {
    // Pretend success so bots cannot tell they were filtered out.
    return jsonResponse({ ok: true }, 200);
  }

  const name = String(data.name || '').trim();
  const company = String(data.company || '').trim();
  const email = String(data.email || '').trim();
  const projectDescription = String(data.projectDescription || '').trim();

  if (
    !name ||
    !email ||
    !projectDescription ||
    !isValidEmail(email) ||
    name.length > MAX_LENGTHS.name ||
    company.length > MAX_LENGTHS.company ||
    email.length > MAX_LENGTHS.email ||
    projectDescription.length > MAX_LENGTHS.projectDescription
  ) {
    return jsonResponse({ error: 'Please check the form fields and try again.' }, 400);
  }

  const apiKey = context.env.RESEND_API_KEY;
  const toEmail = context.env.CONTACT_TO_EMAIL;
  const fromEmail = context.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !toEmail) {
    return jsonResponse(
      { error: 'Contact form is not connected to an inbox yet.' },
      501,
    );
  }

  const subject = `Website enquiry from ${name}${company ? ` (${company})` : ''}`;
  const text = [
    `Name: ${name}`,
    `Company: ${company || '(not given)'}`,
    `Email: ${email}`,
    '',
    'Project description:',
    projectDescription,
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    return jsonResponse(
      { error: 'The message could not be sent right now.' },
      502,
    );
  }

  return jsonResponse({ ok: true }, 200);
}

export async function onRequest(context) {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return jsonResponse({ error: 'Method not allowed.' }, 405);
}
