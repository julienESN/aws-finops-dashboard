// src/hooks/finops/useFinOpsFilters.js
import { useState, useCallback, useMemo } from 'react';
import _ from 'lodash';

/**
 * Hook personnalisé pour gérer les filtres du dashboard FinOps
 * @param {Array} data - Données brutes (non filtrées)
 * @param {Object} initialFilters - Filtres initiaux
 * @returns {Object} - Filtres, données filtrées et méthodes associées
 */
const useFinOpsFilters = (data = [], initialFilters = {}) => {
  // Valeurs par défaut des filtres
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultFilters = {
    timeRange: '12',
    service: 'all',
    region: 'all',
    team: 'all',
    environment: 'all',
    ...initialFilters,
  };

  // État local des filtres
  const [filters, setFilters] = useState(defaultFilters);

  // Définit un filtre spécifique
  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Réinitialise tous les filtres
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  // Applique les filtres aux données
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.filter((item) => {
      return (
        (filters.service === 'all' || item.service === filters.service) &&
        (filters.region === 'all' || item.region === filters.region) &&
        (filters.team === 'all' || item.team === filters.team) &&
        (filters.environment === 'all' ||
          item.environment === filters.environment)
      );
    });
  }, [data, filters]);

  // Extrait les options disponibles pour chaque filtre
  const filterOptions = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        serviceOptions: [],
        regionOptions: [],
        teamOptions: [],
        environmentOptions: [],
      };
    }

    return {
      serviceOptions: _.uniq(
        data.map((item) => item.service || '').filter(Boolean)
      ),
      regionOptions: _.uniq(
        data.map((item) => item.region || '').filter(Boolean)
      ),
      teamOptions: _.uniq(data.map((item) => item.team || '').filter(Boolean)),
      environmentOptions: _.uniq(
        data.map((item) => item.environment || '').filter(Boolean)
      ),
    };
  }, [data]);

  return {
    filters,
    setFilters,
    setFilter,
    resetFilters,
    filteredData,
    ...filterOptions,
  };
};

export default useFinOpsFilters;
