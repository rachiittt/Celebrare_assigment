import { useState, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import useFavourites from '../hooks/useFavourites';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';

/**
 * Gallery Component
 *
 * Requirements fulfilled here:
 * 1. Uses custom hook `useFetchPhotos` (returns photos, loading, error).
 * 2. Uses `useCallback` on the search filter handler.
 * 3. Uses `useMemo` to compute the filtered photo list.
 * 4. Responsive grid (Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col).
 */
export default function Gallery() {
  // Requirement 2 & 6: Fetch photos, loading state, and error using custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Requirement 5: Favourites managed via useReducer in custom hook
  const { favourites, toggleFavourite } = useFavourites();

  // Requirement 7: useCallback on search filter handler
  // Why? Prevents re-creating this function reference on every render,
  // avoiding unnecessary re-renders of the child SearchBar component.
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Requirement 7: useMemo to compute the filtered photo list
  // Why? Only re-filters the array when `photos` or `searchQuery` changes,
  // avoiding expensive array filtering on unrelated component re-renders.
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Input (Requirement 4) */}
      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {/* Loading State (Requirement 2) */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading photos...</p>
        </div>
      )}

      {/* Error State (Requirement 2) */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-lg text-center my-6">
          <p className="font-semibold">Error loading gallery</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Responsive Grid (Requirement 3):
          - Mobile (< 768px): 1 column (grid-cols-1)
          - Tablet (>= 768px): 2 columns (md:grid-cols-2)
          - Desktop (>= 1024px): 4 columns (lg:grid-cols-4)
      */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}

      {/* Empty State when search returns no match */}
      {!loading && !error && filteredPhotos.length === 0 && photos.length > 0 && (
        <p className="text-center text-gray-500 py-12">
          No photos found for author "{searchQuery}".
        </p>
      )}
    </div>
  );
}

