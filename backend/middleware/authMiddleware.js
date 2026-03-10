const jwt = require('jsonwebtoken');

function getTokenFromReq(req) {
  const auth = req.headers.authorization || '';
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

module.exports = function authMiddleware(req, res, next) {
  try {
    const token = getTokenFromReq(req);
    if (!token) {
      return res.status(401).json({ ok: false, message: 'Unauthorized' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ ok: false, message: 'Server misconfigured' });
    }

    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }
};
