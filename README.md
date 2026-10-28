# Photo Gallery — Celebrare Frontend Intern Pre-Screening Assignment

A clean, responsive Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS**.

## ✨ Features & Requirements
- **Project Setup**: React + Vite + Tailwind CSS without external UI component libraries.
- **Data Fetching**: Fetches 30 photos from Picsum API (`https://picsum.photos/v2/list?limit=30`) on load.
- **Loading & Error States**: Displays an animated loading spinner while fetching and user-friendly error banners if the API fails.
- **Responsive Grid**: 4 columns on desktop (`lg:grid-cols-4`), 2 columns on tablet (`md:grid-cols-2`), and 1 column on mobile (`grid-cols-1`).
- **Real-Time Search Filter**: Search photos by author name in real-time with zero page reloads or redundant API calls.
- **Favourites with `useReducer`**: Heart icon toggles favourite status, state handled using `useReducer`, persisted across reloads with `localStorage`.
- **Custom Hook `useFetchPhotos`**: Isolates API logic and returns `{ photos, loading, error }`.
- **Performance Optimizations**:
  - `useCallback` on search filter handler.
  - `useMemo` on filtered photo computations.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

## 📁 Project Architecture
```
photo-gallery/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx       # Main gallery component (uses custom hooks, memo & callback)
│   │   ├── PhotoCard.jsx     # Individual card with photo, author, and heart button
│   │   └── SearchBar.jsx     # Controlled search input wrapped in React.memo
│   ├── hooks/
│   │   ├── useFavourites.js  # useReducer logic & localStorage synchronization
│   │   └── useFetchPhotos.js # Custom hook for Picsum Photos API
│   ├── App.jsx               # App layout & navbar
│   ├── index.css             # Tailwind CSS imports
│   └── main.jsx              # React DOM entry point
├── VIDEO_SCRIPT.md           # Step-by-step 5-minute video presentation guide
└── package.json
```
