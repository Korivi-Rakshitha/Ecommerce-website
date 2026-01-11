import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

// Footer Pages
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import PressReleases from './pages/PressReleases';
import HelpCenter from './pages/HelpCenter';
import ContactUs from './pages/ContactUs';
import TrackOrders from './pages/TrackOrders';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnPolicy from './pages/ReturnPolicy';

// Styles
import './styles/App.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const googleClientId = "1001531949360-da5k347lnmi814fm57dbjl3pc3fbgekm.apps.googleusercontent.com"; // User needs to replace this
  
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  
                  {/* Footer Links - About Us Section */}
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/press-releases" element={<PressReleases />} />
                  
                  {/* Footer Links - Customer Service Section */}
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/track-orders" element={<TrackOrders />} />
                  
                  {/* Footer Links - Policies Section */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/return-policy" element={<ReturnPolicy />} />
                </Routes>
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
