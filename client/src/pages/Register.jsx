import React, { useState } from 'react'
import { register } from '../api'
import './Register.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)
    
    try {
      const res = await register({ name, email, password, role })
      if (res.error) {
        setMessage({ type: 'error', text: res.error })
      } else {
        setMessage({ type: 'success', text: 'Registered successfully! You can now login.' })
        // Clear form
        setName('')
        setEmail('')
        setPassword('')
        setRole('user')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <div className="register-hero">
            <div className="hero-logo">
              <span className="logo-icon">🩸</span>
              <h1>HopeBlood</h1>
            </div>
            <h2>Join Our Life-Saving Community</h2>
            <p>Create an account to become a blood donor or coordinate blood donations. Together, we can save lives.</p>
            
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">👥</span>
                <div>
                  <h4>Join 8,500+ Donors</h4>
                  <p>Be part of our growing community</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <div>
                  <h4>Quick Registration</h4>
                  <p>Get started in under 2 minutes</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <div>
                  <h4>Secure & Private</h4>
                  <p>Your data is protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register-right">
          <form className="register-form" onSubmit={submit}>
            <div className="form-header">
              <h3>Create Account</h3>
              <p>Join HopeBlood today</p>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-container">
                <span className="input-icon">📧</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength="6"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <div className="input-container">
                <span className="input-icon">🎯</span>
                <select 
                  id="role"
                  value={role} 
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="user">🧑‍💼 Regular User</option>
                  <option value="admin">👨‍💼 Administrator</option>
                </select>
              </div>
              <div className="role-description">
                {role === 'user' ? (
                  <p>Register as a donor or to request blood donations</p>
                ) : (
                  <p>Administrator access for managing the platform</p>
                )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Create Account
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

            <div className="form-footer">
              <p>
                Already have an account? <a href="/login" className="login-link">Sign In</a>
              </p>
            </div>

            <div className="terms">
              <p>
                By creating an account, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}