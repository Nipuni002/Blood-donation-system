import React, { useState, useEffect } from 'react'
import { addAppointment, getAppointments, changeAppointmentStatus, deleteAppointment } from '../api'
import './Appointments.css'

export default function Appointments({ user }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorContact, setDonorContact] = useState('')
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('book')

  async function load() {
    setLoading(true)
    const res = await getAppointments()
    setLoading(false)
    if (res && res.error) return setMessage({ type: 'error', text: res.error })
    setAppointments(res || [])
  }

  useEffect(() => { load() }, [])

  async function submit(e) {
    e && e.preventDefault()
    setMessage(null)
    const payload = { donor_name: donorName, donor_contact: donorContact, date, time, location, notes }
    const res = await addAppointment(payload)
    if (res && res.error) return setMessage({ type: 'error', text: res.error })
    setMessage({ type: 'success', text: 'Appointment requested successfully!' })
    setDonorName(''); setDonorContact(''); setDate(''); setTime(''); setLocation(''); setNotes('')
    load()
    setActiveTab('view')
  }

  async function onChangeStatus(id, status) {
    const res = await changeAppointmentStatus(id, status)
    if (res && res.error) return setMessage({ type: 'error', text: res.error })
    setMessage({ type: 'success', text: `Appointment ${status} successfully!` })
    load()
  }

  async function onDelete(id, donorName) {
    if (!confirm(`Are you sure you want to delete the appointment for ${donorName}?`)) return
    const res = await deleteAppointment(id)
    if (res && res.error) return setMessage({ type: 'error', text: res.error })
    setMessage({ type: 'success', text: 'Appointment deleted successfully!' })
    load()
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: '#FF9800', icon: '⏳', label: 'Pending' },
      'accepted': { color: '#4CAF50', icon: '✅', label: 'Accepted' },
      'rejected': { color: '#E53935', icon: '❌', label: 'Rejected' },
      'completed': { color: '#2196F3', icon: '🎉', label: 'Completed' }
    }
    return statusConfig[status] || { color: '#607D8B', icon: '❓', label: status }
  }

  const upcomingAppointments = appointments.filter(a => a.status === 'accepted' || a.status === 'pending')
  const pastAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'rejected')

  return (
    <div className="appointments-container">
      {/* Header Section */}
      <div className="appointments-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Blood Donation Appointments</h1>
              <p>Schedule and manage blood donation appointments to save lives</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <h3>{upcomingAppointments.length}</h3>
                <p>Upcoming</p>
              </div>
              <div className="stat">
                <h3>{pastAppointments.length}</h3>
                <p>Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="appointments-content">
          {/* Tabs Navigation */}
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'book' ? 'active' : ''}`}
              onClick={() => setActiveTab('book')}
            >
              <span className="tab-icon">📅</span>
              Book Appointment
            </button>
            <button 
              className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
              onClick={() => setActiveTab('view')}
            >
              <span className="tab-icon">👁️</span>
              View Appointments
            </button>
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              <span className="message-icon">
                {message.type === 'success' ? '✅' : '❌'}
              </span>
              {message.text}
            </div>
          )}

          {/* Book Appointment Form */}
          {activeTab === 'book' && (
            <div className="form-section">
              {!user ? (
                <div className="login-prompt">
                  <div className="prompt-content">
                    <span className="prompt-icon">🔒</span>
                    <h3>Login Required</h3>
                    <p>Please login to book a blood donation appointment</p>
                    <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>
                      Go to Login
                    </button>
                  </div>
                </div>
              ) : (
                <div className="form-card">
                  <div className="form-header">
                    <h2>
                      <span className="form-icon">🩸</span>
                      Book New Appointment
                    </h2>
                    <p>Fill in the details to schedule a blood donation appointment</p>
                  </div>

                  <form onSubmit={submit} className="appointment-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="donorName">Donor Name *</label>
                        <div className="input-container">
                          <span className="input-icon">👤</span>
                          <input 
                            id="donorName"
                            value={donorName} 
                            onChange={e => setDonorName(e.target.value)}
                            placeholder="Enter donor's full name"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="donorContact">Contact Information *</label>
                        <div className="input-container">
                          <span className="input-icon">📞</span>
                          <input 
                            id="donorContact"
                            value={donorContact} 
                            onChange={e => setDonorContact(e.target.value)}
                            placeholder="Phone number or email"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="date">Appointment Date *</label>
                        <div className="input-container">
                          <span className="input-icon">📅</span>
                          <input 
                            id="date"
                            type="date" 
                            value={date} 
                            onChange={e => setDate(e.target.value)} 
                            required 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="time">Appointment Time *</label>
                        <div className="input-container">
                          <span className="input-icon">⏰</span>
                          <input 
                            id="time"
                            type="time" 
                            value={time} 
                            onChange={e => setTime(e.target.value)} 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Donation Location</label>
                      <div className="input-container">
                        <span className="input-icon">📍</span>
                        <input 
                          id="location"
                          value={location} 
                          onChange={e => setLocation(e.target.value)}
                          placeholder="Blood bank or donation center"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="notes">Additional Notes</label>
                      <div className="textarea-container">
                        <span className="input-icon">📝</span>
                        <textarea 
                          id="notes"
                          value={notes} 
                          onChange={e => setNotes(e.target.value)}
                          placeholder="Any special requirements or notes..."
                          rows="4"
                        />
                      </div>
                    </div>

                    <button type="submit" className="submit-btn">
                      <span className="btn-icon">📅</span>
                      Schedule Appointment
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* View Appointments */}
          {activeTab === 'view' && (
            <div className="appointments-list">
              <div className="list-card">
                <div className="list-header">
                  <h2>
                    <span className="list-icon">📋</span>
                    All Appointments
                  </h2>
                  <div className="list-actions">
                    <button className="refresh-btn" onClick={load}>
                      <span className="btn-icon">🔄</span>
                      Refresh
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading appointments...</p>
                  </div>
                ) : (
                  <>
                    {/* Upcoming Appointments */}
                    {upcomingAppointments.length > 0 && (
                      <div className="appointments-section">
                        <h3 className="section-title">🟢 Upcoming Appointments</h3>
                        <div className="appointments-grid">
                          {upcomingAppointments.map(appointment => {
                            const statusInfo = getStatusBadge(appointment.status)
                            return (
                              <div key={appointment.id} className="appointment-card">
                                <div className="appointment-header">
                                  <div className="donor-info">
                                    <h4>{appointment.donor_name || '—'}</h4>
                                    <p>{appointment.donor_contact || '—'}</p>
                                  </div>
                                  <div 
                                    className="status-badge"
                                    style={{ backgroundColor: statusInfo.color }}
                                  >
                                    <span className="status-icon">{statusInfo.icon}</span>
                                    {statusInfo.label}
                                  </div>
                                </div>
                                
                                <div className="appointment-details">
                                  <div className="detail-item">
                                    <span className="detail-icon">📅</span>
                                    <span>{appointment.date}</span>
                                  </div>
                                  <div className="detail-item">
                                    <span className="detail-icon">⏰</span>
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="detail-item">
                                    <span className="detail-icon">📍</span>
                                    <span>{appointment.location || 'Not specified'}</span>
                                  </div>
                                  {appointment.notes && (
                                    <div className="detail-item">
                                      <span className="detail-icon">📝</span>
                                      <span>{appointment.notes}</span>
                                    </div>
                                  )}
                                </div>

                                <div className="appointment-actions">
                                  {user && user.role === 'admin' && (
                                    <>
                                      <button 
                                        className="action-btn accept-btn"
                                        onClick={() => onChangeStatus(appointment.id, 'accepted')}
                                      >
                                        <span className="action-icon">✅</span>
                                        Accept
                                      </button>
                                      <button 
                                        className="action-btn reject-btn"
                                        onClick={() => onChangeStatus(appointment.id, 'rejected')}
                                      >
                                        <span className="action-icon">❌</span>
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {user && String(user.id) === String(appointment.user_id) && (
                                    <button 
                                      className="action-btn delete-btn"
                                      onClick={() => onDelete(appointment.id, appointment.donor_name)}
                                    >
                                      <span className="action-icon">🗑️</span>
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Past Appointments */}
                    {pastAppointments.length > 0 && (
                      <div className="appointments-section">
                        <h3 className="section-title">🔚 Past Appointments</h3>
                        <div className="appointments-grid">
                          {pastAppointments.map(appointment => {
                            const statusInfo = getStatusBadge(appointment.status)
                            return (
                              <div key={appointment.id} className="appointment-card past">
                                <div className="appointment-header">
                                  <div className="donor-info">
                                    <h4>{appointment.donor_name || '—'}</h4>
                                    <p>{appointment.donor_contact || '—'}</p>
                                  </div>
                                  <div 
                                    className="status-badge"
                                    style={{ backgroundColor: statusInfo.color }}
                                  >
                                    <span className="status-icon">{statusInfo.icon}</span>
                                    {statusInfo.label}
                                  </div>
                                </div>
                                
                                <div className="appointment-details">
                                  <div className="detail-item">
                                    <span className="detail-icon">📅</span>
                                    <span>{appointment.date}</span>
                                  </div>
                                  <div className="detail-item">
                                    <span className="detail-icon">⏰</span>
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="detail-item">
                                    <span className="detail-icon">📍</span>
                                    <span>{appointment.location || 'Not specified'}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {appointments.length === 0 && (
                      <div className="no-appointments">
                        <div className="no-data-content">
                          <span className="no-data-icon">📅</span>
                          <h3>No Appointments Found</h3>
                          <p>You haven't scheduled any blood donation appointments yet.</p>
                          <button 
                            className="btn btn-primary"
                            onClick={() => setActiveTab('book')}
                          >
                            Book Your First Appointment
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="appointments-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🩸</span>
                <span className="logo-text">HopeBlood</span>
              </div>
              <p className="footer-slogan">Hope starts with a single donor</p>
              <p className="footer-description">
                Schedule blood donation appointments and help save lives in your community.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Find Donors</a></li>
                <li><a href="#">Blood Banks</a></li>
                <li><a href="#">Appointments</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Donation Guide</a></li>
                <li><a href="#">Preparation Tips</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Need Help?</h4>
              <div className="help-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <p>Appointment Help</p>
                    <p className="contact-detail">1-800-APPOINT</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <p>Email Support</p>
                    <p className="contact-detail">appointments@hopeblood.org</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🏥</span>
                  <div>
                    <p>Emergency</p>
                    <p className="contact-detail">1-800-HOPE-BLD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 HopeBlood. All rights reserved. Every appointment saves lives.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}