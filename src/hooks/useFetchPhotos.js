import { useState, useEffect } from 'react';

/**
 * useFetchPhotos — Custom hook to fetch photos from the Picsum API.
 *
 * Returns:
 *  - photos:  Array of photo objects from the API (empty while loading).
 *  - loading: Boolean — true while the API call is in progress.
 *  - error:   String — error message if the fetch fails, otherwise null.
 *
 * How it works:
 *  1. On component mount, useEffect triggers the fetch.
 *  2. While fetching, `loading` is true.
 *  3. On success, `photos` is set to the API response data.
 *  4. On failure, `error` is set to a user-friendly message.
 *  5. The empty dependency array [] means this runs only once (on mount).
 */
function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function inside useEffect (useEffect can't be async itself)
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch 30 photos from Picsum Photos API
        const response = await fetch('https://picsum.photos/v2/list?limit=30');

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Set a user-friendly error message
        setError('Failed to load photos. Please check your internet connection and try again.');
        console.error('Fetch error:', err);
      } finally {
        // Always stop the loading spinner, whether fetch succeeded or failed
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []); // Empty array = run only on mount

  return { photos, loading, error };
}

export default useFetchPhotos;

