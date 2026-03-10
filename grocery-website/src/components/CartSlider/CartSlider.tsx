import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartSlider.css';
import Logo from '../../Images/Logo.jpeg';
import { emptyCart, getCartState, getCartTotal, refreshCart, removeFromCart, updateCartQuantity } from '../../utils/cart';

type CurrencyInfo = {
  code: string | null;
  symbol: string;
  position: 'before' | 'after';
  digits: number;
};

const formatPrice = (value: number, currency?: CurrencyInfo | null) => {
  const digits = typeof currency?.digits === 'number' ? currency.digits : 2;
  const symbol = currency?.symbol || '$';
  const position = currency?.position || 'after';
  const numberText = value.toFixed(digits);
  return position === 'before' ? `${symbol} ${numberText}` : `${numberText} ${symbol}`;
};

type CartSliderProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartSlider: React.FC<CartSliderProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    refreshCart().catch(() => {
      // ignore (unauthorized/offline)
    });
  }, [isOpen]);

  useEffect(() => {
    const update = () => setVersion((v) => v + 1);
    window.addEventListener('cart:changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('cart:changed', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  const state = useMemo(() => getCartState(), [version]);
  const items = state.items;
  const currency = state.currency;
  const total = useMemo(() => getCartTotal(), [version]);

  const handleQtyChange = async (e: React.MouseEvent, productTemplateId: string, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await updateCartQuantity(productTemplateId, delta);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-slider ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-left">
            <button
              className="empty-cart-btn"
              onClick={() => {
                emptyCart().catch(() => {
                  // ignore
                });
              }}
              disabled={!items.length}
            >
              <i className="fa-regular fa-trash-can" />
              <span>Empty</span>
            </button>
          </div>
          <div className="cart-header-center">
            <h2 className="cart-title">Your products</h2>
          </div>
          <div className="cart-header-right">
            <button className="close-cart-btn" onClick={onClose}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        <div className="cart-content">
          {items.length > 0 ? (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.productTemplateId} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.image || Logo} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-code">cod. {item.code}</p>
                    <div className="item-meta">
                      <div className="item-qty-selector">
                        <button 
                          className="qty-btn" 
                          onClick={(e) => handleQtyChange(e, item.productTemplateId, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <i className="fa-solid fa-minus" />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          onClick={(e) => handleQtyChange(e, item.productTemplateId, 1)}
                        >
                          <i className="fa-solid fa-plus" />
                        </button>
                      </div>
                      <span className="item-price">
                        {typeof item.price === 'number' ? formatPrice(item.price * item.quantity, currency) : ''}
                      </span>
                    </div>
                  </div>
                  <button
                    className="remove-item-btn"
                    aria-label="Remove item"
                    onClick={() =>
                      removeFromCart(item.productTemplateId).catch(() => {
                        // ignore
                      })
                    }
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart-message">
              Your cart is empty
            </div>
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span className="total-label">Total:</span>
            <span className="total-value">{formatPrice(total, currency)}</span>
          </div>
          <button 
            className="proceed-btn"
            onClick={() => {
              onClose();
              navigate('/checkout');
            }}
            disabled={items.length === 0}
          >
            PROCEED TO ORDER
          </button>
        </div>
      </div>
    </>
  );
};
