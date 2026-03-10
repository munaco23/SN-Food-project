const express = require('express');
const cors = require('cors');
const odoo = require('odoo-xmlrpc');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/account', accountRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'sn-food-backend', time: new Date().toISOString() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    message: err.message || 'Server error'
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

