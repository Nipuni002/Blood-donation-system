import React from 'react';
import './Navbar.css';

export default function Navbar({ user, onNavigate, onLogout }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          {/* Logo Section - Left */}
          <div className="nav-brand">
            <div className="nav-logo">
              <span className="logo-icon">🩸</span>
              <span className="logo-text">HopeBlood</span>
            </div>
          </div>
          
          {/* Navigation Menu - Right */}
          <div className="nav-right">
            <nav className="nav-menu">
              {!user ? (
                <>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('home')}>
                    <span className="nav-icon">🏠</span>
                    Home
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('login')}>
                    <span className="nav-icon">🔑</span>
                    Login
                  </button>
                  <button className="nav-btn nav-btn-primary" onClick={() => onNavigate && onNavigate('register')}>
                    <span className="nav-icon">👤</span>
                    Register
                  </button>
                </>
              ) : user.role && user.role !== 'admin' ? (
                <>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('profile')}>
                    <span className="nav-icon">👤</span>
                    Profile
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('adddonor')}>
                    <span className="nav-icon">➕</span>
                    Add Donor
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('appointments')}>
                    <span className="nav-icon">📅</span>
                    Appointments
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('requests')}>
                    <span className="nav-icon">📋</span>
                    Requests
                  </button>
                  <div className="user-section">
                    <div className="user-info">
                      <span className="user-avatar">👤</span>
                      <span className="user-name">{user.name}</span>
                    </div>
                    <button className="nav-btn nav-btn-logout" onClick={() => onLogout && onLogout()}>
                      <span className="nav-icon">🚪</span>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('home')}>
                    <span className="nav-icon">🏠</span>
                    Home
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('requests')}>
                    <span className="nav-icon">📋</span>
                    Requests
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('admin-appointments')}>
                    <span className="nav-icon">📅</span>
                    Appointments
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('profile')}>
                    <span className="nav-icon">👤</span>
                    Profile
                  </button>
                  <button className="nav-btn" onClick={() => onNavigate && onNavigate('dashboard')}>
                    <span className="nav-icon">📊</span>
                    Donor List
                  </button>
                  <div className="user-section">
                    <div className="user-info">
                      <span className="user-avatar">👤</span>
                      <span className="user-name">{user.name}</span>
                      
                    </div>
                    <button className="nav-btn nav-btn-logout" onClick={() => onLogout && onLogout()}>
                      <span className="nav-icon">🚪</span>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}