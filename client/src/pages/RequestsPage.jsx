import React, { useEffect, useState } from 'react'
import { addRequest, getRequests, updateRequestStatus } from '../api'
import './RequestsPage.css'

export default function RequestsPage({ user }) {
  const [patientName, setPatientName] = useState('')
  const [requiredBloodGroup, setRequiredBloodGroup] = useState('')
  const [hospital, setHospital] = useState('')
  const [location, setLocation] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [urgency, setUrgency] = useState('Normal')
  const [message, setMessage] = useState(null)
  const [requests, setRequests] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const currentUserId = user && user.id ? user.id : ''

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const urgencyLevels = [
    { value: 'Normal', label: 'Normal', color: '#4CAF50', icon: '🟢' },
    { value: 'High', label: 'High', color: '#FF9800', icon: '🟡' },
    { value: 'Critical', label: 'Critical', color: '#E53935', icon: '🔴' }
  ]

  const submit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)
    
    // Basic client-side validation
    if (!patientName || !requiredBloodGroup || !hospital) {
      setMessage({ type: 'error', text: 'Please fill patient name, required blood group and hospital' })
      setIsLoading(false)
      return
    }
    
    const payload = {
      user_id: currentUserId,
      patient_name: patientName,
      required_blood_group: requiredBloodGroup,
      hospital,
      location,
      contact_number: contactNumber,
      urgency
    }
    
    try {
      const res = await addRequest(payload)
      if (res.error) {
        setMessage({ type: 'error', text: res.error })
      } else {
        setMessage({ type: 'success', text: 'Blood request submitted successfully!' })
        setPatientName(''); setRequiredBloodGroup(''); setHospital(''); setLocation(''); setContactNumber(''); setUrgency('Normal')
        fetchList()
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to submit request. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchList = async () => {
    setError(null)
    try {
      const res = await getRequests()
      if (res.error) return setError(res.error)
      setRequests(res)
    } catch (err) {
      setError('Failed to load requests. Please try again.')
    }
  }

  useEffect(() => { fetchList() }, [])

  const handleUpdateStatus = async (id, status) => {
    setMessage(null)
    const res = await updateRequestStatus(id, status)
    if (res.error) return setMessage({ type: 'error', text: res.error })
    setMessage({ type: 'success', text: `Request ${status.toLowerCase()} successfully!` })
    fetchList()
  }

  const handleDelete = async (id) => {
    setMessage(null)
    if (!window.confirm('Are you sure you want to delete this request?')) return
    const { error } = await (await import('../api')).then(m => m.deleteRequest(id))
    if (error) return setMessage({ type: 'error', text: error })
    setMessage({ type: 'success', text: 'Request deleted successfully!' })
    fetchList()
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { color: '#FF9800', icon: '⏳' },
      'Accepted': { color: '#4CAF50', icon: '✅' },
      'Rejected': { color: '#E53935', icon: '❌' },
      'Completed': { color: '#2196F3', icon: '🎉' }
    }
    return statusConfig[status] || { color: '#607D8B', icon: '❓' }
  }

  const getUrgencyBadge = (urgencyLevel) => {
    return urgencyLevels.find(u => u.value === urgencyLevel) || urgencyLevels[0]
  }

  return (
    <div className="requests-container">
      {/* Header Section */}
      <div className="requests-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Blood Requests</h1>
              <p>Submit and manage blood donation requests. Every request helps save lives.</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <h3>{requests.length}</h3>
                <p>Total Requests</p>
              </div>
              <div className="stat">
                <h3>{requests.filter(r => r.urgency === 'Critical').length}</h3>
                <p>Critical Cases</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="requests-content">
          {/* Request Form Section */}
          {user && user.role !== 'admin' && (
            <div className="form-section">
              <div className="form-card">
                <div className="form-header">
                  <h2>
                    <span className="form-icon">🩸</span>
                    Submit Blood Request
                  </h2>
                  <p>Fill in the details to request blood donation assistance</p>
                </div>

                <form onSubmit={submit} className="request-form">
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
                      <label htmlFor="patientName">Patient Name *</label>
                      <div className="input-container">
                        <span className="input-icon">👤</span>
                        <input 
                          id="patientName"
                          value={patientName} 
                          onChange={e => setPatientName(e.target.value)} 
                          placeholder="Enter patient's full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bloodGroup">Blood Group *</label>
                      <div className="input-container">
                        <span className="input-icon">💉</span>
                        <select 
                          id="bloodGroup"
                          value={requiredBloodGroup} 
                          onChange={e => setRequiredBloodGroup(e.target.value)}
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
                      <label htmlFor="hospital">Hospital *</label>
                      <div className="input-container">
                        <span className="input-icon">🏥</span>
                        <input 
                          id="hospital"
                          value={hospital} 
                          onChange={e => setHospital(e.target.value)} 
                          placeholder="Enter hospital name"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <div className="input-container">
                        <span className="input-icon">📍</span>
                        <input 
                          id="location"
                          value={location} 
                          onChange={e => setLocation(e.target.value)} 
                          placeholder="Enter location"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contactNumber">Contact Number</label>
                      <div className="input-container">
                        <span className="input-icon">📞</span>
                        <input 
                          id="contactNumber"
                          value={contactNumber} 
                          onChange={e => setContactNumber(e.target.value)} 
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="urgency">Urgency Level</label>
                      <div className="input-container">
                        <span className="input-icon">⚡</span>
                        <select 
                          id="urgency"
                          value={urgency} 
                          onChange={e => setUrgency(e.target.value)}
                        >
                          {urgencyLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.icon} {level.label}
                            </option>
                          ))}
                        </select>
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
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">📤</span>
                        Submit Request
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
          )}

          {/* Requests Table Section */}
          <div className="table-section">
            <div className="table-card">
              <div className="table-header">
                <h2>
                  <span className="table-icon">📋</span>
                  All Blood Requests
                </h2>
                <div className="table-actions">
                  <button className="refresh-btn" onClick={fetchList}>
                    <span className="btn-icon">🔄</span>
                    Refresh
                  </button>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <span className="error-icon">❌</span>
                  {error}
                </div>
              )}

              <div className="table-container">
                <table className="requests-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Blood Group</th>
                      <th>Hospital</th>
                      <th>Location</th>
                      <th>Contact</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      {user && user.role === 'admin' && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan={user && user.role === 'admin' ? 8 : 7} className="no-data">
                          <div className="no-data-content">
                            <span className="no-data-icon">📭</span>
                            <p>No blood requests found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      requests.map(request => {
                        const statusInfo = getStatusBadge(request.status)
                        const urgencyInfo = getUrgencyBadge(request.urgency)
                        return (
                          <tr key={request.id} className={`request-row urgency-${request.urgency.toLowerCase()}`}>
                            <td>
                              <div className="patient-info">
                                <strong>{request.patient_name}</strong>
                                <small>ID: {request.id}</small>
                              </div>
                            </td>
                            <td>
                              <div className="blood-group-badge">
                                {request.required_blood_group}
                              </div>
                            </td>
                            <td>{request.hospital}</td>
                            <td>{request.location || 'N/A'}</td>
                            <td>{request.contact_number || 'N/A'}</td>
                            <td>
                              <div 
                                className="urgency-badge"
                                style={{ backgroundColor: urgencyInfo.color }}
                              >
                                <span className="urgency-icon">{urgencyInfo.icon}</span>
                                {urgencyInfo.label}
                              </div>
                            </td>
                            <td>
                              <div 
                                className="status-badge"
                                style={{ backgroundColor: statusInfo.color }}
                              >
                                <span className="status-icon">{statusInfo.icon}</span>
                                {request.status}
                              </div>
                            </td>
                            {user && user.role === 'admin' && (
                              <td>
                                <div className="action-buttons">
                                  <button 
                                    className="action-btn accept-btn"
                                    onClick={() => handleUpdateStatus(request.id, 'Accepted')}
                                  >
                                    <span className="action-icon">✅</span>
                                    Accept
                                  </button>
                                  <button 
                                    className="action-btn reject-btn"
                                    onClick={() => handleUpdateStatus(request.id, 'Rejected')}
                                  >
                                    <span className="action-icon">❌</span>
                                    Reject
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="requests-footer">
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