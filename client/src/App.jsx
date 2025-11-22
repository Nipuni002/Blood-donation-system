import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import RequestsPage from './pages/RequestsPage'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Appointments from './pages/Appointments'
import AdminAppointments from './pages/AdminAppointments'

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const logout = () => {
    setUser(null)
    setRoute('home')
  }
  const [route, setRoute] = useState('home')

  const handleNavigate = (r) => setRoute(r)

  return (
    <div className="container">
      <Navbar user={user} onNavigate={handleNavigate} onLogout={logout} />

      <section style={{ padding: 12 }}>
        {route === 'home' && <Home />}

        {!user && route === 'login' && <div className="auth-wrap"><Login onLogin={(u) => { setUser(u); setRoute('profile') }} /></div>}
        {!user && route === 'register' && <div className="auth-wrap"><Register /></div>}

        {route === 'profile' && <Profile user={user} />}
        {route === 'appointments' && <Appointments user={user} />}
        {route === 'admin-appointments' && user && user.role === 'admin' && <AdminAppointments />}

        {route === 'requests' && <RequestsPage user={user} />}
        {route === 'adddonor' && user && <UserDashboard />}
        {route === 'dashboard' && user && (user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />)}
      </section>
    </div>
  )
}
