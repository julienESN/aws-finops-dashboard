// Dans RefreshButton.jsx
const RefreshButton = ({ onClick, isRefreshing, lastUpdated }) => {
  const handleClick = (e) => {
    e.preventDefault();
    // Ajout de log pour débogage
    console.log("Refresh button clicked");
    if (onClick && !isRefreshing) {
      onClick();
    }
  };

  return (
    <button
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 ${
        isRefreshing 
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300'
      }`}
      onClick={handleClick}
      disabled={isRefreshing}
      title={lastUpdated ? `Dernière mise à jour: ${lastUpdated.toLocaleString()}` : 'Rafraîchir les données'}
      aria-label="Rafraîchir les données"
    >
      <svg
        className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );
};

export default RefreshButton