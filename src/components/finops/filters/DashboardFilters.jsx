import React from 'react';
import { ICONS } from '../../../utils/finops/constants';
import InfoTooltip from '../common/InfoTooltip';
import SelectWithTooltips from '../common/SelectWithTooltips';

const DashboardFilters = ({
  filters,
  setFilters,
  serviceOptions,
  regionOptions,
  teamOptions,
  environmentOptions,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 md:p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            FinOps Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyse et optimisation des coûts AWS
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Service avec tooltips */}
        <SelectWithTooltips
          label="Service"
          options={serviceOptions}
          value={filters.service}
          onChange={(e) => setFilters({ ...filters, service: e.target.value })}
          type="service"
          infoText="Les services AWS sont des composants cloud qui facilitent le développement et le déploiement d'applications."
        />

        {/* Région avec tooltips */}
        <SelectWithTooltips
          label="Région"
          options={regionOptions}
          value={filters.region}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          type="region"
          infoText="Les régions AWS sont des emplacements géographiques où AWS exploite ses centres de données."
        />

        {/* Équipe avec tooltips */}
        <SelectWithTooltips
          label="Équipe"
          options={teamOptions}
          value={filters.team}
          onChange={(e) => setFilters({ ...filters, team: e.target.value })}
          type="team"
          infoText="Les équipes qui utilisent les ressources AWS au sein de votre organisation."
        />

        {/* Environnement */}

        <SelectWithTooltips
          label="Environnement"
          options={environmentOptions}
          value={filters.environment}
          onChange={(e) =>
            setFilters({ ...filters, environment: e.target.value })
          }
          type="environment"
          infoText="Les environnements de déploiement comme Production, Développement, Test, etc."
        />
      </div>
    </div>
  );
};

export default DashboardFilters;
