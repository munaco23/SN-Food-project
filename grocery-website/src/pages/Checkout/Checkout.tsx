import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { API_BASE_URL } from '../../utils/api';
import { getCartState, getCartTotal, emptyCart, CartItem } from '../../utils/cart';
import './Checkout.css';

export const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(getCartState().items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    country: 'France',
    paymentMethod: 'cod' // 'cod' or 'bank'
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : null;

      const response = await fetch(`${API_BASE_URL}/api/checkout/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: user?.partnerId || null,
          customerDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            zip: formData.zip,
            country: formData.country
          },
          items: cart.map((item: CartItem) => ({
            productTemplateId: item.productTemplateId,
            quantity: item.quantity,
            price: item.price
          })),
          paymentMethod: formData.paymentMethod
        }),
      });

      const data = await response.json();

      if (data.ok) {
        await emptyCart();
        navigate('/account', { state: { orderId: data.orderId, message: 'Order placed successfully!' } });
      } else {
        setError(data.message || 'Checkout failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal();

  return (
    <div className="checkout-page">
      <Header />
      <main className="checkout-main">
        <div className="checkout-container">
          <h1 className="checkout-title">Checkout</h1>
          
          {error && <div className="checkout-error">{error}</div>}

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-grid">
              <section className="checkout-section">
                <h2>Shipping Details</h2>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="street">Address (Street)</label>
                  <input type="text" id="street" value={formData.street} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">Postal Code</label>
                    <input type="text" id="zip" value={formData.zip} onChange={handleChange} required />
                  </div>
                </div>
              </section>

              <aside className="checkout-summary">
                <div className="summary-card">
                  <h2>Order Summary</h2>
                  <div className="summary-items">
                    {cart.map((item: CartItem) => (
                      <div key={item.productTemplateId} className="summary-item">
                        <span>{item.name} x {item.quantity}</span>
                        <span>€{((item.price || 0) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>

                  <div className="payment-methods">
                    <h3>Payment Method</h3>
                    <div className="payment-option">
                      <input 
                        type="radio" 
                        id="paymentMethod" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                      />
                      <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                    <div className="payment-option">
                      <input 
                        type="radio" 
                        id="paymentMethodBank" 
                        name="paymentMethod" 
                        value="bank" 
                        checked={formData.paymentMethod === 'bank'}
                        onChange={(e) => setFormData({...formData, paymentMethod: 'bank'})}
                      />
                      <label htmlFor="bank">Bank Transfer</label>
                    </div>
                  </div>

                  <button type="submit" className="place-order-btn" disabled={loading}>
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
