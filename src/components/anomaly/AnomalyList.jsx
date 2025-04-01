// src/components/anomaly/AnomalyList.jsx
import React from 'react';
import AnomalyCard from './AnomalyCard';

/**
 * Component to display a filterable list of anomalies
 *
 * @param {Object} props - Component props
 * @param {Array} props.anomalies - List of filtered anomalies to display
 * @param {string} props.filter - Current filter ('all', 'resolved', 'unresolved')
 * @param {Function} props.setFilter - Function to change the filter
 * @param {string} props.impactSort - Current sort order ('asc', 'desc')
 * @param {Function} props.setImpactSort - Function to change sort order
 * @param {string|number} props.selectedAnomaly - ID of the currently selected anomaly
 * @param {Function} props.setSelectedAnomaly - Function to change selected anomaly
 * @param {Function} props.onResolve - Function to handle resolving an anomaly
 */
const AnomalyList = ({
  anomalies,
  filter,
  setFilter,
  impactSort,
  setImpactSort,
  selectedAnomaly,
  setSelectedAnomaly,
  onResolve,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
      {/* List header with filtering options */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">
          Anomalies détectées ({anomalies.length})
        </h3>

        <div className="flex items-center space-x-3 mt-3 md:mt-0">
          {/* Filter buttons */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                filter === 'all'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('all')}
            >
              Toutes
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                filter === 'unresolved'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('unresolved')}
            >
              Non résolues
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                filter === 'resolved'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('resolved')}
            >
              Résolues
            </button>
          </div>

          {/* Impact sort button */}
          <button
            className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
            onClick={() =>
              setImpactSort(impactSort === 'desc' ? 'asc' : 'desc')
            }
          >
            <span>Impact</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${
                impactSort === 'asc' ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Empty state when no anomalies match the filter */}
      {anomalies.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-300">
            Aucune anomalie{' '}
            {filter === 'resolved'
              ? 'résolue'
              : filter === 'unresolved'
              ? 'non résolue'
              : ''}{' '}
            détectée dans la période sélectionnée.
          </p>
        </div>
      ) : (
        /* List of anomaly cards */
        <div className="space-y-4 mt-4">
          {anomalies.map((anomaly) => (
            <AnomalyCard
              key={anomaly.id}
              anomaly={anomaly}
              isSelected={selectedAnomaly === anomaly.id}
              onClick={() =>
                setSelectedAnomaly(
                  selectedAnomaly === anomaly.id ? null : anomaly.id
                )
              }
              onResolve={onResolve}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnomalyList;
