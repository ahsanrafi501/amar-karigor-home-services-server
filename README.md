# 🔧 FixItNow

### Your Trusted Home Service Platform

FixItNow is a backend REST API for a home services marketplace. It connects customers with skilled technicians for services such as plumbing, electrical work, cleaning, painting, appliance repair, and more.

The platform provides secure authentication, role-based authorization, service management, technician management, booking management, and customer reviews.

---

## 🚀 Features

- 🔐 JWT Authentication & Authorization
- 👤 User Management
- 👨‍🔧 Technician Management
- 🛠️ Service Management
- 📅 Booking Management
- ⭐ Review & Rating System
- 🛡️ Role-Based Access Control
- 🔒 Password Hashing with bcrypt
- ✅ Request Validation
- ❌ Centralized Error Handling
- 🗄️ PostgreSQL Database
- 🔄 Prisma ORM
- 🌐 RESTful API

---

## 👥 User Roles

### Customer

Customers can:

- Register and login
- Browse available services
- View technician profiles
- Book services
- View and manage bookings
- Cancel bookings
- Leave reviews and ratings
- Manage their profile

### Technician

Technicians can:

- Create and manage their profile
- Manage offered services
- Manage availability
- View booking requests
- Accept or reject bookings
- Update booking status
- View customer information

### Admin

Admins can:

- Manage users
- Manage technicians
- Manage services
- Manage service categories
- Manage bookings
- Manage reviews
- Manage platform data

---

## 🧰 Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL
- Prisma ORM
- Prisma Client
- `@prisma/adapter-pg`

### Authentication & Security

- JSON Web Token (JWT)
- bcryptjs

### Utilities

- dotenv
- http-status
- Zod

---

## 🏗️ Architecture

The project follows a modular backend architecture:

```text
Client
   │
   ▼
Express Server
   │
   ▼
Routes
   │
   ▼
Middleware
   │
   ├── Authentication
   ├── Authorization
   └── Validation
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
## 🏗️ Architecture

The project follows a modular backend architecture:

```text
Client
   │
   ▼
Express Server
   │
   ▼
Routes
   │
   ▼
Middleware
   ├── Authentication
   ├── Authorization
   └── Validation
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```