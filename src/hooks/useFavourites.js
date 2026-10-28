import { useReducer, useEffect } from 'react';

/**
 * Helper function to safely read saved favourites from localStorage.
 * Using this in useReducer's lazy initializer prevents overwriting
 * localStorage on the initial render.
 */
const getInitialFavourites = () => {
  try {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error);
    return [];
  }
};

/**
 * Reducer function for managing favourites state.
 * It is a pure function: (currentState, action) => newState
 */
function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photoId = action.payload;
      // If photo is already in favourites, remove it; otherwise, add it
      if (state.includes(photoId)) {
        return state.filter((id) => id !== photoId);
      } else {
        return [...state, photoId];
      }
    }
    default:
      return state;
  }
}

/**
 * useFavourites — Custom hook to manage favourited photos using useReducer.
 * Persists the favourites array of IDs into localStorage across refreshes.
 */
export default function useFavourites() {
  // useReducer with lazy initialization (3rd argument) loads localStorage once on mount
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites
  );

  // Sync to localStorage whenever favourites state changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Action dispatcher helper to toggle favourite status
  const toggleFavourite = (photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  };

  return { favourites, toggleFavourite };
}
