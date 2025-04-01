// src/components/anomaly/CostAnomalyDetector.jsx
import React from 'react';
import usePersistentData from '../../usePersistentData';
import { useAnomalyData } from '../../utils/anomaly/hooks';

// Import modular components
import AnomalyStatCards from './AnomalyStatCards';
import AnomalyCharts from './AnomalyCharts';
import AnomalyList from './AnomalyList';
import AnomalyHelpSection from './AnomalyHelpSection';

/**
 * Main component for cost anomaly detection dashboard
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Optional data to use instead of fetching with useRealTimeData
 */
const CostAnomalyDetector = ({ data }) => {
  // Either use the provided data or fetch it with the hook
  const {
    data: fetchedData,
    loading,
    error,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = data ? { data, loading: false, error: null } : usePersistentData('all');

  // Use custom hook to process the data and manage state
  const {
    filteredAnomalies,
    anomalyStats,
    anomalyIndices,
    costHistory,
    selectedAnomaly,
    setSelectedAnomaly,
    filter,
    setFilter,
    impactSort,
    setImpactSort,
    dateRange,
    setDateRange,
    handleResolveAnomaly,
  } = useAnomalyData(fetchedData);

  // Define colors for charts
  const COLORS = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // orange
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#6366f1', // indigo
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-64">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 mb-4 border-4 border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-700 dark:text-gray-300">
              Chargement des données d'anomalies...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      {/* Header with title and date range selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Détection d'anomalies de coûts
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Identifiez et analysez les dépenses inhabituelles
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <select
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 rounded-lg text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">7 derniers jours</option>
            <option value="30">30 derniers jours</option>
            <option value="90">90 derniers jours</option>
          </select>

          <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <AnomalyStatCards stats={anomalyStats} />

      {/* Charts */}
      <AnomalyCharts
        costHistory={costHistory}
        anomalyIndices={anomalyIndices}
        impactByServiceData={anomalyStats.impactByServiceData}
        colors={COLORS}
      />

      {/* Anomalies List */}
      <AnomalyList
        anomalies={filteredAnomalies}
        filter={filter}
        setFilter={setFilter}
        impactSort={impactSort}
        setImpactSort={setImpactSort}
        selectedAnomaly={selectedAnomaly}
        setSelectedAnomaly={setSelectedAnomaly}
        onResolve={handleResolveAnomaly}
      />

      {/* Help Section */}
      <AnomalyHelpSection />
    </div>
  );
};

export default CostAnomalyDetector;
