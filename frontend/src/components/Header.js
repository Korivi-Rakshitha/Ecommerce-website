import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          <h1>zen.store</h1>
        </Link>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-name">Hi, {user.name.split(' ')[0]}</Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="btn-small">Admin</Link>
              )}
              <button onClick={handleLogout} className="btn-small">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-small">Login</Link>
            </div>
          )}
          
          <Link to="/wishlist" className="wishlist-icon" title="Wishlist">
            <span>❤️</span> {wishlistCount > 0 && <span>({wishlistCount})</span>}
          </Link>
          
          <Link to="/cart" className="cart-icon" title="Cart">
            <span>🛒</span> {cart?.items?.length > 0 && <span>({cart.items.length})</span>}
          </Link>
        </div>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/?category=Accessories">Accessories</Link>
        <Link to="/?category=Bags">Bags</Link>
        <Link to="/?category=Dresses">Dresses</Link>
        <Link to="/?category=Electronics">Electronics</Link>
        <Link to="/?category=Home & Kitchen">Home and Kitchen</Link>
        {user && <Link to="/orders">My Orders</Link>}
      </nav>
    </header>
  );
};

export default Header;
