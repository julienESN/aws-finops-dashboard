// src/components/finops/charts/TeamCostTable.jsx

import React from 'react';
import ChartCard from '../cards/ChartCard';
import _ from 'lodash';

/**
 * Table de répartition des coûts par équipe.
 * @param {Array} data - Tableau d'objets { name: string, value: number } pour chaque équipe.
 * @param {Array} filteredData - Le tableau complet filtré, pour calculer par ex. le "service principal" ou l'efficacité de la team.
 * @param {number} totalCost - Le coût total (pour calculer % du total).
 * @param {function} formatCurrency - Fonction utilitaire pour formater une valeur monétaire.
 * @param {function} getEfficiencyColor - Fonction pour déterminer la couleur du badge d'efficacité.
 * @param {object} SERVICE_COLORS - Objet map de couleurs par service (ex: { EC2: "#f97316", ... }).
 * @param {object} COLORS - Objet regroupant les palettes de couleurs.
 */
const TeamCostTable = ({
  data = [],
  filteredData = [],
  totalCost = 0,
  formatCurrency = (val) => val,
  getEfficiencyColor = () => '',
  SERVICE_COLORS = {},
  COLORS = {},
}) => {
  return (
    <ChartCard
      title="Coûts par équipe"
      subtitle="Répartition des coûts par équipe (top 5)"
      action={
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          Exporter
        </button>
      }
    >
      <div className="overflow-x-auto max-h-80">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 uppercase">
                Équipe
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 uppercase">
                Coût
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 uppercase">
                %
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 uppercase">
                Service principal
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 uppercase">
                Efficacité
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* On limite l'affichage aux 5 premières équipes */}
            {data.slice(0, 5).map((team) => {
              // On filtre tous les items correspondants à cette équipe
              const teamItems = filteredData.filter(
                (item) => item.team === team.name
              );

              // Service le plus coûteux pour cette équipe
              const topServiceForTeam = _.chain(teamItems)
                .groupBy('service')
                .map((items, service) => ({
                  service,
                  cost: _.sumBy(items, 'cost'),
                }))
                .orderBy(['cost'], ['desc'])
                .first()
                .value();

              // Efficacité moyenne
              const teamEfficiency = _.meanBy(teamItems, 'efficiency') || 75;

              // Pourcentage du total (coût équipe / totalCost)
              const teamPercentage =
                totalCost > 0
                  ? ((team.value / totalCost) * 100).toFixed(1) + '%'
                  : '0%';

              return (
                <tr
                  key={team.name}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-4 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {team.name || 'Inconnu'}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {formatCurrency(team.value)}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {teamPercentage}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {topServiceForTeam ? (
                      <>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${
                              SERVICE_COLORS[topServiceForTeam.service] ||
                              COLORS.gray[0]
                            }20`,
                            color:
                              SERVICE_COLORS[topServiceForTeam.service] ||
                              COLORS.gray[0],
                          }}
                        >
                          {topServiceForTeam.service}
                        </span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                          ({formatCurrency(topServiceForTeam.cost)})
                        </span>
                      </>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEfficiencyColor(
                        teamEfficiency
                      )}`}
                    >
                      {teamEfficiency.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
};

export default TeamCostTable;
