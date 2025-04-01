import React, { useState, useEffect } from 'react';
import FinOpsDashboard from './components/finops/FinOpsDashboard';
import CostAnomalyDetector from './components/anomaly/CostAnomalyDetector';
import OptimizationRecommendations from './OptimizationRecommendations';
import TopNavBar from './TopNavBar';
import usePersistentData from './usePersistentData';
// Icônes SVG pour une meilleure qualité visuelle
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const AnomalyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const OptimizationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const ForecastIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 6l-9.5 9.5-5-5L1 18" />
    <path d="M17 6h6v6" />
  </svg>
);

const BudgetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ReportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const NotificationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current_year');
  const { data, loading, error, lastUpdated } = usePersistentData(
    'all',
    selectedPeriod
  );
  // Simulation du chargement initial

  // Écouter les changements de mode sombre depuis TopNavBar
  useEffect(() => {
    const handleDarkModeChange = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setDarkMode(isDarkMode);
    };

    // Observer pour détecter les changements de classe sur html
    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  // Liste des onglets de navigation
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'anomalies', label: 'Anomalies', icon: <AnomalyIcon /> },
    { id: 'optimization', label: 'Optimisations', icon: <OptimizationIcon /> },
    { id: 'forecast', label: 'Prévisions', icon: <ForecastIcon /> },
    { id: 'budget', label: 'Budgets', icon: <BudgetIcon /> },
    { id: 'reports', label: 'Rapports', icon: <ReportIcon /> },
  ];

  // Liste des économies potentielles
  const savingsOpportunities = [
    { id: 1, amount: 5840, type: 'Instances EC2 inactives', category: 'EC2' },
    { id: 2, amount: 3250, type: 'Savings Plans', category: 'Général' },
    {
      id: 3,
      amount: 2100,
      type: 'Volumes EBS non utilisés',
      category: 'Stockage',
    },
    {
      id: 4,
      amount: 1260,
      type: 'Classe de stockage S3',
      category: 'Stockage',
    },
  ];

  const handlePeriodChange = (newPeriod) => {
    setSelectedPeriod(newPeriod);
  };

  // Calcul du total des économies
  const totalSavings = savingsOpportunities.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div
      className={`${
        darkMode ? 'dark' : ''
      } min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 w-screen`}
    >
      <TopNavBar
        onPeriodChange={handlePeriodChange}
        currentPeriod={selectedPeriod}
      />

      {/* Contenu principal avec navigation latérale */}
      <div className="flex">
        {/* Barre de navigation latérale */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 pt-16 lg:pt-0 lg:left-0 z-10 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen`}
        >
          <div className="h-full flex flex-col">
            <div className="overflow-y-auto flex-grow">
              <div className="px-4 py-5 lg:py-6">
                <ul className="space-y-1">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        className={`w-full px-3 py-2 flex items-center space-x-3 rounded-lg text-sm ${
                          activeTab === tab.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                        } transition-colors duration-150`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span
                          className={
                            activeTab === tab.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }
                        >
                          {tab.icon}
                        </span>
                        <span>{tab.label}</span>

                        {/* Badge pour les anomalies */}
                        {tab.id === 'anomalies' && (
                          <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300">
                            3
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div className="px-4 py-5 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Comptes AWS
                </h3>
                <div className="space-y-2.5">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={`account-${account.id}`}
                            name={`account-${account.id}`}
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor={`account-${account.id}`}
                            className="font-medium text-gray-700 dark:text-gray-300 flex items-center"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${account.color} mr-2`}
                            ></span>
                            {account.name}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Widget d'économies potentielles */}
            <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 p-4 text-white">
                <h3 className="font-medium text-sm mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Économies potentielles
                </h3>
                <div className="text-2xl font-bold mb-2">
                  {totalSavings.toLocaleString()} €
                </div>

                <div className="text-sm text-blue-100 mb-3">
                  {savingsOpportunities.length} opportunités identifiées
                </div>

                <button
                  className="w-full mt-1 bg-white/20 hover:bg-white/30 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors duration-150"
                  onClick={() => setActiveTab('optimization')}
                >
                  Voir les détails
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 pb-12">
          {activeTab === 'dashboard' && (
            <FinOpsDashboard
              data={data}
              loading={loading}
              error={error}
              lastUpdated={lastUpdated}
            />
          )}
          {activeTab === 'anomalies' && <CostAnomalyDetector data={data} />}
          {activeTab === 'optimization' && (
            <OptimizationRecommendations data={data} />
          )}
          {(activeTab === 'forecast' ||
            activeTab === 'budget' ||
            activeTab === 'reports') && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-200">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {activeTab === 'forecast'
                  ? 'Prévisions de coûts'
                  : activeTab === 'budget'
                  ? 'Gestion des budgets'
                  : 'Rapports personnalisés'}
              </h2>
              <div className="flex flex-col items-center justify-center p-10 text-gray-500 dark:text-gray-400">
                <div className="w-24 h-24 mb-6 text-gray-300 dark:text-gray-600">
                  {activeTab === 'forecast' ? (
                    <ForecastIcon />
                  ) : activeTab === 'budget' ? (
                    <BudgetIcon />
                  ) : (
                    <ReportIcon />
                  )}
                </div>
                <p className="text-lg mb-4">
                  Cette fonctionnalité sera bientôt disponible
                </p>
                <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-150">
                  M'avertir lorsque disponible
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Pied de page */}
      <footer className="bg-white dark:bg-gray-800 mt-auto py-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 AWS FinOps Dashboard | Données simulées à des fins de
              démonstration
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              >
                Aide
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainApp;
