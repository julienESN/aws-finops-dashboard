import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import CustomTooltip from '../common/CustomTooltip'; // si vous avez un composant de tooltip custom
import { formatCurrency, formatDate } from '../../../utils/finops/formatters';
// ou vos fonctions de formatage

const CostTrendChart = ({ data, onDetailsClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200">
      {/* En-tête : titre + bouton */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Tendance des coûts
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Évolution des coûts sur la période
          </p>
        </div>
        <button
          onClick={onDetailsClick}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          Voir détails
        </button>
      </div>

      {/* Zone du graphique */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => formatDate(value)}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              tickFormatter={(value) => `${value.toLocaleString()} €`}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />

            <Tooltip
              content={
                <CustomTooltip
                  formatter={(val) => formatCurrency(val)}
                  labelFormatter={(val) => `Période: ${formatDate(val)}`}
                />
              }
            />
            <Legend />

            <Area
              type="monotone"
              dataKey="cost"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCost)"
              activeDot={{
                r: 6,
                stroke: '#2563eb',
                strokeWidth: 2,
                fill: '#ffffff',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostTrendChart;
