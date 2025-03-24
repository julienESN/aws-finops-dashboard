// src/components/finops/cards/KPICard.jsx
import React from 'react';
import ChartCard from './ChartCard';
import { formatTrendIndicator } from '../../../utils/finops/formatters';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  Cell,
} from 'recharts';
import CustomTooltip from '../common/CustomTooltip';

/**
 * Carte de KPI avec titre, valeur principale, variation et graphique d'efficacité
 */
const KPICard = ({
  title,
  value,
  change,
  secondaryValue,
  icon,
  color,
  efficiencyData,
  SERVICE_COLORS,
  COLORS,
}) => {
  // Pour les coûts, une baisse est positive
  const {
    arrow,
    cssClass,
    value: changeValue,
  } = formatTrendIndicator(change, true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      {/* -- En-tête (titre, valeur, icône) -- */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {value}
          </p>

          {/* Variation (▲ / ▼) */}
          {change !== undefined && (
            <p className={`mt-2 text-sm ${cssClass} flex items-center`}>
              <span className="mr-1">{arrow}</span>
              <span>{changeValue}%</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400 font-normal">
                depuis le début de la période
              </span>
            </p>
          )}

          {/* Valeur secondaire */}
          {secondaryValue && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {secondaryValue}
            </p>
          )}
        </div>

        {/* Icône */}
        {icon && <div className={`p-3 rounded-lg ${color}`}>{icon}</div>}
      </div>

      {/* -- Graphique d'efficacité -- */}
      {efficiencyData && efficiencyData.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <ChartCard title="Efficacité par service" subtitle="Score moyen %">
            <div className="h-60 md:h-64 w-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="15%"
                  outerRadius="80%"
                  data={efficiencyData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    background
                    clockWise
                    dataKey="efficiency"
                    label={{ fill: '#666', position: 'insideStart' }}
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          SERVICE_COLORS[entry.name] ||
                          COLORS.blue[index % COLORS.blue.length]
                        }
                      />
                    ))}
                  </RadialBar>
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={{ right: 0, top: 0, bottom: 0 }}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        formatter={(val) => `${val.toFixed(1)}%`}
                      />
                    }
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      )}
    </div>
  );
};

export default KPICard;
