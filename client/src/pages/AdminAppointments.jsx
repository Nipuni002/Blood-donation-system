import React, { useEffect, useState } from 'react'
import { getAppointments, changeAppointmentStatus, deleteAppointment } from '../api'
import './AdminAppointments.css'

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getAppointments()
      if (res && res.error) return setError(res.error)
      setAppointments(res || [])
    } catch (err) {
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleStatus = async (id, status) => {
    try {
      const res = await changeAppointmentStatus(id, status)
      if (res && res.error) return setError(res.error)
      load()
    } catch (err) {
      setError('Failed to update status')
    }
  }

  const handleDelete = async (id, donorName) => {
    if (!confirm(`Are you sure you want to delete the appointment for ${donorName}?`)) return
    try {
      const res = await deleteAppointment(id)
      if (res && res.error) return setError(res.error)
      load()
    } catch (err) {
      setError('Failed to delete appointment')
    }
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

  // Filter appointments
  const filteredAppointments = appointments
    .filter(appointment => {
      const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus
      const matchesSearch = appointment.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })
    .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    accepted: appointments.filter(a => a.status === 'accepted').length,
    rejected: appointments.filter(a => a.status === 'rejected').length
  }

  return (
    <div className="admin-appointments-container">
      {/* Header Section */}
      <div className="admin-appointments-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Appointment Management</h1>
              <p>Manage and monitor all blood donation appointment requests</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <h3>{stats.total}</h3>
                <p>Total</p>
              </div>
              <div className="stat">
                <h3>{stats.pending}</h3>
                <p>Pending</p>
              </div>
              <div className="stat">
                <h3>{stats.accepted}</h3>
                <p>Accepted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="admin-appointments-content">
          {/* Controls Section */}
          <div className="controls-section">
            <div className="controls-card">
              <div className="controls-header">
                <h2>
                  <span className="controls-icon">📊</span>
                  Appointment Requests
                </h2>
                <div className="controls-actions">
                  <button className="refresh-btn" onClick={load}>
                    <span className="btn-icon">🔄</span>
                    Refresh
                  </button>
                </div>
              </div>

              <div className="filters">
                <div className="filter-group">
                  <label>Search Appointments</label>
                  <div className="input-container">
                    <span className="input-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search by donor name, location, or notes..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Filter by Status</label>
                  <select 
                    value={filterStatus} 
                    onChange={e => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span className="error-icon">❌</span>
              {error}
            </div>
          )}

          {/* Appointments List */}
          <div className="appointments-section">
            <div className="appointments-card">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner-large"></div>
                  <p>Loading appointments...</p>
                </div>
              ) : (
                <>
                  {filteredAppointments.length === 0 ? (
                    <div className="no-appointments">
                      <div className="no-data-content">
                        <span className="no-data-icon">📅</span>
                        <h3>No Appointments Found</h3>
                        <p>No appointment requests match your current filters.</p>
                        <button 
                          className="btn btn-primary"
                          onClick={() => {
                            setFilterStatus('all')
                            setSearchTerm('')
                          }}
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="appointments-list">
                      {filteredAppointments.map(appointment => {
                        const statusInfo = getStatusBadge(appointment.status)
                        return (
                          <div key={appointment.id} className="appointment-item">
                            <div className="appointment-main">
                              <div className="appointment-header">
                                <div className="donor-info">
                                  <h3>{appointment.donor_name || 'Unnamed Donor'}</h3>
                                  <div className="user-info">
                                    <span className="user-icon">👤</span>
                                    User ID: {appointment.user_id}
                                  </div>
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
                                <div className="detail-row">
                                  <div className="detail-item">
                                    <span className="detail-icon">📅</span>
                                    <div>
                                      <label>Date</label>
                                      <p>{appointment.date}</p>
                                    </div>
                                  </div>
                                  <div className="detail-item">
                                    <span className="detail-icon">⏰</span>
                                    <div>
                                      <label>Time</label>
                                      <p>{appointment.time}</p>
                                    </div>
                                  </div>
                                  <div className="detail-item">
                                    <span className="detail-icon">📍</span>
                                    <div>
                                      <label>Location</label>
                                      <p>{appointment.location || 'Not specified'}</p>
                                    </div>
                                  </div>
                                </div>

                                {appointment.notes && (
                                  <div className="notes-section">
                                    <span className="notes-icon">📝</span>
                                    <div className="notes-content">
                                      <label>Additional Notes</label>
                                      <p>{appointment.notes}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="appointment-actions">
                              {appointment.status !== 'accepted' && (
                                <button 
                                  className="action-btn accept-btn"
                                  onClick={() => handleStatus(appointment.id, 'accepted')}
                                >
                                  <span className="action-icon">✅</span>
                                  Accept
                                </button>
                              )}
                              {appointment.status !== 'rejected' && (
                                <button 
                                  className="action-btn reject-btn"
                                  onClick={() => handleStatus(appointment.id, 'rejected')}
                                >
                                  <span className="action-icon">❌</span>
                                  Reject
                                </button>
                              )}
                              <button 
                                className="action-btn complete-btn"
                                onClick={() => handleStatus(appointment.id, 'completed')}
                              >
                                <span className="action-icon">🎉</span>
                                Complete
                              </button>
                              <button 
                                className="action-btn delete-btn"
                                onClick={() => handleDelete(appointment.id, appointment.donor_name || 'this appointment')}
                              >
                                <span className="action-icon">🗑️</span>
                                Delete
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </>
              )}

              {!loading && filteredAppointments.length > 0 && (
                <div className="list-footer">
                  <p>Showing {filteredAppointments.length} of {appointments.length} appointments</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="admin-appointments-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🩸</span>
                <span className="logo-text">HopeBlood</span>
              </div>
              <p className="footer-slogan">Hope starts with a single donor</p>
              <p className="footer-description">
                Admin dashboard for managing blood donation appointments and saving lives through coordinated efforts.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Admin Tools</h4>
              <ul>
                <li><a href="#">Appointment Management</a></li>
                <li><a href="#">Donor Management</a></li>
                <li><a href="#">Request Management</a></li>
                <li><a href="#">Analytics</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Admin Guide</a></li>
                <li><a href="#">System Logs</a></li>
                <li><a href="#">Backup</a></li>
                <li><a href="#">Settings</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <div className="support-info">
                <div className="contact-item">
                  <span className="contact-icon">👨‍💼</span>
                  <div>
                    <p>Admin Support</p>
                    <p className="contact-detail">admin@hopeblood.org</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🔧</span>
                  <div>
                    <p>Technical Help</p>
                    <p className="contact-detail">tech@hopeblood.org</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🚨</span>
                  <div>
                    <p>Emergency</p>
                    <p className="contact-detail">1-800-HOPE-BLD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 HopeBlood. All rights reserved. | Admin Dashboard v2.1</p>
          </div>
        </div>
      </footer>
    </div>
  )
}