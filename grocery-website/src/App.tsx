import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import { Home } from './pages/Home/Home';
import { Company } from './pages/Company/Company';
import { Team } from './pages/Team/Team';
import { Vendors } from './pages/Vendors/Vendors';
import { Customers } from './pages/Customers/Customers';
import { Events } from './pages/Events/Events';
import { Catalogs } from './pages/Catalogs/Catalogs';
import { Brands } from './pages/Brands/Brands';
import { NewArrivals } from './pages/NewArrivals/NewArrivals';
import { Contact } from './pages/Contact/Contact';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Account } from './pages/Account/Account';
import { Checkout } from './pages/Checkout/Checkout';
import { Shop } from './pages/Shop/Shop';
import { ProductDetail } from './pages/ProductDetail/ProductDetail';

import { Wishlist } from './pages/Wishlist/Wishlist';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function RequireAuth({ children }: { children: React.ReactElement }) {
  const location = useLocation();
  const userRaw = localStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!user?.id) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  return children;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Something went wrong</h2>
          <pre style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{this.state.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language || 'en';
    document.body.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [i18n.language]);

  const ghPagesBase = '/SN-Food';
  const basename =
    process.env.NODE_ENV === 'production'
      ? process.env.PUBLIC_URL
      : window.location.pathname === ghPagesBase || window.location.pathname.startsWith(`${ghPagesBase}/`)
        ? ghPagesBase
        : undefined;

  return (
    <Router basename={basename}>
      <div className="App">
        <ScrollToTop />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/team" element={<Team />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/events" element={<Events />} />
            <Route path="/catalogs" element={<Catalogs />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/account"
              element={
                <RequireAuth>
                  <Account />
                </RequireAuth>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/wishlist"
              element={
                <RequireAuth>
                  <Wishlist />
                </RequireAuth>
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
