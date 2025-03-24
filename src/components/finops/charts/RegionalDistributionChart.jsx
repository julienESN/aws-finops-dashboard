import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import CustomTooltip from '../common/CustomTooltip'; // Votre tooltip personnalisé, sinon tooltip par défaut
import { formatCurrency } from '../../../utils/finops/formatters';

const RegionalDistributionChart = ({
  data = [],
  colors = [],
  onExportClick,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200">
      {/* En-tête : titre + bouton (facultatif) */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Répartition par région
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Distribution des coûts par région AWS
          </p>
        </div>
        {onExportClick && (
          <button
            onClick={onExportClick}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Exporter
          </button>
        )}
      </div>

      {/* Zone du graphique */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              tickFormatter={(value) => `${value.toLocaleString()} €`}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip
              content={
                <CustomTooltip formatter={(val) => formatCurrency(val)} />
              }
            />
            <Legend />
            <Bar dataKey="value" name="Coût">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length] || '#3b82f6'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegionalDistributionChart;
