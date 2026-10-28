# 5-Minute Video Walkthrough Script (Celebrare Assignment)

Use this step-by-step script during your screen recording. It covers all 5 sections requested in the prompt.

---

## ⏱️ Section 1: Show the App Working (approx. 1 min)
1. **Open the browser** at `http://localhost:5173`.
2. **Reload the page** to demonstrate:
   - The **loading spinner** while the 30 photos are fetched from Picsum API.
   - The **responsive grid** layout (4 columns on desktop).
3. **Test the search bar**:
   - Type an author's name (e.g., `Alejandro` or `Paul`).
   - Notice that the grid updates in real-time without reloading the page or triggering new API requests.
   - Clear the search bar.
4. **Test favourites & persistence**:
   - Click the heart icon on 2 or 3 photos to mark them as favourite (heart fills red).
   - **Refresh the page (`Cmd + R` or `Ctrl + R`)**.
   - Show that the exact same photos remain marked as favourite because they are saved in `localStorage`.

---

## ⏱️ Section 2: Open `useFetchPhotos.js` (approx. 1 min)
**Action**: Switch to your code editor and open `src/hooks/useFetchPhotos.js`.

**What to say**:
> "Here is our custom hook `useFetchPhotos`. It handles all data fetching logic in isolation from the UI.
>
> 1. **What it returns**: It returns an object containing `{ photos, loading, error }`.
> 2. **How it works**: We use a `useEffect` hook with an empty dependency array `[]` so the fetch runs once when the component mounts.
> 3. **What happens if the API fails**: Inside the `try/catch/finally` block:
>    - If `response.ok` is false or the network request fails, execution jumps straight to the `catch` block.
>    - `catch` sets our user-friendly `error` state.
>    - In the `finally` block, `loading` is set to `false` regardless of success or failure, ensuring the loading spinner stops and the user is shown the error alert."

---

## ⏱️ Section 3: Open `useFavourites.js` (useReducer) (approx. 1 min)
**Action**: Open `src/hooks/useFavourites.js`.

**What to say**:
> "Here is our favourites hook where we use `useReducer` instead of `useState`.
>
> 1. **Actions handled**: Our `favouritesReducer` handles the `'TOGGLE_FAVOURITE'` action. When dispatched with a photo ID:
>    - If the ID is already in the array, it filters it out (unfavourites).
>    - If the ID is not in the array, it appends it using the spread operator `[...state, photoId]`.
> 2. **Why useReducer instead of useState?**:
>    - It cleanly separates state transition logic from component rendering.
>    - All business rules for how favourites are updated are centralized in a single pure reducer function.
>    - As our application scales or adds actions like clearing or batching favourites, `useReducer` is much more predictable, testable, and maintainable than scattered `useState` setter calls."

---

## ⏱️ Section 4: Open `Gallery.jsx` (useCallback & useMemo) (approx. 1 min)
**Action**: Open `src/components/Gallery.jsx`.

**What to say**:
> "In `Gallery.jsx`, we use both `useCallback` and `useMemo` for performance optimization:
>
> 1. **`useCallback` on `handleSearchChange`**:
>    - **Problem solved**: In React, functions declared inside a component are recreated with a new memory reference on every render. Because we pass `handleSearchChange` to our memoized `<SearchBar />`, a changing function reference would cause `<SearchBar />` to unnecessarily re-render every time another state (like favourites) changes.
>    - **What would break if removed**: Functionally the app would still work, but `<SearchBar />` would re-render on every single favourite toggle, degrading performance.
>
> 2. **`useMemo` on `filteredPhotos`**:
>    - **Problem solved**: Filtering an array of 30 items involves string operations (`toLowerCase().includes()`). `useMemo` caches the filtered list and only re-calculates when either `photos` or `searchQuery` changes.
>    - **What would break if removed**: The filtering logic would execute redundantly on every component re-render (e.g., whenever a user toggles a favourite), wasting CPU cycles."

---

## ⏱️ Section 5: One Thing That Was Difficult & Solution (approx. 1 min)
**Action**: Point to `getInitialFavourites` in `src/hooks/useFavourites.js`.

**What to say**:
> "One challenge I encountered was synchronizing `useReducer` with `localStorage` without race conditions.
>
> **The Problem**:
> Initially, if you initialize `useReducer` with an empty array `[]` and use `useEffect` to sync changes to `localStorage`, on the very first mount `useEffect` runs while state is still `[]` and overwrites existing favourites in `localStorage` before they can be read.
>
> **The Solution**:
> I solved this using `useReducer`'s third argument — the **lazy initializer function** (`getInitialFavourites`). This reads `localStorage` synchronously during the initial render before any effects run. Then, a single `useEffect` reliably saves any subsequent state changes back to `localStorage`."

