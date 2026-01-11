import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Google Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="google-login-container">
          <div className="divider"><span>OR</span></div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login Failed')}
            useOneTap
            width="100%"
          />
        </div>

        <p className="auth-footer">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
