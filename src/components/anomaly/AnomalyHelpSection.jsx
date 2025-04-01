// src/components/anomaly/AnomalyHelpSection.jsx
import React from 'react';

/**
 * Component for the help/info section at the bottom of the anomaly detector
 */
const AnomalyHelpSection = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/50">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Configuration des alertes d'anomalies
          </h3>
          <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
            <p>
              Vous pouvez configurer les seuils de détection et les
              notifications pour les anomalies de coûts. Cela vous permettra
              d'être alerté automatiquement lorsqu'une dépense inhabituelle est
              détectée.
            </p>
          </div>
          <div className="mt-3">
            <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 dark:border-blue-700 text-sm leading-5 font-medium rounded-md text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-150">
              Configurer les alertes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyHelpSection;
