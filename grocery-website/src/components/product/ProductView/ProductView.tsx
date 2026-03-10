import React, { useState, useEffect } from 'react';
import './ProductView.css';
import Logo from '../../../Images/Logo.jpeg';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../../../utils/cart';
import { getCurrentUser } from '../../../utils/auth';
import { isInWishlist, toggleWishlist } from '../../../utils/wishlist';
import { RecommendedProducts } from '../RecommendedProducts/RecommendedProducts';
import { API_BASE_URL } from '../../../utils/api';

type Product = {
  id: string;
  name: string;
  code: string;
  price: number | null;
  image: string | null;
  category: string;
  brand: string;
  description: string;
  weight: number;
  volume: number;
  stock: number;
  uom: string;
  barcode: string | null;
};

type CurrencyInfo = {
  code: string | null;
  symbol: string;
  position: 'before' | 'after';
  digits: number;
};

const formatPrice = (value: number | null | undefined, currency?: CurrencyInfo | null) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '';
  const digits = typeof currency?.digits === 'number' ? currency.digits : 2;
  const symbol = currency?.symbol || '$';
  const position = currency?.position || 'after';
  const numberText = value.toFixed(digits);
  return position === 'before' ? `${symbol} ${numberText}` : `${numberText} ${symbol}`;
};

export const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        const data = await response.json();
        if (data.ok) {
          setProduct(data.product);
          setCurrency(data.currency);
        } else {
          setError(data.message || 'Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product?.id) return;

    const refresh = () => setInWishlist(isInWishlist(String(product.id)));
    refresh();

    window.addEventListener('wishlist:changed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('wishlist:changed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [product?.id]);

  const handleToggleWishlist = () => {
    if (!product) return;

    const user = getCurrentUser();
    if (!user?.id) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const result = toggleWishlist({
      id: String(product.id),
      name: product.name,
      code: product.code,
      brand: product.brand,
      category: product.category,
      image: product.image,
      variant: ''
    });

    setInWishlist(result.added);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const user = getCurrentUser();
    if (!user?.id) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    try {
      await addToCart(product, quantity);
      window.dispatchEvent(new Event('cart:open'));
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="pv-container">
        <div className="pv-inner">
          <div className="pv-skel-breadcrumb" />

          <div className="pv-main-content">
            <div className="pv-left-col">
              <div className="pv-image-box pv-skel-image" />
            </div>

            <div className="pv-center-col">
              <div className="pv-skel-line pv-skel-line--xl" />
              <div className="pv-skel-line pv-skel-line--md" style={{ marginTop: 12 }} />

              <div className="pv-skel-table" style={{ marginTop: 24 }}>
                <div className="pv-skel-row">
                  <div className="pv-skel-cell pv-skel-cell--label" />
                  <div className="pv-skel-cell pv-skel-cell--value" />
                </div>
                <div className="pv-skel-row">
                  <div className="pv-skel-cell pv-skel-cell--label" />
                  <div className="pv-skel-cell pv-skel-cell--value" />
                </div>
                <div className="pv-skel-row">
                  <div className="pv-skel-cell pv-skel-cell--label" />
                  <div className="pv-skel-cell pv-skel-cell--value" />
                </div>
                <div className="pv-skel-row">
                  <div className="pv-skel-cell pv-skel-cell--label" />
                  <div className="pv-skel-cell pv-skel-cell--value" />
                </div>
              </div>

              <div style={{ marginTop: 28 }}>
                <div className="pv-skel-line pv-skel-line--lg" />
                <div className="pv-skel-line pv-skel-line--lg" style={{ marginTop: 10 }} />
                <div className="pv-skel-line pv-skel-line--md" style={{ marginTop: 10 }} />
              </div>
            </div>

            <div className="pv-right-col">
              <div className="pv-skel-line pv-skel-line--sm" style={{ marginBottom: 16 }} />
              <div className="pv-skel-line pv-skel-line--lg" style={{ marginBottom: 18 }} />

              <div className="pv-cart-box">
                <div className="pv-skel-line pv-skel-line--sm" />
                <div className="pv-skel-input" style={{ marginTop: 10 }} />
                <div className="pv-skel-pill" style={{ marginTop: 18 }} />
                <div className="pv-skel-btn" style={{ marginTop: 18 }} />
              </div>

              <div className="pv-meta">
                <div className="pv-skel-line pv-skel-line--md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <div className="pv-container"><div className="pv-inner">{error || 'Product not found'}</div></div>;
  }

  return (
    <div className="pv-container">
      <div className="pv-inner">
        <nav className="pv-breadcrumbs">
          <span>Homepage</span> &gt; <span>{product.category}</span> &gt; <span className="active">{product.name}</span>
        </nav>

        <div className="pv-main-content">
          <div className="pv-left-col">
            <div className="pv-image-box">
              <img src={product.image || Logo} alt={product.name} />
            </div>
          </div>

          <div className="pv-center-col">
            <h1 className="pv-title">{product.name}</h1>
            <p className="pv-cod">cod. {product.code}</p>

            <table className="pv-info-table">
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td className="pv-link">{product.brand}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td className="pv-link">{product.category}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{product.weight} kg</td>
                </tr>
                <tr>
                  <td>UOM</td>
                  <td>{product.uom}</td>
                </tr>
              </tbody>
            </table>

            <div className="pv-description" style={{ marginTop: '20px' }}>
              <h3>Description</h3>
              <p>{product.description || 'No description available.'}</p>
            </div>
          </div>

          <div className="pv-right-col">
            <div className="pv-status">
              <i
                className={`${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart pv-wish-icon`}
                role="button"
                tabIndex={0}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={handleToggleWishlist}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggleWishlist();
                  }
                }}
              />
              <span className="pv-available">
                <span className="dot" style={{ backgroundColor: product.stock > 0 ? '#28a745' : '#dc3545' }} /> 
                {product.stock > 0 ? 'Product available' : 'Out of stock'}
              </span>
            </div>

            <div className="pv-price-display" style={{ fontSize: '24px', fontWeight: 'bold', margin: '15px 0' }}>
              {formatPrice(product.price, currency)}
            </div>

            <div className="pv-cart-box">
              <div className="pv-field">
                <label>Quantity</label>
                <select className="pv-select">
                  <option>{product.uom || 'Unit'}</option>
                </select>
              </div>

              <div className="pv-qty-row">
                <div className="pv-qty-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <button className="pv-add-btn" onClick={handleAddToCart}>ADD TO CART</button>
            </div>

            <div className="pv-meta">
              {product.barcode && product.barcode.trim() !== '' && (
                <div className="pv-barcode-section" style={{ marginBottom: '15px' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#666' }}>EAN: {product.barcode}</p>
                  <div className="pv-barcode" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fa-solid fa-barcode" style={{ fontSize: '24px' }} />
                    <span style={{ letterSpacing: '2px', fontWeight: 'bold' }}>{product.barcode}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pv-delivery">
              <i className="fa-solid fa-truck-fast" />
              <span>Fulfillment and delivery within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Recommended Products Section - Moved outside pv-inner to span full width */}
      </div> {/* Close pv-inner */}
      
      <div style={{ marginTop: '60px', borderTop: '1px solid #f3f4f6', paddingTop: '40px' }}>
        <div style={{ width: '100%' }}>
          <RecommendedProducts categoryId={product.category} currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
};
