const AUTH_BASE = 'http://localhost:4000/auth'
const DONOR_BASE = 'http://localhost:3000'
const REQUEST_BASE = 'http://localhost:3002'
const APPT_BASE = 'http://localhost:3010'

function getStoredUser() {
  try { return JSON.parse(localStorage.getItem('user')) } catch (e) { return null }
}

async function handleJsonResponse(res) {
  const text = await res.text()
  try { return JSON.parse(text) } catch (e) { return { ok: res.ok, text } }
}

export async function register(payload) {
  const res = await fetch(`${AUTH_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleJsonResponse(res)
}

export async function login(payload) {
  const res = await fetch(`${AUTH_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleJsonResponse(res)
}

// DONOR APIs
export async function addDonor(payload) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${DONOR_BASE}/donors`, { method: 'POST', headers, body: JSON.stringify(payload) })
  return handleJsonResponse(res)
}

export async function getDonors() {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${DONOR_BASE}/donors`, { headers })
  return handleJsonResponse(res)
}

export async function deleteDonor(id) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${DONOR_BASE}/donors/${id}`, { method: 'DELETE', headers })
  return handleJsonResponse(res)
}

export async function updateDonor(id, payload) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${DONOR_BASE}/donors/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) })
  return handleJsonResponse(res)
}

// REQUEST APIs
export async function addRequest(payload) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${REQUEST_BASE}/request`, { method: 'POST', headers, body: JSON.stringify(payload) })
  return handleJsonResponse(res)
}

export async function getRequests() {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${REQUEST_BASE}/request`, { headers })
  return handleJsonResponse(res)
}

export async function getRequest(id) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${REQUEST_BASE}/request/${id}`, { headers })
  return handleJsonResponse(res)
}

export async function updateRequestStatus(id, status) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${REQUEST_BASE}/request/${id}/status`, { method: 'PUT', headers, body: JSON.stringify({ status }) })
  return handleJsonResponse(res)
}

export async function deleteRequest(id) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${REQUEST_BASE}/request/${id}`, { method: 'DELETE', headers })
  return handleJsonResponse(res)
}

// APPOINTMENT APIs
export async function addAppointment(payload) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${APPT_BASE}/appointments`, { method: 'POST', headers, body: JSON.stringify(payload) })
  return handleJsonResponse(res)
}

export async function getAppointments() {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${APPT_BASE}/appointments`, { headers })
  return handleJsonResponse(res)
}

export async function getAppointment(id) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${APPT_BASE}/appointments/${id}`, { headers })
  return handleJsonResponse(res)
}

export async function updateAppointment(id, payload) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${APPT_BASE}/appointments/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) })
  return handleJsonResponse(res)
}

export async function changeAppointmentStatus(id, status) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${APPT_BASE}/appointments/${id}/status`, { method: 'PUT', headers, body: JSON.stringify({ status }) })
  return handleJsonResponse(res)
}

export async function deleteAppointment(id) {
  const user = getStoredUser()
  if (!user || !user.token) return { error: 'Not authenticated. Please log in first.' }
  const headers = { 'Authorization': `Bearer ${user.token}` }
  const res = await fetch(`${APPT_BASE}/appointments/${id}`, { method: 'DELETE', headers })
  return handleJsonResponse(res)
}

