const axios = require('axios');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

const sendContactEmail = async ({ name, email, subject, message }) => {
  const apiKey = (process.env.BREVO_API_KEY || '').trim();
  const senderEmail = (process.env.BREVO_SENDER_EMAIL || '').trim();
  const senderName = (process.env.BREVO_SENDER_NAME || 'SN Food Website').trim();
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim();

  if (!apiKey) throw new Error('Missing BREVO_API_KEY');
  if (!senderEmail) throw new Error('Missing BREVO_SENDER_EMAIL');
  if (!adminEmail) throw new Error('Missing ADMIN_EMAIL');

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || '');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  const finalSubject = subject && String(subject).trim().length
    ? `Contact Form: ${String(subject).trim()}`
    : 'Contact Form Submission';

  const htmlContent = `
    <div style="font-family:Segoe UI,Arial,sans-serif; font-size:14px; color:#111827;">
      <h2 style="margin:0 0 12px;">New Contact Form Submission</h2>
      <p style="margin:0 0 6px;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin:0 0 6px;"><strong>Email:</strong> ${safeEmail}</p>
      ${safeSubject ? `<p style=\"margin:0 0 6px;\"><strong>Subject:</strong> ${safeSubject}</p>` : ''}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0;"/>
      <p style="margin:0 0 6px;"><strong>Message:</strong></p>
      <p style="margin:0; line-height:1.6;">${safeMessage}</p>
    </div>
  `;

  try {
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: adminEmail, name: 'Admin' }],
        replyTo: { email, name },
        subject: finalSubject,
        htmlContent,
      },
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 15000,
      }
    );
  } catch (err) {
    const status = err?.response?.status;
    const data = err?.response?.data;
    console.error('Brevo API error:', {
      status,
      data,
      message: err?.message,
    });

    const details =
      data?.message ||
      data?.error ||
      (typeof data === 'string' ? data : undefined) ||
      err?.message ||
      'Unknown error';

    throw new Error(`Brevo send failed: ${details}`);
  }
};

module.exports = { sendContactEmail };
