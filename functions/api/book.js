/**
 * Cloudflare Pages Function: POST /api/book
 *
 * Receives the project-intake questionnaire (Book section, steps 1–4).
 * The requirements document's full flow is: Power Automate (HTTP trigger)
 * in Ben's own tenant emails Ben a summary, saves the submission to a
 * SharePoint list, and emails the visitor a copy — then Microsoft
 * Bookings handles the calendar step in the browser.
 *
 * This function implements that flow in two stages, depending on what
 * Ben has configured in Cloudflare Pages environment variables:
 *
 *   1. POWER_AUTOMATE_URL — if set, answers are forwarded to Ben's own
 *      Power Automate flow (which owns the SharePoint list, the visitor
 *      copy, and the Teams alert). Nothing is stored on the developer's
 *      accounts.
 *   2. Otherwise, if RESEND_API_KEY + CONTACT_TO_EMAIL are set, Ben is
 *      emailed a formatted summary and the visitor is emailed a copy.
 *      SharePoint / Teams steps wait for stage 1.
 *
 * If neither is set, this returns HTTP 501 and the frontend says so
 * plainly instead of pretending the answers were sent. Answers are
 * never stored on this site: the browser draft (localStorage) is the
 * visitor's own copy and is cleared on a successful submit.
 *
 * Spam protection: a honeypot field plus server-side validation and
 * length limits. A Cloudflare Turnstile widget can be added in front
 * of the form if spam becomes a problem.
 */

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function summaryText(data) {
  const list = (value) =>
    Array.isArray(value) && value.length ? value.join(', ') : '(not given)';
  const lines = [
    `New process audit: ${data.companyName} – ${data.processName}`,
    '',
    '--- About you ---',
    `Name: ${data.fullName}`,
    `Work email: ${data.workEmail}`,
    `Job title: ${data.jobTitle}`,
    `Phone: ${data.phone || '(not given)'}`,
    `Company: ${data.companyName}`,
    `Company website: ${data.companyWebsite || '(not given)'}`,
    `Company size: ${data.companySize}`,
    `Industry: ${data.industry}`,
    `Country/state: ${data.countryState}`,
    '',
    '--- The process ---',
    `Process: ${data.processName}`,
    `How it works today: ${data.howToday}`,
    `Biggest problem: ${list(data.biggestProblem)}`,
    `People touching it: ${data.peopleCount}`,
    `Hours per week: ${data.hoursPerWeek}`,
    `What success looks like: ${data.success || '(not given)'}`,
    '',
    '--- Microsoft 365 ---',
    `Tools: ${list(data.tools)}`,
    `Plan: ${data.plan || '(not given)'}`,
    `Other systems: ${data.otherSystems || '(not given)'}`,
    `Managed by: ${data.m365Manager || '(not given)'}`,
    '',
    '--- Timing ---',
    `When: ${data.timing}`,
    `Decision role: ${data.decisionRole}`,
    `Heard about us: ${data.hearAbout || '(not given)'}`,
    `Anything else: ${data.anythingElse || '(not given)'}`,
    `Agreed to be contacted: ${data.consent ? 'Yes' : 'No'}`,
  ];
  return lines.join('\n');
}

export async function onRequestPost(context) {
  let data;
  try {
    data = await context.request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  if (data.website) {
    return jsonResponse({ ok: true }, 200);
  }

  const required = [
    'fullName',
    'workEmail',
    'jobTitle',
    'companyName',
    'companySize',
    'industry',
    'countryState',
    'processName',
    'howToday',
    'peopleCount',
    'hoursPerWeek',
    'timing',
    'decisionRole',
  ];
  for (const field of required) {
    if (!data[field] || !String(data[field]).trim()) {
      return jsonResponse({ error: 'Please check the form fields and try again.' }, 400);
    }
  }
  if (!isValidEmail(String(data.workEmail).trim())) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
  }
  if (!Array.isArray(data.biggestProblem) || data.biggestProblem.length === 0) {
    return jsonResponse({ error: 'Please choose at least one problem.' }, 400);
  }
  if (!Array.isArray(data.tools) || data.tools.length === 0) {
    return jsonResponse({ error: 'Please choose at least one tool.' }, 400);
  }
  if (data.consent !== true) {
    return jsonResponse({ error: 'Please agree to be contacted about this request.' }, 400);
  }

  const automateUrl = context.env.POWER_AUTOMATE_URL;
  if (automateUrl) {
    const forward = await fetch(automateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!forward.ok) {
      return jsonResponse({ error: 'The answers could not be sent right now.' }, 502);
    }
    return jsonResponse({ ok: true, via: 'power-automate' }, 200);
  }

  const apiKey = context.env.RESEND_API_KEY;
  const toEmail = context.env.CONTACT_TO_EMAIL;
  const fromEmail = context.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  if (!apiKey || !toEmail) {
    return jsonResponse(
      { error: 'Intake form is not connected to an inbox yet.' },
      501,
    );
  }

  const subject = `New process audit: ${data.companyName} – ${data.processName}`;
  const text = summaryText(data);
  const benResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: String(data.workEmail).trim(),
      subject,
      text,
    }),
  });
  if (!benResponse.ok) {
    return jsonResponse({ error: 'The answers could not be sent right now.' }, 502);
  }

  // Visitor copy (best effort: Ben's email is the one that must land).
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [String(data.workEmail).trim()],
      subject: 'Your process audit request — Leudy Automation Group',
      text: [
        'Thank you — your answers are in. Here is a copy:',
        '',
        text,
        '',
        'What happens next: Ben reviews your process, then you talk it through on a 30-minute call.',
      ].join('\n'),
    }),
  });

  return jsonResponse({ ok: true, via: 'email' }, 200);
}

export async function onRequest(context) {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return jsonResponse({ error: 'Method not allowed.' }, 405);
}
