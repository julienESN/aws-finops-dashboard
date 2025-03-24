// src/components/finops/filters/DashboardFilters.jsx
import React from 'react';
import { ICONS } from '../../../utils/finops/constants';

/**
 * Composant des filtres du dashboard FinOps
 *
 * @param {object} props - Propriétés du composant
 * @param {object} props.filters - État actuel des filtres
 * @param {function} props.setFilters - Fonction pour mettre à jour les filtres
 * @param {string[]} props.serviceOptions - Liste des services disponibles
 * @param {string[]} props.regionOptions - Liste des régions disponibles
 * @param {string[]} props.teamOptions - Liste des équipes disponibles
 * @param {string[]} props.environmentOptions - Liste des environnements disponibles
 */
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
            AWS FinOps Dashboard (Temps Réel)
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyse et optimisation des coûts AWS
          </p>
        </div>

        {/* Sélecteur de période */}
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-150">
            {ICONS.calendar}
            <span>Période: {filters.timeRange} derniers mois</span>
            {ICONS.chevronDown}
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service
          </label>
          <select
            className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            value={filters.service}
            onChange={(e) =>
              setFilters({ ...filters, service: e.target.value })
            }
          >
            <option value="all">Tous les services</option>
            {serviceOptions.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        {/* Région */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Région
          </label>
          <select
            className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            value={filters.region}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          >
            <option value="all">Toutes les régions</option>
            {regionOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Équipe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Équipe
          </label>
          <select
            className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            value={filters.team}
            onChange={(e) => setFilters({ ...filters, team: e.target.value })}
          >
            <option value="all">Toutes les équipes</option>
            {teamOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Environnement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Environnement
          </label>
          <select
            className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            value={filters.environment}
            onChange={(e) =>
              setFilters({ ...filters, environment: e.target.value })
            }
          >
            <option value="all">Tous les environnements</option>
            {environmentOptions.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;
