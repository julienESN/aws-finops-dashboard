import React, { useState, useEffect } from 'react';

const DataStatusBanner = ({ lastUpdated, isRefreshing }) => {
  const [timeAgo, setTimeAgo] = useState('');
  
  // Formater la date et l'heure une seule fois (ne change pas)
  const formattedDateTime = lastUpdated 
    ? new Date(lastUpdated).toLocaleString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      })
    : '';
    
  // Effet pour mettre à jour le texte "il y a X temps" toutes les secondes
  useEffect(() => {
    if (!lastUpdated) return;
    
    // Fonction pour calculer et mettre à jour le temps écoulé
    const updateTimeAgo = () => {
      const now = new Date();
      const timeDiff = Math.floor((now - new Date(lastUpdated)) / 1000); // différence en secondes
      
      if (timeDiff < 60) {
        setTimeAgo(`il y a ${timeDiff} seconde${timeDiff > 1 ? 's' : ''}`);
      } else if (timeDiff < 3600) {
        const minutes = Math.floor(timeDiff / 60);
        setTimeAgo(`il y a ${minutes} minute${minutes > 1 ? 's' : ''}`);
      } else if (timeDiff < 86400) {
        const hours = Math.floor(timeDiff / 3600);
        setTimeAgo(`il y a ${hours} heure${hours > 1 ? 's' : ''}`);
      } else {
        const days = Math.floor(timeDiff / 86400);
        setTimeAgo(`il y a ${days} jour${days > 1 ? 's' : ''}`);
      }
    };
    
    // Calculer une première fois
    updateTimeAgo();
    
    // Puis mettre à jour toutes les secondes
    const intervalId = setInterval(updateTimeAgo, 1000);
    
    // Nettoyer l'intervalle quand le composant est démonté
    return () => clearInterval(intervalId);
  }, [lastUpdated]); // Se déclenche quand lastUpdated change
  
  if (!lastUpdated) return null;

  return (
    <div className={`mb-6 rounded-lg p-3 ${isRefreshing 
      ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50' 
      : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-2 h-2 mr-2 rounded-full ${isRefreshing 
            ? 'bg-blue-500 dark:bg-blue-400 animate-pulse' 
            : 'bg-green-500 dark:bg-green-400'}`}
          ></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {isRefreshing 
              ? 'Rafraîchissement en cours...' 
              : `Dernière mise à jour: ${formattedDateTime} (${timeAgo})`}
          </span>
        </div>
        
        {!isRefreshing && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Données synchronisées
          </div>
        )}
      </div>
    </div>
  );
};

export default DataStatusBanner;