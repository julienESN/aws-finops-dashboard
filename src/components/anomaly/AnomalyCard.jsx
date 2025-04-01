// src/components/anomaly/AnomalyCard.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  formatDate,
  formatDateTime,
  formatCurrency,
} from '../../utils/anomaly/formatters';

/**
 * Card component for displaying individual anomalies
 *
 * @param {Object} props - Component props
 * @param {Object} props.anomaly - Anomaly data object
 * @param {boolean} props.isSelected - Whether the anomaly card is expanded
 * @param {Function} props.onClick - Handler for clicking the card (expand/collapse)
 * @param {Function} props.onResolve - Handler for resolving the anomaly
 */
const AnomalyCard = ({ anomaly, isSelected, onClick, onResolve }) => {
  const isResolved = anomaly.status === 'Resolved';
  const statusColorClass = isResolved
    ? 'bg-green-500 dark:bg-green-400'
    : 'bg-red-500 dark:bg-red-400';
  const cardBorderClass = isSelected
    ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900'
    : 'border-gray-200 dark:border-gray-700';
  const cardBgClass = isResolved
    ? 'bg-green-50 dark:bg-green-900/20'
    : 'bg-red-50 dark:bg-red-900/20';

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${cardBorderClass} hover:shadow-md`}
    >
      {/* Header - always visible */}
      <div className={`p-4 cursor-pointer ${cardBgClass}`} onClick={onClick}>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColorClass}`}
              ></span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate(anomaly.date)}
              </span>
            </div>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
              Impact:{' '}
              <span className="font-medium text-red-600 dark:text-red-400">
                {formatCurrency(anomaly.impact)}
              </span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                (+{anomaly.percentageIncrease}% du coût normal)
              </span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Détecté: {formatDateTime(anomaly.detectedAt)}
            </div>
            <div className="text-xs mt-1">
              {/* Display first two root causes */}
              {anomaly.rootCauses.slice(0, 2).map((cause, index) => (
                <span
                  key={index}
                  className="inline-flex items-center mr-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {cause.name}
                </span>
              ))}
              {/* Show count of additional causes if more than 2 */}
              {anomaly.rootCauses.length > 2 && (
                <span className="text-gray-500 dark:text-gray-400">
                  +{anomaly.rootCauses.length - 2} autres
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details - visible only when selected/expanded */}
      {isSelected && (
        <div className="p-5 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {/* Cost comparison section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Coût actuel
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(anomaly.actualCost)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Coût attendu
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(anomaly.expectedCost)}
              </div>
            </div>
          </div>

          {/* Visual impact chart */}
          <div className="mb-4 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Impact visuel
            </h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: 'Coût attendu',
                      value: anomaly.expectedCost,
                      fill: '#94a3b8',
                    },
                    {
                      name: 'Coût réel',
                      value: anomaly.actualCost,
                      fill: '#ef4444',
                    },
                  ]}
                  layout="vertical"
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 'dataMax']} hide />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    cursor={false}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {[
                      {
                        name: 'Coût attendu',
                        value: anomaly.expectedCost,
                        fill: '#94a3b8',
                      },
                      {
                        name: 'Coût réel',
                        value: anomaly.actualCost,
                        fill: '#ef4444',
                      },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Root causes */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
              Causes racines identifiées
            </h4>
            <div className="space-y-3">
              {anomaly.rootCauses.map((cause, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {cause.name}
                    </span>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      Impact: {cause.impact}%
                    </span>
                  </div>
                  <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                    {cause.reason}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-2 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600">
                    {cause.details.map((detail, i) => (
                      <div key={i} className="flex">
                        <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-1.5 mr-2"></span>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affected accounts */}
          {anomaly.affectedAccounts.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Comptes affectés
              </h4>
              <div className="flex flex-wrap gap-2">
                {anomaly.affectedAccounts.map((account, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-lg"
                  >
                    {account}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resolution button */}
          <div className="flex justify-end mt-4">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isResolved
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
              }`}
              disabled={isResolved}
              onClick={() => !isResolved && onResolve(anomaly.id)}
            >
              {isResolved ? 'Résolu' : 'Marquer comme résolu'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnomalyCard;
