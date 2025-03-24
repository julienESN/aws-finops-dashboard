// src/components/finops/charts/ServiceDistributionChart.jsx
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import ChartCard from '../cards/ChartCard';
import CustomTooltip from '../common/CustomTooltip';
import { formatCurrency } from '../../../utils/finops/formatters';

/**
 * Graphique de répartition des coûts par service AWS
 */
const ServiceDistributionChart = ({
  data,
  showAll,
  toggleShowAll,
  serviceColors,
  colors,
}) => {
  return (
    <ChartCard
      title="Répartition par service"
      subtitle="Distribution des coûts par service AWS"
      action={
        <button
          onClick={toggleShowAll}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {showAll ? 'Voir top 5' : 'Voir tous'}
        </button>
      }
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isOthers
                      ? colors.gray[0]
                      : serviceColors[entry.name] ||
                        colors.blue[index % colors.blue.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              content={
                <CustomTooltip formatter={(value) => formatCurrency(value)} />
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default ServiceDistributionChart;
