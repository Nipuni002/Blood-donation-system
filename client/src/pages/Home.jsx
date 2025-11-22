import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-element">💉</div>
            <div className="floating-element">🩸</div>
            <div className="floating-element">❤️</div>
            <div className="floating-element">💊</div>
            <div className="floating-element">🏥</div>
          </div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="logo-section">
                <div className="logo">
                  <span className="logo-icon">🩸</span>
                  <h1 className="logo-text">HopeBlood</h1>
                </div>
                <p className="slogan">Hope starts with a single donor</p>
              </div>

              <h1 className="hero-title">
                Give <span className="hero-accent">Blood</span>, 
                Save <span className="hero-accent">Lives</span>
              </h1>
              <p className="hero-description">
                Join our community of life-saving heroes. Your single donation can bring hope 
                to patients in need and make a lasting impact in someone's life.
              </p>
              
              <div className="hero-stats">
                <div className="stat">
                  <h3>15,000+</h3>
                  <p>Lives Saved</p>
                </div>
                <div className="stat">
                  <h3>8,500+</h3>
                  <p>Active Donors</p>
                </div>
                <div className="stat">
                  <h3>120+</h3>
                  <p>Partner Hospitals</p>
                </div>
              </div>
              
              <div className="cta-buttons">
                <button className="btn btn-primary" >
                  <span className="btn-icon">🎯</span>
                  Become a Donor
                </button>
                <button className="btn btn-secondary">
                  <span className="btn-icon">🔍</span>
                  Find Donors
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="main-visual">
                <img 
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Blood Donation Process"
                  className="hero-image"
                />
                <div className="visual-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">How You Can Make a Difference</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3>Register as Donor</h3>
              <p>Join our network of life-savers by registering your details and blood type securely</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Find Matching Donors</h3>
              <p>Quickly locate compatible blood donors during emergency situations</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Coordinate Donations</h3>
              <p>Efficient system to manage and fulfill blood donation requests seamlessly</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Impact</h3>
              <p>Monitor your donation history and the lives you've helped save</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="blood-types-section">
        <div className="container">
          <h2 className="section-title">Blood Types We Support</h2>
          <div className="blood-types-grid">
            <div className="blood-type" data-type="A+">
              <span>A+</span>
            </div>
            <div className="blood-type" data-type="A-">
              <span>A-</span>
            </div>
            <div className="blood-type" data-type="B+">
              <span>B+</span>
            </div>
            <div className="blood-type" data-type="B-">
              <span>B-</span>
            </div>
            <div className="blood-type" data-type="AB+">
              <span>AB+</span>
            </div>
            <div className="blood-type" data-type="AB-">
              <span>AB-</span>
            </div>
            <div className="blood-type" data-type="O+">
              <span>O+</span>
            </div>
            <div className="blood-type" data-type="O-">
              <span>O-</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="emergency-section">
        <div className="container">
          <div className="emergency-content">
            <div className="emergency-text">
              <h2>Emergency Blood Need?</h2>
              <p>Immediate assistance available 24/7. Our team is ready to help you find the right blood type quickly.</p>
              <button className="btn btn-emergency">
                <span className="btn-icon">🆘</span>
                Urgent Blood Request
              </button>
            </div>
            <div className="emergency-visual">
              <div className="emergency-icon">🚨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
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
              <div className="social-links">
                <a href="#" className="social-link">
                  <span className="social-icon">📘</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">🐦</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">📷</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">💼</span>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Find Donors</a></li>
                <li><a href="#">Blood Banks</a></li>
                <li><a href="#">Eligibility</a></li>
                <li><a href="#">About Us</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Donor Guide</a></li>
                <li><a href="#">Blood Types</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Blog</a></li>
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
                <div className="contact-item">
                  <span className="contact-icon">🏥</span>
                  <div>
                    <p>Emergency</p>
                    <p className="contact-detail">911</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2024 HopeBlood. All rights reserved. Made with ❤️ to save lives.</p>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}