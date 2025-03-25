import React, { useState, useEffect, useRef } from 'react';

const TopNavBar = ({onPeriodChange, currentPeriod}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const darkModeRef = useRef(null);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let i = 0; i < 6; i++) {
      years.push(currentYear - i);
    }
    
    return years;
  };


  // Gestionnaire pour le mode sombre
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    // Appliquer le mode sombre au document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Enregistrer la préférence dans localStorage
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
  };

  // Initialiser le mode sombre depuis localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Gestionnaire pour les notifications
  const toggleNotifications = (e) => {
    e.stopPropagation(); // Empêcher la propagation
    setNotificationsOpen(!notificationsOpen);
    setSettingsOpen(false); // Fermer l'autre menu
  };

  // Gestionnaire pour les paramètres
  const toggleSettings = (e) => {
    e.stopPropagation(); // Empêcher la propagation
    setSettingsOpen(!settingsOpen);
    setNotificationsOpen(false); // Fermer l'autre menu
  };

  // Fermer les menus en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fermer le menu notifications
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }

      // Fermer le menu paramètres
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    // Ajouter l'écouteur d'événement
    document.addEventListener('mousedown', handleClickOutside);

    // Nettoyer l'écouteur d'événement
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Marquer une notification comme lue
  const markNotificationAsRead = (id) => {
    setNotificationCount(Math.max(0, notificationCount - 1));
    // Ici, vous pourriez implémenter la logique pour marquer une notification spécifique
  };

  const handlePeriodChange = (e) => {
    if(onPeriodChange) {
      onPeriodChange(e.target.value)
    }
  }

  // Notifications simulées
  const notifications = [
    {
      id: 1,
      title: 'Anomalie détectée',
      message: 'Coût EC2 +45% par rapport à la moyenne',
      time: 'Il y a 10 minutes',
    },
    {
      id: 2,
      title: 'Budget dépassé',
      message: 'Budget S3 dépassé de 15%',
      time: 'Il y a 2 heures',
    },
    {
      id: 3,
      title: 'Nouvelle recommandation',
      message: '3 nouvelles optimisations disponibles',
      time: 'Il y a 1 jour',
    },
  ];

  // Options de paramètres
  const settingsOptions = [
    { id: 'profile', label: 'Mon profil' },
    { id: 'preferences', label: 'Préférences' },
    { id: 'accounts', label: 'Gestion des comptes' },
    { id: 'alerts', label: 'Configuration des alertes' },
    { id: 'logout', label: 'Déconnexion' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et sélecteur de période à gauche */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-blue-600 dark:text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-bold ml-2 text-gray-900 dark:text-white">
                AWS FinOps Hub
              </span>
            </div>
          </div>

          {/* Sélecteur de période au centre */}
          <div className="hidden md:flex items-center">
            <select 
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPeriod}
              onChange={handlePeriodChange}
            >
              <option value="current_year">Cette année</option>
              {generateYearOptions().map(year => (
                <option key={year} value={`year_${year}`}>{year}</option>
              ))}
              <option value="last_12_months">12 derniers mois</option>
              <option value="last_6_months">6 derniers mois</option>
              <option value="last_30_days">30 derniers jours</option>
              <option value="custom">Personnalisé</option>
            </select>
          </div>

          {/* Boutons à droite */}
          <div className="flex items-center space-x-2">
            {/* Bouton mode sombre */}
            <button
              ref={darkModeRef}
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
            >
              {darkMode ? (
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Bouton notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotifications}
                aria-label="Notifications"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Menu déroulant des notifications */}
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationAsRead(notification.id);
                        }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {notification.message}
                            </p>
                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Voir toutes les notifications
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton paramètres */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={toggleSettings}
                aria-label="Settings"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* Menu déroulant des paramètres */}
              {settingsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    {settingsOptions.map((option) => (
                      <a
                        key={option.id}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSettingsOpen(false);
                        }}
                      >
                        {option.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
