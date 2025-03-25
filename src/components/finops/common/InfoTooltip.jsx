import React, { useState } from 'react';

const InfoTooltip = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        className="text-blue-500 dark:text-blue-400 rounded-full w-4 h-4 inline-flex items-center justify-center text-xs font-bold focus:outline-none hover:bg-blue-100 dark:hover:bg-blue-900/30"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        aria-label="Plus d'informations"
      >
        i
      </button>

      {showTooltip && (
        <div className="absolute z-10 w-64 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 left-0 transform -translate-x-1/2 mt-1">
          {text}
          <div className="absolute -top-2 left-0 w-3 h-3 transform rotate-45 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
