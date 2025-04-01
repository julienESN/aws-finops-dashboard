// src/components/anomaly/AnomalyCharts.jsx
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  formatChartDate,
  formatCurrency,
} from '../../utils/anomaly/formatters';

/**
 * Component to display anomaly-related charts
 *
 * @param {Object} props - Component props
 * @param {Array} props.costHistory - Cost history data for area chart
 * @param {Array} props.anomalyIndices - Indices of anomalies in the cost history
 * @param {Array} props.impactByServiceData - Service impact data for pie chart
 * @param {Array} props.colors - Color palette for charts
 */
const AnomalyCharts = ({
  costHistory,
  anomalyIndices,
  impactByServiceData,
  colors,
}) => {
  if (!costHistory || !impactByServiceData) return null;

  // Default colors if not provided
  const CHART_COLORS = colors || [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // orange
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#6366f1', // indigo
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Cost History Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Historique des coûts - 30 derniers jours
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costHistory}>
              <defs>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={formatChartDate}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <YAxis
                tickFormatter={(value) => `${value} €`}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip
                formatter={(value) => [`${value.toFixed(2)} €`, 'Coût']}
                labelFormatter={(value) =>
                  `Date: ${new Date(value).toLocaleDateString('fr-FR')}`
                }
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                }}
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCost)"
                activeDot={(props) => {
                  const { cx, cy, index } = props;
                  const isAnomaly = anomalyIndices.includes(index);
                  return isAnomaly ? (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill="#ef4444"
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ) : (
                    <circle cx={cx} cy={cy} r={4} fill="#3b82f6" />
                  );
                }}
              />
              {anomalyIndices.map((index, i) => (
                <ReferenceLine
                  key={i}
                  x={costHistory[index].date}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact by Service Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Impact par service
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={impactByServiceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {impactByServiceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnomalyCharts;
