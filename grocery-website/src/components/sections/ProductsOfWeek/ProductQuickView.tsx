import React, { useEffect, useState } from 'react';
import './ProductQuickView.css';
import { addToCart } from '../../../utils/cart';
import { getCurrentUser } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import ProductImg1 from '../../../Images/hero1.jpg';

interface Product {
  id: string;
  name: string;
  variant: string;
  code: string;
  brand: string;
  tag: string;
  imageSrc: string;
  price?: number | null;
}

interface CurrencyInfo {
  code: string | null;
  symbol: string;
  position: 'before' | 'after';
  digits: number;
}

interface ProductQuickViewProps {
  product: Product | null;
  currency: CurrencyInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, currency, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const formatPrice = (value: number | null | undefined) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) return '';
    const digits = typeof currency?.digits === 'number' ? currency.digits : 2;
    const symbol = currency?.symbol || '$';
    const position = currency?.position || 'after';
    const numberText = value.toFixed(digits);
    return position === 'before' ? `${symbol} ${numberText}` : `${numberText} ${symbol}`;
  };

  const handleAddToCart = async () => {
    const user = getCurrentUser();
    if (!user?.id) {
      onClose();
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    try {
      setAdding(true);
      await addToCart(String(product.id), quantity);
      
      // Dispatch both events to ensure UI updates
      window.dispatchEvent(new Event('cart:changed'));
      window.dispatchEvent(new Event('cart:open'));
      
      onClose();
    } catch (e) {
      console.error('Failed to add to cart in QuickView:', e);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quickview-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="quickview-content">
          <div className="quickview-left">
            <div className="quickview-image-container">
              <img src={product.imageSrc || ProductImg1} alt={product.name} className="quickview-image" />
            </div>
          </div>

          <div className="quickview-right">
            <div className="quickview-badge">{product.tag}</div>
            <h2 className="quickview-title">{product.name}</h2>
            <div className="quickview-price">{formatPrice(product.price)}</div>
            
            <div className="quickview-meta">
              <div className="quickview-meta-item">
                <span className="label">Brand:</span>
                <span className="value">{product.brand}</span>
              </div>
              <div className="quickview-meta-item">
                <span className="label">Code:</span>
                <span className="value">{product.code}</span>
              </div>
              {product.variant && (
                <div className="quickview-meta-item">
                  <span className="label">Variant:</span>
                  <span className="value">{product.variant}</span>
                </div>
              )}
            </div>

            <div className="quickview-actions">
              <div className="quickview-quantity">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button 
                className="quickview-add-btn" 
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            <button 
              className="quickview-view-details"
              onClick={() => {
                onClose();
                navigate(`/product/${product.id}`);
              }}
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
