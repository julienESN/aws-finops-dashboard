// src/components/anomaly/AnomalyStatCards.jsx
import React from 'react';
import { formatCurrency } from '../../utils/anomaly/formatters';

/**
 * Component to display anomaly statistics in card format
 *
 * @param {Object} props - Component props
 * @param {Object} props.stats - Statistics object with totalImpact, resolvedCount, unresolvedCount, totalCount
 */
const AnomalyStatCards = ({ stats }) => {
  if (!stats) return null;

  const { totalImpact, resolvedCount, unresolvedCount, totalCount } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Total Impact Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800/50">
        <div className="flex items-start">
          <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Impact total
            </h3>
            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {formatCurrency(totalImpact)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Sur {totalCount} anomalies détectées
            </p>
          </div>
        </div>
      </div>

      {/* Unresolved Anomalies Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 shadow-sm border border-amber-100 dark:border-amber-800/50">
        <div className="flex items-start">
          <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-amber-600 dark:text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Anomalies non résolues
            </h3>
            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {unresolvedCount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Sur {totalCount} anomalies détectées
            </p>
          </div>
        </div>
      </div>

      {/* Resolved Anomalies Card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 shadow-sm border border-green-100 dark:border-green-800/50">
        <div className="flex items-start">
          <div className="p-3 bg-green-100 dark:bg-green-800/50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600 dark:text-green-400"
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
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Anomalies résolues
            </h3>
            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {resolvedCount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Taux de résolution:{' '}
              {totalCount > 0
                ? Math.round((resolvedCount / totalCount) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyStatCards;
