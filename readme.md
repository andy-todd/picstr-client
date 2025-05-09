# 📸 Picstr Frontend

This is the React frontend for **Picstr**, a self-hosted photo manager optimized for NAS environments. It supports multi-user access, smart photo organization, tagging, and dynamic collections.

## 🌐 Live URLs
- Web UI: https://app.picstr.org
- API Server: https://api.picstr.org

## 🧱 Tech Stack
- [React](https://react.dev/) (Vite)
- [Bootstrap](https://getbootstrap.com/)
- [React Router v6](https://reactrouter.com/)
- [FontAwesome Icons](https://fontawesome.com/)
- [MongoDB backend](https://github.com/your/picstr-server)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
2. Run Locally
bash
Copy
Edit
npm run dev
3. Build for Production
bash
Copy
Edit
npm run build
🐳 Docker Build (with NGINX)
This app is typically deployed via Docker using a static build served by NGINX. See Dockerfile for details.

🧩 Project Structure
bash
Copy
Edit
src/
├── components/         # Reusable UI components
├── contexts/           # PhotoContext, CollectionContext, etc.
├── modals/             # Centralized modal components
├── pages/              # Route-level views (GalleryPage, HomePage)
├── services/           # API helpers
├── routes.js           # Route definitions
├── App.jsx             # Core layout + routing
└── main.jsx            # Vite entry point
🔐 Authentication Flow
Uses JWT in httpOnly cookies

Login via /api/auth/login

On load, app calls /api/auth/me to restore session

Role-based UI rendering (admin, viewer, owner)

📁 Related Projects
Backend Repo — Node/Express API

Picstr Docker Compose — Docker setup for Unraid + Cloudflare

pgsql
Copy
Edit

---

### ✅ `OVERVIEW.md`

```markdown
# 📸 Picstr Frontend Overview

This frontend is part of the **Picstr** self-hosted photo manager, designed to run on a personal NAS using Docker. It provides a responsive UI for browsing, organizing, and managing personal photo collections.

## 🔧 Goals
- Clean, modern photo gallery UI
- Responsive across desktop/mobile
- Clear separation of logic (context vs presentation)
- Scalable for multi-user access and collections
- Easy to maintain and extend

## 🧱 Stack
- Vite + React
- Bootstrap + FontAwesome
- React Router v6
- Custom Modal Manager + Contexts

## 🔄 Data Flow
1. Context (e.g., PhotoContext) loads data via API
2. State is shared via `useContext`
3. Dumb components render based on passed props
4. ModalManager handles all overlays consistently

## 🔐 Authentication
- Login modal is shown if no token exists
- Token is stored as httpOnly cookie
- `/api/auth/me` restores user state on reload
- Redirect to `GalleryPage` if authenticated

## 🗂️ Pages
- `/` → HomePage (unauthenticated)
- `/login` → LoginPage (redirects if logged in)
- `/gallery` → GalleryPage (tabs: Photos, My Collections, Shared)
- `/account` → AccountPage
- `/admin` → AdminPage (if `user.isAdmin`)
