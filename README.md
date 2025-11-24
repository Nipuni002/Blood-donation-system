# Blood Donation System 🩸

The **Blood Donation System** is a microservice-based web application designed to streamline blood donation management for users and administrators. It provides secure user registration, login, profile management, appointment scheduling, and donor/request workflows through decoupled backend services and a modern single-page frontend.

---

## 🌐 Features

- Secure authentication with **JWT**.  
- Donor and request management via dedicated backend services.  
- Appointment scheduling microservice with migration support.  
- Modular microservices for independent scaling and updates.  
- Containerized delivery: each service runs in its own **Docker container**.  
- Ingress routing for unified access under a single host in Kubernetes.  
- Supports local Docker Compose and full Kubernetes deployment.

---

## 🏗 Architecture Overview

### Frontend
- **React** with **Vite**, served via an **Nginx container**.

### Backend
- **Node.js + Express** microservices:  
  - `Auth Service` – User registration/login  
  - `Donor Service` – Donor management  
  - `Request Service` – Blood request handling  
  - `Appointment Service` – Scheduling appointments

### Database
- **PostgreSQL** (stateful via Docker Compose or Kubernetes StatefulSet)

### Communication
- Services connect directly to PostgreSQL.  
- JWT-based authorization for secure inter-service access.

### Infrastructure
- **Local development:** Docker Compose  
- **Production-ready deployment:** Kubernetes manifests including:  
  - Namespace  
  - ConfigMap & Secret  
  - Deployments & StatefulSet  
  - Ingress routing

### CI/CD
- **GitHub Actions (`ci.yml`)**:  
  - Build frontend and service dependencies  
  - Run Docker smoke tests  
  - Optional deployment of frontend to **Vercel**

---

## 💻 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Auth | JWT |
| DevOps | Docker, Docker Compose, Kubernetes, GitHub Actions |
| Optional Hosting | Vercel (Frontend) |

---

## 🚀 Deployment

### Local (Docker Compose)
```bash
docker-compose up --build

<img width="1897" height="925" alt="Screenshot (105)" src="https://github.com/user-attachments/assets/d6f32f7f-311d-464e-bf00-258720d52ce8" />

<img width="1894" height="918" alt="Screenshot (96)" src="https://github.com/user-attachments/assets/1a0bf009-0bbf-40a1-a9ff-e671c058ccc0" />

<img width="1899" height="887" alt="Screenshot (102)" src="https://github.com/user-attachments/assets/57fd32f5-154d-4974-af7b-6c1485d8c156" />
