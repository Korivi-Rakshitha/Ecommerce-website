import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const profileOptions = [
    {
      title: 'Your Orders',
      description: 'Track, return, or buy things again',
      icon: '📦',
      link: '/orders'
    },
    {
      title: 'Login & security',
      description: 'Edit login, name, and mobile number',
      icon: '🔒',
      link: '#'
    },
    {
      title: 'Your Addresses',
      description: 'Edit addresses for orders and gifts',
      icon: '📍',
      link: '#'
    },
    {
      title: 'Wishlist',
      description: 'View and manage your saved items',
      icon: '❤️',
      link: '/wishlist'
    },
    {
      title: 'Payment options',
      description: 'Edit or add payment methods',
      icon: '💳',
      link: '#'
    },
    {
      title: 'Contact Us',
      description: 'Contact our customer service via phone or chat',
      icon: '🎧',
      link: '/contact-us'
    }
  ];

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <h2>Please login to view your profile</h2>
          <Link to="/login" className="btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Your Account</h1>
      </div>
      
      <div className="profile-grid">
        {profileOptions.map((option, index) => (
          <Link key={index} to={option.link} className="profile-card">
            <div className="profile-card-icon">{option.icon}</div>
            <div className="profile-card-content">
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
