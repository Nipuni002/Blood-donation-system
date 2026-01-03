<div align="center">

# 🩸 Blood Donation Management System

### *Connecting Lives Through Technology*

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

A comprehensive, production-ready blood donation management system built with modern **microservices architecture**. This system facilitates blood donation coordination between donors, patients, and medical facilities through an intuitive web interface.

[🚀 Quick Start](#-getting-started) • [📖 Documentation](#-api-documentation) • [🏗️ Architecture](#️-architecture--design-patterns) • [🐳 Docker Setup](#deployment-options)

</div>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Technology Stack](#technology-stack)
- [System Components](#system-components)
- [Getting Started](#getting-started)
- [Deployment Options](#deployment-options)
- [API Documentation](#api-documentation)
- [Security Concepts](#security-concepts)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

---

## 🎯 Overview

The Blood Donation System is a full-stack web application designed to streamline the blood donation process. It connects blood donors with patients in need, manages appointment scheduling, tracks donation requests, and provides administrative oversight—all through a responsive, user-friendly interface.

### **🎪 Key Capabilities**

<table>
<tr>
<td width="50%">

#### 👥 Donor Management
Register and track blood donors with their blood groups and contact information

</td>
<td width="50%">
<table>
<tr>
<td width="50%" valign="top">

### 👤 For Regular Users

- 🔐 **User registration and authentication**
- 👨‍⚕️ **Profile management** with personal information
- 🆘 **Submit blood donation requests** for patients
- 📆 **Schedule donation appointments**
- 📜 **View personal request history** and status
- 🔍 **Browse available donors** by blood group
- 📱 **Responsive mobile interface**

</td>
<td width="50%" valign="top">

### 🛡️ For Administrators

- 📊 **Complete donor database management** (CRUD operations)
- 🌍 **View and manage all blood requests** system-wide
- 🗓️ **Oversee all appointments** across the platform
- ✏️ **Update request statuses** (Pending/Approved/Fulfilled/Rejected)
- 🏥 **Monitor system health** and activity
- 📈 **Analytics dashboard** (coming soon)

</td>
</tr>
</table>

#### 🔐 Role-Based Access Control
Separate interfaces and permissions for users and administrators

</td>
</tr>
</table>

<div align="center">

**⚡ Real-time Updates** • **🔔 Status Tracking** • **📊 Admin Dashboard**

</div>

---

## 🚀 Core Features

### For Regular Users
- ✅ User registration and authentication
- ✅ Profile management with personal information
- ✅ Submit blood donation requests for patients
- ✅ Schedule donation appointments
- ✅ View personal request history and status
- ✅ Browse available donors by blood group

### For Administrators
- ✅ Complete donor database management (CRUD operations)
- ✅ View and manage all blood requests system-wide
- ✅ Oversee all appointments across the platform
- ✅ Update request statuses (Pending, Approved, Fulfilled, Rejected)
- ✅ Monitor system health and activity

---

## 🏗️ Architecture & Design Patterns

### **Microservices Architecture**
The system follows a **microservices** approach, decomposing the application into four independent, loosely-coupled services:

```
┌─────────────────────────────────────────────────────┐
│                   Client (React)                    │
│              Port 5173 / 80 (nginx)                 │
└─────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌────▼────┐      ┌────▼────┐     ┌────▼────┐
    │  Auth   │      │  Donor  │     │ Request │
    │ Service │      │ Service │     │ Service │
    │ :4000   │      │ :3000   │     │ :3002   │
    └────┬────┘      └────┬────┘     └────┬────┘
         │                │                │
         └────────────────┼────────────────┘
                          │
                     ┌────▼────┐
                     │Appointm.│
                     │ Service │
                     │ :3010   │
                     └────┬────┘
                          │
                  ┌───────▼────────┐
                  │   PostgreSQL   │
                  │   Database     │
                  │   :5432        │
                  └────────────────┘
```

### **Design Patterns Implemented**

#### 1. **Separation of Concerns (SoC)**
Each microservice handles a specific business domain:
<div align="center">

### **Frontend Technologies**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### **Backend Technologies**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### **DevOps & Cloud**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

</div>

<details>
<summary><b>📦 View Detailed Stack Information</b></summary>

### **Frontend**
| Technology | Purpose | Version |
|-----------|---------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) **React** | UI library for building component-based interface | ^18.2.0 |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) **Vite** | Fast build tool and dev server | ^5.0.0 |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) **JavaScript (ES6+)** | Primary programming language | Latest |
| ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) **CSS3** | Styling with flexbox/grid layouts | Latest |
🔐 
### **Backend Services**
| Technology | Purpose |
|-----------|---------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) **Node.js** | JavaScript runtime environment |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) **Express.js** | Web framework for REST APIs |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white) **PostgreSQL** | Relational database (v15) |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white) **JWT** | Secure authentication tokens |
| 🔐 **bcryptjs** | Password hashing |
| 🌐 **CORS** | Cross-origin resource sharing |

