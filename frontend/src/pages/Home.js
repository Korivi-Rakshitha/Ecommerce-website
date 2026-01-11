import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
    page: 1
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts(filters);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await productAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Sync filters with URL query param changes (e.g., header search or category click)
  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || '';
    
    if (s !== filters.search || c !== filters.category) {
      setFilters(prev => ({ 
        ...prev, 
        search: s, 
        category: c,
        page: 1 
      }));
      
      // Scroll to products section when category/search changes from URL
      if (c || s) {
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [searchParams, filters.search, filters.category]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleShopNowClick = () => {
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAllClick = () => {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoryImages = {
    'Accessories': 'https://images.pexels.com/photos/19090/pexels-photo.jpg',
    'Bags': 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
    'Dresses': 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
    'Electronics': 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    'Home & Kitchen': 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg'
  };

  return (
    <div className="home-page">
      {/* Modern Hero Section */}
      <div className="modern-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content-new">
          <div className="hero-badge">New Season Collection</div>
          <h1>Elevate Your Style <br /><span>With Zen Store</span></h1>
          <p>Discover the latest trends in fashion, electronics, and home essentials. Quality products, fast delivery, and unbeatable prices.</p>
          <div className="hero-actions">
            <button onClick={handleShopNowClick} className="btn-primary-large">Shop Now</button>
            <Link to="/products" className="btn-secondary-outline">View All Products</Link>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.slice(0, 8).map((category, index) => (
            <Link key={category} to={`/?category=${category}`} className="category-card">
              <div className="category-image">
                <img src={categoryImages[category] || `https://images.unsplash.com/800x600/?${category.toLowerCase().replace(' ', ',')}`} alt={category} />
              </div>
              <h3>{category}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Deals */}
      <div className="deals-section">
        <h2>Today's Deals</h2>
        <div className="deals-grid">
          {products.slice(0, 6).map(product => (
            <div key={product._id} className="deal-card">
              <ProductCard product={product} />
              <div className="deal-badge">Deal</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Products Section */}
      <div className="products-section">
        <aside className="sidebar">
          <div className="filter-group">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="filter-group" id="categories-section">
            <h3>Category</h3>
            <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <h3>Price Range</h3>
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <h3>Sort By</h3>
            <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>

        <div className="products-grid">
          {loading ? (
            <div className="loading-spinner">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products">No products found</div>
          ) : (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
