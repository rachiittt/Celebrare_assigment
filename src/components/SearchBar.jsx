import React from 'react';

/**
 * SearchBar Component
 *
 * Props:
 * - value: Current text input string
 * - onChange: Callback fired on each keystroke
 *
 * Wrapped in React.memo so that it only re-renders if `value` or `onChange` changes.
 * Because `onChange` is wrapped in `useCallback` in Gallery.jsx, SearchBar won't
 * re-render when other state changes (such as toggling favourites).
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search photos by author name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   text-gray-900 placeholder-gray-400 transition"
      />
    </div>
  );
}

export default React.memo(SearchBar);
