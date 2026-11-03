# UpRaise - Community-Driven Social Development Events Platform

[![Live Site](https://img.shields.io/badge/Live_Site-UpRaise-teal.svg?style=for-the-badge)](https://uprise-events.vercel.app)
[![Client Repository](https://img.shields.io/badge/GitHub-Client_Repo-blue.svg?style=for-the-badge)](https://github.com/uprise-platform/uprise-client)
[![Server Repository](https://img.shields.io/badge/GitHub-Server_Repo-green.svg?style=for-the-badge)](https://github.com/uprise-platform/uprise-server)

> **UpRaise** is a modern, community-driven social development event management platform where citizens can discover, create, join, and track social welfare and community service initiatives in their local neighborhoods (e.g., Winter Clothes Distribution in Mirpur 10, Blanket Distribution in Mohammadpur, Tree Plantation, Cleanliness Drives, and Free Healthcare Camps).

---

## 🌐 Live Application
- **Live Site URL:** [https://uprise-events.vercel.app](https://uprise-events.vercel.app)
- **API Server Base URL:** [https://uprise-server.onrender.com](https://uprise-server.onrender.com)

---

## 🌟 Key Features of UpRaise

* **Community-Driven Social Events:** Enables local change-makers to initiate and organize grassroots welfare programs such as winter relief drives, tree plantations, clean-up initiatives, and emergency aid campaigns.
* **Intelligent Event Discovery & Filtering:** Live dynamic feed of upcoming social events with category filters, location search, and automated exclusion of past dates (`eventDate >= today`).
* **Interactive One-Click Event Participation:** Authenticated users can join community initiatives instantly, tracking their commitments on a dedicated **Joined Events** portal sorted chronologically by event date.
* **Organizer Control & Management Suite:** Event creators can effortlessly update event details or safely remove events from a private **Manage Events** dashboard with strict creator authorization.
* **Dynamic Theme Customization (Light/Dark Mode):** Seamless full-system theme toggling with persistent user preference, complemented by accessible UI components and modern loading skeletons.
* **Enterprise Security & Real-Time Feedback:** Secured with JWT authorization, strict password validation, and interactive feedback through non-intrusive toast notifications (no default browser alerts).

---

## 🛠️ Technology Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS & Hero UI / Shadcn UI
* **Icons:** Lucide React
* **State & Data Fetching:** React Hooks, Context API / TanStack Query
* **Notifications:** Sonner / SweetAlert2 (Custom Toasts)
* **Authentication:** NextAuth / BetterAuth / Custom JWT Auth Flow
* **Deployment:** Vercel

---

## 🚀 Getting Started Locally

### Prerequisites
* Node.js (v18.17+ or v20+)
* npm, pnpm, or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/uprise-platform/uprise-client.git
cd uprise-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📄 License
This project is developed under the MIT License.

