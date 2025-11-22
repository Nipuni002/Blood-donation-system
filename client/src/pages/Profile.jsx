import React from 'react'
import './profile.css'

export default function Profile({ user }) {
  if (!user) return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="not-logged-in">
          <div className="not-logged-icon">🔒</div>
          <h3>Access Required</h3>
          <p>Please log in to view your profile</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  )

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: '#E53935', icon: '👨‍💼', label: 'Administrator' },
      user: { color: '#1E88E5', icon: '👤', label: 'Regular User' },
      donor: { color: '#4CAF50', icon: '🩸', label: 'Blood Donor' }
    }
    return roleConfig[role] || { color: '#607D8B', icon: '❓', label: role }
  }

  const roleInfo = getRoleBadge(user.role)

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your account information and preferences</p>
        </div>
      </div>

      <div className="container">
        <div className="profile-content">
          {/* Main Profile Card */}
          <div className="profile-card main-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              <div className="edit-btn">
                <span className="edit-icon">✏️</span>
                Edit Profile
              </div>
            </div>

            <div className="profile-avatar-section">
              <div className="avatar">
                <span className="avatar-icon">👤</span>
              </div>
              <div className="avatar-info">
                <h3>{user.name}</h3>
                <div 
                  className="role-badge"
                  style={{ backgroundColor: roleInfo.color }}
                >
                  <span className="role-icon">{roleInfo.icon}</span>
                  {roleInfo.label}
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-icon">🆔</div>
                  <div className="detail-content">
                    <label>User ID</label>
                    <p>{user.id || 'N/A'}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">📧</div>
                  <div className="detail-content">
                    <label>Email Address</label>
                    <p>{user.email}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">👤</div>
                  <div className="detail-content">
                    <label>Full Name</label>
                    <p>{user.name}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">🎯</div>
                  <div className="detail-content">
                    <label>Account Type</label>
                    <p>{roleInfo.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="side-cards">
            {/* Account Status Card */}
            <div className="profile-card status-card">
              <div className="card-header">
                <h3>Account Status</h3>
              </div>
              <div className="status-content">
                <div className="status-item active">
                  <span className="status-icon">✅</span>
                  <div>
                    <label>Account Verified</label>
                    <p>Your account is active and verified</p>
                  </div>
                </div>
                <div className="status-item active">
                  <span className="status-icon">🟢</span>
                  <div>
                    <label>Profile Complete</label>
                    <p>All required information provided</p>
                  </div>
                </div>
                <div className="status-item">
                  <span className="status-icon">📅</span>
                  <div>
                    <label>Member Since</label>
                    <p>January 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="profile-card actions-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="actions-content">
                <button className="action-btn">
                  <span className="action-icon">🩸</span>
                  Update Donor Info
                </button>
                <button className="action-btn">
                  <span className="action-icon">🔒</span>
                  Change Password
                </button>
                <button className="action-btn">
                  <span className="action-icon">📋</span>
                  View Donation History
                </button>
                <button className="action-btn">
                  <span className="action-icon">⚙️</span>
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="profile-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🩸</span>
                <span className="logo-text">HopeBlood</span>
              </div>
              <p className="footer-slogan">Hope starts with a single donor</p>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Find Donors</a></li>
                <li><a href="#">Blood Banks</a></li>
                <li><a href="#">Donation Centers</a></li>
                <li><a href="#">Emergency</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>1-800-HOPE-BLD</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>support@hopeblood.org</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🏥</span>
                  <span>24/7 Emergency Line</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 HopeBlood. All rights reserved. Made with ❤️ to save lives.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}