# 🚀 DevEvent

> The central hub for developer events — hackathons, conferences, and meetups, all in one place.


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

### 📅 Booking Management
- Book events with email
- Live booking count
- Duplicate booking prevention

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

### Installation

```bash
git clone [https://github.com/sadwika12/dev-hub-events.git]
cd dev-hub-events
npm install

---

### 1. Environment Setup

Create a file named `.env.local` in the root directory of your project and add the following variables:

MONGODB_URI=mongodb+srv://your_uri
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
base_url=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Start the development server

npm run dev```
