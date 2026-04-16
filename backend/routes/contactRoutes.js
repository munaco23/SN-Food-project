const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/brevoService');

// POST /api/contact/send
router.post('/send', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const safeName = String(name || '').trim();
    const safeEmail = String(email || '').trim();
    const safeSubject = String(subject || '').trim();
    const safeMessage = String(message || '').trim();

    if (!safeName || safeName.length < 2) {
      return res.status(400).json({ ok: false, message: 'Name is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!safeEmail || !emailRegex.test(safeEmail)) {
      return res.status(400).json({ ok: false, message: 'A valid email is required.' });
    }

    if (!safeMessage || safeMessage.length < 5) {
      return res.status(400).json({ ok: false, message: 'Message is required.' });
    }

    await sendContactEmail({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: safeMessage,
    });

    return res.json({ ok: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    const message = error && error.message ? error.message : 'Failed to send message';
    return res.status(500).json({ ok: false, message });
  }
});

module.exports = router;
