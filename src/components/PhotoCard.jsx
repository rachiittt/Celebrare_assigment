/**
 * PhotoCard Component
 *
 * Props:
 * - photo: Photo object containing id, author, and download_url
 * - isFavourite: Boolean indicating if this photo is favourited
 * - onToggleFavourite: Function to toggle favourite status in useReducer
 *
 * Displays:
 * 1. Resized photo (fast loading)
 * 2. Author name
 * 3. Heart button toggling favourite status
 */
export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col border border-gray-100">
      {/* Photo Image - resized to 500x350 for fast loading */}
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/500/350`}
          alt={`Taken by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content: Author and Heart Button */}
      <div className="p-4 flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-800 truncate" title={photo.author}>
          {photo.author}
        </p>

        {/* Heart Icon Button */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="p-1.5 rounded-full hover:bg-gray-50 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-6 h-6 transition-colors duration-200 ${
              isFavourite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400 hover:text-gray-600'
            }`}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
