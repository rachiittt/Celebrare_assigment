import Gallery from './components/Gallery';

/**
 * App Component
 *
 * Root component that provides the layout header and renders
 * the main Gallery component.
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navbar / Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Photo Gallery
          </h1>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            Celebrare Pre-Screening
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;
