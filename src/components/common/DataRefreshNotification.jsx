import React, { useState, useEffect } from 'react';

const DataRefreshNotification = ({ lastUpdated, isVisible = false }) => {
  const [visible, setVisible] = useState(isVisible);
  const [updateComplete, setUpdateComplete] = useState(false);
  
  useEffect(() => {
    if (lastUpdated) {
      setVisible(true);
      setUpdateComplete(false);
      
      // Montrer l'animation de chargement pendant 1 seconde
      const spinnerTimer = setTimeout(() => {
        setUpdateComplete(true);
      }, 1000);
      
      // Auto-hide after 3 seconds
      const hideTimer = setTimeout(() => {
        setVisible(false);
        setUpdateComplete(false);
      }, 3000);
      
      return () => {
        clearTimeout(spinnerTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [lastUpdated]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center ${
        updateComplete ? 'bg-green-600 dark:bg-green-700' : 'bg-blue-600 dark:bg-blue-700'
      } text-white transition-colors duration-300`}>
        {updateComplete ? (
          // Icône de vérification
          <svg 
            className="w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        ) : (
          // Spinner de chargement
          <svg 
            className="w-5 h-5 mr-2 animate-spin"
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <div>
          <p className="font-medium">
            {updateComplete ? 'Données synchronisées' : 'Mise à jour en cours...'}
          </p>
          <p className="text-xs text-blue-100">
            {lastUpdated ? `${lastUpdated.toLocaleTimeString()}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataRefreshNotification;