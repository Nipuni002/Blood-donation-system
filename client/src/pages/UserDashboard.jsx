import React, { useState, useEffect } from 'react'
import { addDonor, getDonors, deleteDonor, updateDonor } from '../api'
import './UserDashboard.css'

export default function UserDashboard() {
  const [name, setName] = useState('')
  const [bloodgroup, setBloodgroup] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(null)
  const [donors, setDonors] = useState([])
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // read user id from localStorage (if present)
  const currentUser = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch (e) { return null } })()
  const currentUserId = currentUser ? currentUser.id : null

  const submit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)
    
    try {
      let res
      if (editingId) {
        res = await updateDonor(editingId, { name, bloodgroup, location, phone })
      } else {
        res = await addDonor({ name, bloodgroup, location, phone })
      }

      if (res.error) return setMessage({ type: 'error', text: res.error })

      setMessage({ 
        type: 'success', 
        text: editingId ? 'Donor updated successfully!' : 'Donor added successfully!' 
      })
      setName(''); setBloodgroup(''); setLocation(''); setPhone('')
      setEditingId(null)
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Server error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  return (
    <div className="user-dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Add Blood Donor</h1>
              <p>Register new blood donors to help save lives. Your contribution makes a difference.</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <h3>8,500+</h3>
                <p>Active Donors</p>
              </div>
              <div className="stat">
                <h3>120+</h3>
                <p>Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-content">
          {/* Main Form Section */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2>
                  <span className="form-icon">🩸</span>
                  {editingId ? 'Update Donor Information' : 'Register New Donor'}
                </h2>
                <p>Fill in the donor details below to add them to our database</p>
              </div>

              <form onSubmit={submit} className="donor-form">
                <div className="form-group">
                  <label htmlFor="userId">User ID</label>
                  <div className="input-container">
                    <span className="input-icon">🆔</span>
                    <input 
                      id="userId"
                      value={currentUserId || 'Not available'} 
                      readOnly 
                      className="readonly-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <div className="input-container">
                      <span className="input-icon">👤</span>
                      <input 
                        id="name"
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Enter donor's full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="bloodgroup">Blood Group *</label>
                    <div className="input-container">
                      <span className="input-icon">💉</span>
                      <select 
                        id="bloodgroup"
                        value={bloodgroup} 
                        onChange={e => setBloodgroup(e.target.value)}
                        required
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">Location *</label>
                    <div className="input-container">
                      <span className="input-icon">📍</span>
                      <input 
                        id="location"
                        value={location} 
                        onChange={e => setLocation(e.target.value)} 
                        placeholder="Enter city or area"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <div className="input-container">
                      <span className="input-icon">📞</span>
                      <input 
                        id="phone"
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      {editingId ? 'Updating Donor...' : 'Adding Donor...'}
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">{editingId ? '🔄' : '➕'}</span>
                      {editingId ? 'Update Donor' : 'Add Donor'}
                    </>
                  )}
                </button>

                {message && (
                  <div className={`message ${message.type}`}>
                    <span className="message-icon">
                      {message.type === 'success' ? '✅' : '❌'}
                    </span>
                    {message.text}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="info-sidebar">
            <div className="info-card">
              <div className="card-header">
                <h3>💡 Donor Guidelines</h3>
              </div>
              <div className="guidelines-list">
                <div className="guideline-item">
                  <span className="guideline-icon">✅</span>
                  <div>
                    <h4>Accurate Information</h4>
                    <p>Ensure all donor details are correct and verified</p>
                  </div>
                </div>
                <div className="guideline-item">
                  <span className="guideline-icon">📞</span>
                  <div>
                    <h4>Contact Permission</h4>
                    <p>Make sure the donor consents to be contacted</p>
                  </div>
                </div>
                <div className="guideline-item">
                  <span className="guideline-icon">🩸</span>
                  <div>
                    <h4>Blood Group Verification</h4>
                    <p>Double-check the blood group information</p>
                  </div>
                </div>
                <div className="guideline-item">
                  <span className="guideline-icon">🔒</span>
                  <div>
                    <h4>Privacy First</h4>
                    <p>We protect donor information securely</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card emergency-card">
              <div className="card-header">
                <h3>🚨 Emergency Help</h3>
              </div>
              <div className="emergency-content">
                <p>Need immediate blood assistance?</p>
                <button className="emergency-btn">
                  <span className="btn-icon">🆘</span>
                  Request Emergency Blood
                </button>
                <div className="emergency-contact">
                  <p>📞 24/7 Helpline: <strong>1-800-HOPE-BLD</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🩸</span>
                <span className="logo-text">HopeBlood</span>
              </div>
              <p className="footer-slogan">Hope starts with a single donor</p>
              <p className="footer-description">
                Connecting blood donors with those in need. Together, we can save lives and create hope in our community.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Find Donors</a></li>
                <li><a href="#">Blood Banks</a></li>
                <li><a href="#">Eligibility</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Donor Guide</a></li>
                <li><a href="#">Blood Types</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Emergency Contact</h4>
              <div className="emergency-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <p>24/7 Helpline</p>
                    <p className="contact-detail">1-800-HOPE-BLD</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <p>Email Support</p>
                    <p className="contact-detail">help@hopeblood.org</p>
                  </div>
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