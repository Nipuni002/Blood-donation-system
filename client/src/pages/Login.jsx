import React, { useState } from 'react'
import { login } from '../api'
import './Login.css'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      const res = await login({ email, password })
      if (res.error) return setError(res.error)
      
      // Expect token, role, name, email
      const user = { 
        id: res.id, 
        token: res.token, 
        role: res.role, 
        name: res.name, 
        email: res.email 
      }
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('userEmail', email)
      }
      
      onLogin(user)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (role) => {
    const demoAccounts = {
      user: { email: 'demo@user.com', password: 'password' },
      admin: { email: 'admin@hopeblood.com', password: 'admin123' }
    }
    
    setEmail(demoAccounts[role].email)
    setPassword(demoAccounts[role].password)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-hero">
            <div className="hero-logo">
              <span className="logo-icon">🩸</span>
              <h1>HopeBlood</h1>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue saving lives and managing blood donations.</p>
            
            <div className="hero-stats">
              <div className="stat">
                <h3>8,500+</h3>
                <p>Active Donors</p>
              </div>
              <div className="stat">
                <h3>15,000+</h3>
                <p>Lives Saved</p>
              </div>
            </div>

            <div className="demo-accounts">
              <h4>Quick Demo Access</h4>
              <div className="demo-buttons">
                <button 
                  type="button"
                  className="demo-btn user-demo"
                  onClick={() => handleDemoLogin('user')}
                >
                  <span className="demo-icon">👤</span>
                  User Demo
                </button>
                <button 
                  type="button"
                  className="demo-btn admin-demo"
                  onClick={() => handleDemoLogin('admin')}
                >
                  <span className="demo-icon">👨‍💼</span>
                  Admin Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={submit}>
            <div className="form-header">
              <h3>Sign In</h3>
              <p>Welcome back! Please enter your details.</p>
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
                  placeholder="Enter your email address"
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
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="btn-icon">🔑</span>
                  Sign In
                </>
              )}
            </button>

            {error && (
              <div className="error-message">
                <span className="error-icon">❌</span>
                {error}
              </div>
            )}

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google-btn">
                <span className="social-icon">🔍</span>
                Continue with Google
              </button>
              <button type="button" className="social-btn github-btn">
                <span className="social-icon">💻</span>
                Continue with Email
              </button>
            </div>

            <div className="form-footer">
              <p>
                Don't have an account? <a href="/register" className="register-link">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}