import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import '../styles/Home.css'; // Reuse home styles for now

const ProductsPage = () => {
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
    }
  }, [searchParams, filters.search, filters.category]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="products-page-container">
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '36px', fontWeight: '800', color: 'var(--text-color)' }}>
        Our <span style={{ color: 'var(--primary-color)' }}>Collection</span>
      </h1>
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

          <div className="filter-group">
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

export default ProductsPage;
