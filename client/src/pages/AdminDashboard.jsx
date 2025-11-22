import React, { useEffect, useState } from 'react'
import { getDonors, deleteDonor } from '../api'
import { getAppointments, changeAppointmentStatus, deleteAppointment } from '../api'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [donors, setDonors] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBloodGroup, setFilterBloodGroup] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const fetchDonors = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const res = await getDonors()
      if (res.error) return setError(res.error)
      setDonors(res)
    } catch (err) {
      setError('Failed to load donors. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDonors()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete donor "${name}"?`)) return
    
    try {
      await deleteDonor(id)
      fetchDonors()
    } catch (err) {
      setError('Failed to delete donor. Please try again.')
    }
  }

  // Filter and sort donors
  const filteredDonors = donors
    .filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donor.bloodgroup.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBloodGroup = !filterBloodGroup || donor.bloodgroup === filterBloodGroup
      return matchesSearch && matchesBloodGroup
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'bloodgroup':
          return a.bloodgroup.localeCompare(b.bloodgroup)
        case 'location':
          return a.location.localeCompare(b.location)
        default:
          return 0
      }
    })

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#E53935',
      'A-': '#FF6B6B',
      'B+': '#4CAF50',
      'B-': '#81C784',
      'AB+': '#2196F3',
      'AB-': '#64B5F6',
      'O+': '#FF9800',
      'O-': '#FFB74D'
    }
    return colors[bloodGroup] || '#607D8B'
  }

  const stats = {
    total: donors.length,
    byBloodGroup: bloodGroups.reduce((acc, group) => {
      acc[group] = donors.filter(d => d.bloodgroup === group).length
      return acc
    }, {})
  }

  // Appointments state
  const [appointments, setAppointments] = useState([])
  const [apptLoading, setApptLoading] = useState(false)

  const fetchAppointments = async () => {
    setApptLoading(true)
    try {
      const res = await getAppointments()
      if (res && res.error) {
        // silently ignore here or surface later
        setAppointments([])
      } else {
        setAppointments(res || [])
      }
    } catch (err) {
      setAppointments([])
    } finally {
      setApptLoading(false)
    }
  }

  useEffect(() => { fetchAppointments() }, [])

  const handleApptAction = async (id, status) => {
    try {
      await changeAppointmentStatus(id, status)
      fetchAppointments()
    } catch (err) {
      console.error(err)
    }
  }

  const handleApptDelete = async (id) => {
    if (!window.confirm('Delete appointment?')) return
    try {
      await deleteAppointment(id)
      fetchAppointments()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="admin-dashboard-container">
      {/* Header Section */}
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Donor Management</h1>
              <p>Manage and monitor all registered blood donors in the system</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <h3>{stats.total}</h3>
                <p>Total Donors</p>
              </div>
              <div className="stat">
                <h3>{Math.max(...Object.values(stats.byBloodGroup))}</h3>
                <p>Most Common</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="admin-content">
          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stats-card">
              <h3>Blood Group Distribution</h3>
              <div className="blood-group-stats">
                {bloodGroups.map(group => (
                  <div key={group} className="blood-group-stat">
                    <div className="blood-group-label">
                      <span 
                        className="blood-group-color"
                        style={{ backgroundColor: getBloodGroupColor(group) }}
                      ></span>
                      {group}
                    </div>
                    <div className="blood-group-count">
                      {stats.byBloodGroup[group] || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="controls-section">
            <div className="controls-card">
              <div className="controls-header">
                <h3>Donor List</h3>
                <div className="controls-actions">
                  <button className="refresh-btn" onClick={fetchDonors}>
                    <span className="btn-icon">🔄</span>
                    Refresh
                  </button>
                </div>
              </div>

              <div className="filters">
                <div className="filter-group">
                  <label>Search Donors</label>
                  <div className="input-container">
                    <span className="input-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search by name, location, or blood group..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Filter by Blood Group</label>
                  <select 
                    value={filterBloodGroup} 
                    onChange={e => setFilterBloodGroup(e.target.value)}
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Sort By</label>
                  <select 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="bloodgroup">Blood Group</option>
                    <option value="location">Location</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Donors Table Section */}
          <div className="table-section">
            <div className="table-card">
              {error && (
                <div className="error-message">
                  <span className="error-icon">❌</span>
                  {error}
                </div>
              )}

              <div className="table-container">
                {isLoading ? (
                  <div className="loading-state">
                    <div className="spinner-large"></div>
                    <p>Loading donors...</p>
                  </div>
                ) : (
                  <table className="donors-table">
                    <thead>
                      <tr>
                        <th>Donor Info</th>
                        <th>Blood Group</th>
                        <th>Location</th>
                        <th>Contact</th>
                        <th>User ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDonors.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="no-data">
                            <div className="no-data-content">
                              <span className="no-data-icon">👥</span>
                              <p>No donors found</p>
                              <small>Try adjusting your search or filters</small>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredDonors.map(donor => (
                          <tr key={donor.id} className="donor-row">
                            <td>
                              <div className="donor-info">
                                <div className="donor-avatar">
                                  <span className="avatar-icon">👤</span>
                                </div>
                                <div className="donor-details">
                                  <strong>{donor.name}</strong>
                                  <small>ID: {donor.id}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div 
                                className="blood-group-badge"
                                style={{ backgroundColor: getBloodGroupColor(donor.bloodgroup) }}
                              >
                                {donor.bloodgroup}
                              </div>
                            </td>
                            <td>
                              <div className="location-info">
                                <span className="location-icon">📍</span>
                                {donor.location || 'Not specified'}
                              </div>
                            </td>
                            <td>
                              <div className="contact-info">
                                {donor.phone ? (
                                  <>
                                    <span className="phone-icon">📞</span>
                                    {donor.phone}
                                  </>
                                ) : (
                                  <span className="no-phone">No phone</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="user-id">
                                {donor.user_id}
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  className="action-btn view-btn"
                                  onClick={() => alert(`View details for ${donor.name}`)}
                                >
                                  <span className="action-icon">👁️</span>
                                  View
                                </button>
                                <button 
                                  className="action-btn delete-btn"
                                  onClick={() => handleDelete(donor.id, donor.name)}
                                >
                                  <span className="action-icon">🗑️</span>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {!isLoading && filteredDonors.length > 0 && (
                <div className="table-footer">
                  <p>Showing {filteredDonors.length} of {donors.length} donors</p>
                </div>
              )}
            </div>
          </div>

          {/* Appointments moved to a separate admin page */}
        </div>
      </div>

      {/* Footer */}
      <footer className="admin-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🩸</span>
                <span className="logo-text">HopeBlood</span>
              </div>
              <p className="footer-slogan">Hope starts with a single donor</p>
              <p className="footer-description">
                Admin dashboard for managing blood donors and saving lives through coordinated efforts.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Admin Tools</h4>
              <ul>
                <li><a href="#">Donor Management</a></li>
                <li><a href="#">Request Management</a></li>
                <li><a href="#">User Management</a></li>
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