### **DevOps & Deployment**
| Technology | Purpose |
|-----------|---------|
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) **Docker** | Containerization platform |
| ![Kubernetes](https://img.shields.io/badge/-Kubernetes-326CE5?logo=kubernetes&logoColor=white) **Kubernetes** | Container orchestration at scale |
| ![Nginx](https://img.shields.io/badge/-Nginx-009639?logo=nginx&logoColor=white) **Nginx** | Reverse proxy and static serving |
| ![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) **Vercel** | Frontend hosting platform |

</details>
- Monitoring and alerting systems
- Database connectivity verification

#### 7. **Environment-Based Configuration**
12-Factor App methodology with environment variables for:
- Database connection strings
- JWT secrets
- Port assignments
- Feature flags (SKIP_AUTH for development)

---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library for building component-based interface | ^18.2.0 |
| **Vite** | Fast build tool and dev server | ^5.0.0 |
| **JavaScript (ES6+)** | Primary programming language | - |
| **CSS3** | Styling with flexbox/grid layouts | - |

### **Backend Services**
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for REST APIs |
| **PostgreSQL** | Relational database (v15) |
| **JWT (jsonwebtoken)** | Secure authentication tokens |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing |
| **pg** | PostgreSQL client for Node.js |
| **dotenv** | Environment variable management |
🩸 
### **DevOps & Deployment**
| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization platform |
| **Docker Compose** | Multi-container orchestration |
| **Kubernetes (K8s)** | Container orchestration at scale |
| **Nginx** | Reverse proxy and static file serving |
| **GitHub Actions** (potential) | CI/CD pipelines |

### **Cloud Deployment**
- **Vercel**: Optimized for the React frontend
- **Docker Hub**: Container image registry
- **Managed Kubernetes**: GKE, EKS, AKS compatibility

---

## 🧩 System Components

### **1. Authentication Service (Port 4000)**
**Responsibilities:**
- User registration with password hashing (bcrypt)
- Login with JWT token generation
- Token verification middleware
- User role management (user/admin)
- Database: `users` table

**Key Endpoints:**
- `POST /auth/register` - Create new user account
- `POST /📋 auth/login` - Authenticate and receive JWT
- `GET /health` - Service health check

**Security Features:**
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire after defined period
- Role validation on token generation
- SQL injection prevention via parameterized queries

---

### **2. Donor Service (Port 3000)**
**Responsibilities:**
- Donor registration and profile management
- Blood group categorization (A+, A-, B+, B-, O+, O-, AB+, AB-)
- Location-based donor tracking
- Contact information management
- Database: `donors` table

**Key Endpoints:**
- `POST /donors` - Register new donor
- `GET /donors` - List all donors
- `GET /donors/:id` - Get specific donor
- `PUT /donors/:id` - Update donor information
- `DELETE /donors/:id` - Remove donor (admin only)

**Data Model:**
```javascript
{
  id: SERIAL,
  name: VARCHAR(100),
  bloodgroup: VARCHAR(10),
  location: VARCHAR(200),
  phone: VARCHAR(50),
  created_at: TIMESTAMP
}
```

---

### **3. Request Service (Port 3002)**
**Responsibilities:**
- Blood donation request submission
- Request status lifecycle (Pending → Approved → Fulfilled)
- Hospita📅 l and patient information management
- Urgency level tracking
- Authorization-based request viewing
- Database: `requests` table

**Key Endpoints:**
- `POST /request` - Create blood request (authenticated)
- `GET /request` - List requests (own or all if admin)
- `GET /request/:id` - Get specific request
- `PUT /request/:id` - Update request details
- `DELETE /request/:id` - Cancel request

**Request States:**
- **Pending**: Initial state, awaiting review
- **Approved**: Approved by admin, seeking donors
- **Fulfilled**: Blood requirement met
- **Rejected**: Request denied

**Authorization Logic:**
- Regular users see only their own requests
- Admins view all requests system-wide
- JWT token required for all operations

---
🎨 
### **4. Appointment Service (Port 3010)**
**Responsibilities:**
- Appointment scheduling between donors and recipients
- Date/time coordination
- Location management for donation
- Appointment status tracking
- Database: `appointments` table

**Key Endpoints:**
- `POST /appointments` - Create new appointment
- `GET /appointments` - List appointments (filtered by role)
- `GET /appointments/:id` - Get appointment details
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Cancel appointment

**Appointment Workflow:**
1. User creates appointment with donor details
2. Status set to "pending"
3. Admin reviews and confirms
4. Status updates to "confirmed"
5. Post-donation status becomes "completed"

---

### **5. Client Application (React)**
**Architecture:**
- **Single Page Application (SPA)** with client-side routing
- Component-based UI architecture
- Local storage for user session persistence
- Responsive design for mobile/desktop

**Key Components:**
- `Navbar` - Navigation with role-based menu items
- `Login/Register` - Authentication forms
- `Profile` - User information display
- `Use📋 Prerequisites**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js->=16.x-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL->=15-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Latest-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Optional-326CE5?style=flat-square&logo=kubernetes&logoColor=white)

</div>

**Required:**
- 📦 Node.js >= 16.x
- 🐘 PostgreSQL >= 15
- 🐳 Docker & Docker Compose (for containerized setup)

**Optional:**
- ☸️ Kubernetes cluster (pointment oversight

**State Management:**
- React hooks (`useState`, `useEffect`)
- localStorage for persistence
- User object: `{ id, email, role, token }`

**API Integration:**
```javascript
// Centralized API configuration
const API_BASE = 'http://localhost';
const AUTH_API = `${API_BASE}:4000/auth`;
const DONOR_API = `${API_BASE}:3000/donors`;
const REQUEST_API = `${API_BASE}:3002/request`;
const APPOINTMENT_API = `${API_BASE}:3010/appointments`;
```
💻 Option 1: Manual Setup**

1. **📥 
## 🚀 Getting Started

### **Prerequisites**
- Node.js >= 16.x
- PostgreSQL >= 15
- Doc🐘 ker & Docker Compose (for containerized setup)
- Kubernetes cluster (optional, for K8s deployment)

### **Local Development Setup**

#### **Option 1: Manual Setup**

1. **Clone the repository**
```po⚙️ wershell
git clone <repository-url>
cd Blood-donation-system
```

2. **Setup PostgreSQL Database**
```powershell
# Create database
psql -U postgres
CREATE DATABASE perndb;
\q
```

3. **Configure Environment Variables**
Create `.env` files in each service directory:

```env
# server/auth-service/.env
PORT=4000
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=postgres://postgres:password@localhost:5432/perndb

# server/donor/.env
PORT=3000
DATAB🚀 ASE_URL=postgres://postgres:password@localhost:5432/perndb

# server/request-service/.env
PORT=3002
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=postgres://postgres:password@localhost:5432/perndb

# server/appointment-service/.env
PORT=3010
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=postgres://postgres:password@localhost:5432/perndb
```

4. **Install Dependencies & Start Services**

**Terminal 1 - Auth Service:**
```powershell
cd server/auth-service
npm install
npm start
# Optional: Seed admin user
npm run seed:admin
```

**Terminal 2 - Donor Service:**
```powershell
cd server/donor
npm install
npm start
```

**Terminal 3 - Request Service:**
```powershell
cd server/request-service
npm install
npm start
```

**Terminal 4 - Appointment Service:**
```po🌐 Access the Application**

| Service | URL | Icon |
|---------|-----|------|
| 🎨 **Frontend** | http://localhost:5173 | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat-square) |
| 🔐 **Auth API** | http://localhost:4000 | ![Auth](https://img.shields.io/badge/-Auth-4CAF50?style=flat-square) |
| 🩸 **Donor API** | http://localhost:3000 | ![Donor](https://img.shields.io/badge/-Donor-F44336?style=flat-square) |
| 📋 **Request API** | http://localhost:3002 | ![Request](https://img.shields.io/badge/-Request-2196F3?style=flat-square) |
| 📅 **Appointment API** | http://localhost:3010 | ![Appointment](https://img.shields.io/badge/-Appointment-FF9800?style=flat-square) |
**Termi🐳 Option 2: Docker Compose (Recommended)**

> ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white&style=flat-square) **One-command setup with Docker**

1. **🏗️ ient
npm install
npm run dev
```
📊 
5. **Access the Application**
- Frontend: http://localhost:5173
- Auth API: http://localhost:4000
- Donor API: http://localhost:3000
- Request API: http://localhost:3002
- Appointment API: http://localhost:3010
🌐 Access Application**
- 🎨 Frontend: http://localhost:5173
- 🔌 All APIs accessible at their respective ports

4. **⏹️ 
1. **Build and Start All Services**
```powershell
docker compose build
docker compose up -d
```

2.✨ Docker Compose Benefits:**
- ✅ Automatic database initialization
- 🔗 Service dependency management
- 💚 Healthcheck-based startup sequencing
- 🔒 Isolated network environment
- 💾``

3. **Access Application**
- Frontend: http://localhost:5173
- All APIs accessible at their respective ports

<div align="center">

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

### **1. 🐳 Docker Deployment**

**🏗️ cker compose down
# 📤 With data cleanup
docker compose down -v
```

**Docker Compose Benefits:**
- Automatic database initialization
- Service dependency management
- Healthcheck-based startup sequencing
- Isolated network environment
- Volume persistence for PostgreSQL data

---
☸️ Kubernetes Deployment**

**📋 
### **1. Docker Deployment**

**Build Images:**
```powershell
do🚀 Deployment Steps:**

1. **🔐 r build -t yourusername/blood-request:latest ./server/request-service
docker build -t yourusername/blood-appointment:latest ./server/appointment-service
docker build -t yourusername/blood-client:latest ./client
```

**Push to Registry:**
```powershell
docker login
docker push yourusername/blood-auth:latest
docker push yourusername/blood-donor:latest
docke🐘 r push yourusername/blood-request:latest
docker push yourusername/blood-appointment:latest
docker push yourusername/blood-client:latest
```

---🚀 

### **2. Kubernetes Deployment**

**Prerequisites:**
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl configured
- NGINX Ingress Controller installed

**Deployment Steps:**
🌐 
1. **Create Namespace & Secrets**
```bash
kubectl apply -f k8s/namespace.yaml

# Create JWT secret
kubectl create secret generic app-secrets \
  --namespace blood-donation \
  --f✅ rom-literal=JWT_SECRET="your_production_jwt_secret"
```

2. **Deploy Database**
```bash
kubectl apply -f k8s/postgres-statefulset.yaml
```
✨ Kubernetes Features:**
- 💾 StatefulSet for PostgreSQL with persistent volumes
- 🔍 Service discovery via DNS
- ⚙️ ConfigMap for shared configuration
- 🔐 Secrets management for sensitive data
- 🌐 Ingress routing with path-based forwarding
- 📈 Auto-scaling capabilities (HPA)
- 🔄ubectl apply -f k8s/appointment-deployment.yaml
kubectl apply -f k8s/client-deployment.yaml
```

4. **Setu▲ Vercel Deployment (Frontend)**

> ![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white&style=flat-square) **Optimized for serverless deployment
```bash
kubectl apply -f k8s/ingress.yaml

# For local testing (minikube)
echo "$(minikube ip) blood.local" | sudo tee -a /etc/hosts
```

5. **Verify Deployment**
```bash
kubectl get pods -n blood-donation
ku🚀 Deploy Steps:**
1. 📦 Install Vercel CLI: `npm i -g vercel`
2. 📂 Navigate to client directory: `cd client`
3. 🚀 Deploy: `vercel --prod`
4. ⚙️Kubernetes Features:**
- StatefulSet for PostgreSQL with persistent volumes
- Service discovery via DNS
- ConfigMap for shared configuration
- Secrets management for sensitive data
- Ingress routing with path-based forwarding
- Auto-scaling capabilities (HPA)
- Rolling updates with zero downtime

---

### **3. Vercel Deployment (Frontend)**

The client is pre-configured for Vercel with SPA routing:

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Deploy Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to client directory: `cd client`
3. Deploy: `vercel --prod`
4. Update API endpoints in `src/api.js` to production URLs

---

## 📡 API Documentation

### **Authentication Flow**

```
Client → Auth Service: POST /auth/register
Auth Service → Database: Hash password & save user
Database → Auth Service: User created
Auth Service → Client: Success message

Client → Auth Service: POST /auth/login
Auth Service → Database: Verify credentials
Database → Auth Service: User found
Auth Service → Auth Service: Generate JWT
Auth Service → Client: { token, user: { id, email, role } }

Client → Request Service: GET /request (with Bearer token)
Request Service → Request Service: Verify JWT
Request Service → Database: Fetch requests
Database → Request Service: Request data
Request Service → Client: Filtered requests
```

### **Request Headers**

All authenticated endpoints require:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### **Sample API Calls**

**Register User:**
```javascript
POST /auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
Response: {
  "message": "User registered successfully"
}
```

**Login:**
```javascript
POST /auth/login
Body: {
  "email": "john@example.com",
  "password": "securePassword123"
}
Response: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Create Blood Request:**
```javascript
POST /request
Headers: { Authorization: "Bearer <token>" }
Body: {
  "patient_name": "Jane Smith",
  "required_blood_group": "O+",
  "hospital": "City General Hospital",
  "location": "Downtown",
  "contact_number": "+1234567890",
  "urgency": "High"
}
Response: {
  "id": 5,
  "user_id": 1,
  "patient_name": "Jane Smith",
  "required_blood_group": "O+",
  "status": "Pending",
  "created_at": "2026-01-03T10:30:00Z"
}
```

---

## 🔒 Security Concepts

### **1. Password Security**
- **Hashing Algorithm**: bcrypt with 10 salt rounds
- **Never stored in plaintext**
- Resistant to rainbow table attacks
- Automatic salt generation

### **2. JWT Token Security**
```javascript
// Token Structure
{
  "id": 1,
  "email": "user@example.com",
  "role": "user",
  "iat": 1609459200,  // Issued at
  "exp": 1609545600   // Expiration
}
```

**Security Measures:**
- Tokens signed with secret key (HS256 algorithm)
- Stored in localStorage (consider httpOnly cookies for production)
- Expiration time enforced
- Role-based claims for authorization

### **3. SQL Injection Prevention**
All database queries use parameterized statements:
```javascript
// ✅ Safe - Parameterized query
pool.query('SELECT * FROM users WHERE email = $1', [email])

// ❌ Unsafe - String concatenation
pool.query(`SELECT * FROM users WHERE email = '${email}'`)
```

### **4. CORS Configuration**
```javascript
app.use(cors())  // Allow cross-origin requests from client
```

**Production Recommendation:**
```javascript
app.use(cors({
  origin: ['https://yourfrontend.com'],
  credentials: true
}))
```

### **5. Environment Variable Protection**
- Sensitive data (JWT_SECRET, DATABASE_URL) in `.env`
- `.env` files in `.gitignore`
- Kubernetes secrets for production
- Docker secrets for sensitive compose deployments

---

## 🗄️ Database Schema

### **users** (Auth Service)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **donors** (Donor Service)
```sql
CREATE TABLE donors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bloodgroup VARCHAR(10) NOT NULL,
  location VARCHAR(200),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **requests** (Request Service)
```sql
CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  patient_name VARCHAR(200) NOT NULL,
  required_blood_group VARCHAR(20) NOT NULL,
  hospital VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  contact_number VARCHAR(50),
  urgency VARCHAR(50) DEFAULT 'Normal',
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### **appointments** (Appointment Service)
```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  donor_name VARCHAR(200),
  donor_contact VARCHAR(50),
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(200),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📚 Key Concepts & Learning Outcomes

### **Software Engineering Concepts**
1. **Microservices Architecture** - Service decomposition and independence
2. **RESTful API Design** - Resource-based endpoints, HTTP verbs
3. **Authentication & Authorization** - JWT, RBAC, middleware
4. **Database Design** - Normalization, relationships, indexing
5. **Containerization** - Docker, multi-stage builds, image optimization
6. **Orchestration** - Kubernetes, service discovery, scaling
7. **CI/CD Principles** - Build pipelines, automated testing
8. **Environment Management** - Development, staging, production configs

### **Development Best Practices**
- ✅ Environment variable configuration
- ✅ Error handling and logging
- ✅ Health check endpoints
- ✅ API versioning readiness
![License](https://img.shields.io/badge/License-Open_Source-blue?style=for-the-badge)
![Educational](https://img.shields.io/badge/Purpose-Educational-green?style=for-the-badge)

This project is open source and available for educational purposes.

---

## 📧 Support

<div align="center">

**Need Help?**

[![Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com)
[![Discussions](https://img.shields.io/badge/GitHub-Discussions-blue?style=for-the-badge&logo=github)](https://github.com)

For issues, questions, or contributions, please open an issue in the repository.

</div>

---

## 🎓 Educational Value

<div align="center">

### **Perfect for Learning Enterprise Development**

</div>

<table>
<tr>
<td width="33%" align="center">

### 🏗️ **Architecture**
- Microservices Design
- RESTful APIs
- Service Communication
- Database Design

</td>
<td width="33%" align="center">

### 🔒 **Security**
- JWT Authentication
- Password Hashing
- RBAC
- SQL Injection Prevention

</td>
<td width="33%" align="center">

### 🚀 **DevOps**
- Docker Containers
- Kubernetes Orchestration
- CI/CD Pipelines
- Cloud Deployment

</td>
</tr>
</table>

<div align="center">

**📚 Learn:** Full-Stack Development • Microservices • DevOps • Cloud Computing

**🎯 Perfect For:** Portfolio Projects • Learning • Educational Purposes • Job Interviews

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/-Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

</div>

---


