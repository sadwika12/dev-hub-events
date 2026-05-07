# 🚀 DevEvent

> The central hub for developer events — hackathons, conferences, and meetups, all in one place.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

**Live Demo:** https://dev-hub-events-2026.vercel.app/

---

## 💡 Why DevEvent?

Developer events in India are currently scattered across LinkedIn, Twitter, college notice boards, and WhatsApp groups. **DevEvent** solves this by bringing them all into one discoverable, searchable, and community-driven platform.

- **For attendees** — find hackathons and conferences near you in seconds.
- **For organizers** — reach a targeted audience of thousands of developers for free.
- **For students** — never miss an opportunity to build your portfolio and network.

---

## ✨ Features

### 🛠 Core Functionality
- **Dynamic Discovery:** Browse and search all developer events globally.
- **Smart Filtering:** Filter by mode (Online / Offline / Hybrid) and technical tags.
- **Event Profiles:** Detailed event pages featuring agendas, locations, and booking links.

### 🔐 Authentication & Security
- **Secure Access:** Email and password signup/login.
- **Session Management:** JWT sessions via **NextAuth.js v5**.
- **Route Guarding:** Protected routes implemented via Next.js Middleware.

### 📅 Event Management
- **Media Support:** Create events with seamless image uploads via **Cloudinary**.
- **Owner Controls:** Edit and delete your own events through a dedicated dashboard.
- **Real-time Analytics:** Track live booking counts for every event.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Database** | MongoDB Atlas + Mongoose |
| **Auth** | NextAuth.js v5 (Credentials) |
| **Styling** | Tailwind CSS |
| **Media Storage** | Cloudinary |
| **Deployment** | Vercel (CI/CD) |
| **Language** | TypeScript |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
git clone [https://github.com/sadwika12/dev-hub-events.git](https://github.com/sadwika12/dev-hub-events.git)
cd dev-hub-events
npm install
