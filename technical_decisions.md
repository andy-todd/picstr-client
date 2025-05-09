# ⚙️ Picstr Frontend – Technical Decisions

## 🧠 Design Philosophy
- **Pages** define layout, set context
- **Contexts** load and manage state
- **Services** talk to backend APIs
- **Components** are stateless and reusable
- **Modals** mounted via `ModalManager` (using `ModalContext`)
- **Lightbox** uses controlled props and overlays, not uncontrolled portals

## 🔄 State Management
- Use `useContext` and `useReducer` for shared logic
- Avoid Redux
- Do not persist user data in localStorage (use httpOnly cookies)

## 📦 Folder Structure
- `components/`: Stateless building blocks
- `pages/`: Each route's main view
- `modals/`: All modal contents (triggered via ModalManager)
- `contexts/`: Business logic + shared state
- `services/`: API functions (axios-based)
- `constants/`: Enums, modal keys, error messages

## 🧪 Testing Strategy
- Manual testing via browser (Chrome, Edge, iOS)
- Future: Cypress for regression and smoke tests

## 🔐 Security Rules
- Tokens in httpOnly cookies only
- All API traffic over HTTPS
- Role-based access for Admin routes
- Confirm destructive actions via modal
- No user-editable email/role fields

## 📷 Gallery and Lightbox
- `PhotoAlbum` component used with `rows` layout
- `PhotoThumbnail` renders hoverable icons + checkbox
- `Lightbox` customized using `yet-another-react-lightbox` with:
  - Top-right overlays
  - Inside image controls for like/favorite
  - Fullscreen constrained viewing
  - Shared animations, consistent styling

## 🧰 Planned Enhancements
- iOS PWA support
- Dynamic collections (by tags)
- Recently used tags & collections in modals
- Server-side thumbnail generation
- User profile stats

## ⛔ Anti-Patterns Avoided
- No `fetch` in components
- No uncontrolled modal mounting
- No inline styles unless dynamic
- Avoid prop drilling (always use context)

