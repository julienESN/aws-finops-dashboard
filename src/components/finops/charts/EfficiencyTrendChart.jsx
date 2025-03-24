// src/components/finops/charts/EfficiencyTrendChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const EfficiencyTrendChart = ({ data }) => {
  // Ajout de console.log pour déboguer les données reçues
  console.log('EfficiencyTrendChart reçoit les données:', data);

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        Évolution du score d'efficacité
      </h4>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => {
                const [, month] = value.split('-');
                const monthNames = [
                  'Jan',
                  'Fév',
                  'Mar',
                  'Avr',
                  'Mai',
                  'Juin',
                  'Juil',
                  'Août',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Déc',
                ];
                return monthNames[parseInt(month) - 1];
              }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              domain={[50, 80]} // Élargi pour mieux voir les variations
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value) => [`${value.toFixed(1)}%`, 'Efficacité']}
              labelFormatter={(value) => {
                const [year, month] = value.split('-');
                const monthNames = [
                  'Janvier',
                  'Février',
                  'Mars',
                  'Avril',
                  'Mai',
                  'Juin',
                  'Juillet',
                  'Août',
                  'Septembre',
                  'Octobre',
                  'Novembre',
                  'Décembre',
                ];
                return `${monthNames[parseInt(month) - 1]} ${year}`;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="efficiency"
              name="Score d'efficacité"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, fill: '#10b981', stroke: '#065f46', strokeWidth: 1 }}
              activeDot={{
                r: 6,
                fill: '#34d399',
                stroke: '#065f46',
                strokeWidth: 2,
              }}
              isAnimationActive={false} // Désactiver l'animation peut aider à diagnostiquer
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EfficiencyTrendChart;
