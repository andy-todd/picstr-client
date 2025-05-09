# Technical Design: Picstr Frontend Architecture

This document outlines the core frontend architecture principles for Picstr and acts as a reference for building all new features consistently.

---

## 🧱 Layered Structure

All features must follow this layered approach:

1. **API Layer**
   - Endpoints defined in Swagger (`swagger.yaml`)
   - `/api/photos`, `/api/collections`, `/api/tags`, etc.
   - Serve images (and thumbnails) from `/photos/:userId/:filename`

2. **Service Layer**
   - Each domain has a service file: `photoService.js`, `collectionService.js`, `tagService.js`, `likeService.js`
   - Exports clear async functions (e.g., `fetchPhotos`, `getThumbnailUrl`)
   - No `fetch` in components — always use services

3. **Context Layer**
   - `PhotoContext`, `CollectionContext`, `ModalContext`
   - Fetches data, provides shared state and handlers
   - Avoids prop drilling

4. **Component Layer**
   - Stateless, reusable components (e.g., `PhotoThumbnail`, `CollectionGrid`)
   - Page components like `GalleryPage` manage context and layout

5. **Modal Layer**
   - All modals handled by `ModalManager` using `useModalContext`
   - Use `openModal(Component, props)`; each modal receives `onClose` and all props

---

## 🔁 Feature Implementation Rules

All new features (e.g., Likes, Tags, Collections) must:
- Add/update backend API + Swagger
- Add service functions in `/services`
- Use context to manage shared state
- Trigger modals using `openModal`
- Use shared components where possible
- Follow Lightbox + Thumbnail styling rules

---

## 🔍 File Responsibilities

| File                        | Role |
|-----------------------------|------|
| `photoService.js`           | API calls for photos, generates asset URLs |
| `PhotoThumbnail.jsx`        | Thumbnail UI with hover actions |
| `Lightbox.jsx`              | Fullscreen image viewer with overlays |
| `GalleryPage.jsx`           | Layout, tab logic, sets PhotoContext |
| `GalleryPhotoAlbum.jsx`     | Renders photo grid with layout system |
| `ModalManager.jsx`          | Renders active modals |
| `ModalContext.jsx`          | Controls modal state across app |

---

## 🧰 Lightbox UI Standards

- `rgba(0,0,0,0.9)` backdrop, z-index 9999
- Image: `max-width: 95vw; max-height: 95vh; object-fit: contain`
- Top-right outside: `[Close]` button
- Inside top-right:
  - Gold star (if owner) → toggle favorite
  - Pink heart (if viewer) → like with heart-fly animation
- Click anywhere outside closes lightbox
- No zoom; pan limited to image bounds

---

## ✅ Summary

This architecture ensures:

- 🔁 Consistent behavior across features
- 🧩 Reusable logic and components
- 🛠️ Easier debugging and scaling
