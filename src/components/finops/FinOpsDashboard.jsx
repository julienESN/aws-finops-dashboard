// src/components/finops/FinOpsDashboard.jsx
import React, { useState, useMemo } from 'react';
import _ from 'lodash';

// Composants modulaires
import DashboardFilters from './filters/DashboardFilters';
import KPICard from './cards/KPICard';
import CostTrendChart from './charts/CostTrendChart';
import ServiceDistributionChart from './charts/ServiceDistributionChart';
import TeamCostTable from './charts/TeamCostTable';
import RegionalDistributionChart from './charts/RegionalDistributionChart';
import { LoadingView, ErrorView, NoDataView } from './views/StatusViews';

// Utilitaires
import {
  formatCurrency,
  getEfficiencyColor,
} from '../../utils/finops/formatters';
import {
  COLORS,
  SERVICE_COLORS,
  ICONS,
  REGION_COLORS,
} from '../../utils/finops/constants';

/**
 * Dashboard principal FinOps
 */
const FinOpsDashboard = ({ data, loading, error, lastUpdated }) => {
  // États locaux
  const [filters, setFilters] = useState({
    timeRange: '12',
    service: 'all',
    region: 'all',
    team: 'all',
    environment: 'all',
  });

  const [showAllServices, setShowAllServices] = useState(false);

  // Extraction des données de base
  const allData = useMemo(() => {
    return data && data.costs ? data.costs : [];
  }, [data]);

  // Données filtrées selon les critères sélectionnés
  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      return (
        (filters.service === 'all' || item.service === filters.service) &&
        (filters.region === 'all' || item.region === filters.region) &&
        (filters.team === 'all' || item.team === filters.team) &&
        (filters.environment === 'all' ||
          item.environment === filters.environment)
      );
    });
  }, [allData, filters]);

  // Calcul des données pour les graphiques
  const costTrendData = useMemo(() => {
    return _.chain(filteredData)
      .groupBy('date')
      .map((items, date) => ({
        date,
        cost: _.sumBy(items, 'cost'),
      }))
      .orderBy('date')
      .value();
  }, [filteredData]);

  const costByServiceData = useMemo(() => {
    return _.chain(filteredData)
      .groupBy('service')
      .map((items, service) => ({
        name: service,
        value: _.sumBy(items, 'cost'),
      }))
      .orderBy(['value'], ['desc'])
      .value();
  }, [filteredData]);

  const displayedServiceData = useMemo(() => {
    if (showAllServices) return costByServiceData;
    const topServices = costByServiceData.slice(0, 5);
    if (costByServiceData.length > 5) {
      const otherServices = costByServiceData.slice(5);
      const otherValue = _.sumBy(otherServices, 'value');
      topServices.push({
        name: 'Autres',
        value: otherValue,
        isOthers: true,
      });
    }
    return topServices;
  }, [costByServiceData, showAllServices]);

  const costByTeamData = useMemo(() => {
    return _.chain(filteredData)
      .groupBy('team')
      .map((items, team) => ({
        name: team,
        value: _.sumBy(items, 'cost'),
      }))
      .orderBy(['value'], ['desc'])
      .value();
  }, [filteredData]);

  const costByRegionData = useMemo(() => {
    return _.chain(filteredData)
      .groupBy('region')
      .map((items, region) => ({
        name: region,
        value: _.sumBy(items, 'cost'),
      }))
      .orderBy(['value'], ['desc'])
      .value();
  }, [filteredData]);

  const efficiencyData = useMemo(() => {
    return _.chain(filteredData)
      .groupBy('service')
      .map((items, service) => ({
        name: service,
        efficiency: _.meanBy(items, 'efficiency') || 75,
        cost: _.sumBy(items, 'cost'),
      }))
      .orderBy(['cost'], ['desc'])
      .slice(0, 6)
      .value();
  }, [filteredData]);

  // Options pour les filtres
  const serviceOptions = useMemo(() => {
    return _.uniq(allData.map((item) => item.service || '').filter(Boolean));
  }, [allData]);

  const regionOptions = useMemo(() => {
    return _.uniq(allData.map((item) => item.region || '').filter(Boolean));
  }, [allData]);

  const teamOptions = useMemo(() => {
    return _.uniq(allData.map((item) => item.team || '').filter(Boolean));
  }, [allData]);

  const environmentOptions = useMemo(() => {
    return _.uniq(
      allData.map((item) => item.environment || '').filter(Boolean)
    );
  }, [allData]);

  // Calcul des KPIs
  const totalCost = useMemo(
    () => _.sumBy(filteredData, 'cost') || 0,
    [filteredData]
  );

  const avgEfficiency = useMemo(
    () => _.meanBy(filteredData, 'efficiency') || 75,
    [filteredData]
  );

  const costChange = useMemo(() => {
    if (costTrendData.length >= 2) {
      const first = costTrendData[0].cost;
      const last = costTrendData[costTrendData.length - 1].cost;
      return (last / first - 1) * 100;
    }
    return 0;
  }, [costTrendData]);

  // Gestionnaires d'événements
  const handleServiceToggle = () => {
    setShowAllServices(!showAllServices);
  };

  // Rendus conditionnels selon l'état des données
  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView message={error.message} />;
  }

  if (!data || !data.costs || data.costs.length === 0) {
    return <NoDataView />;
  }

  // Rendu principal du dashboard
  return (
    <div className="space-y-6">
      {/* En-tête du dashboard avec filtres */}
      <DashboardFilters
        filters={filters}
        setFilters={setFilters}
        serviceOptions={serviceOptions}
        regionOptions={regionOptions}
        teamOptions={teamOptions}
        environmentOptions={environmentOptions}
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Coût total"
          value={formatCurrency(totalCost)}
          change={costChange}
          icon={ICONS.cost}
          color="bg-blue-600 dark:bg-blue-500"
          efficiencyData={efficiencyData}
          SERVICE_COLORS={SERVICE_COLORS}
          COLORS={COLORS}
        />
        <KPICard
          title="Coût mensuel moyen"
          value={formatCurrency(totalCost / Math.max(1, costTrendData.length))}
          secondaryValue={`Basé sur ${costTrendData.length} mois de données`}
          icon={ICONS.monthly}
          color="bg-purple-600 dark:bg-purple-500"
          efficiencyData={[]} // Pas de graphique dans cette carte
          SERVICE_COLORS={SERVICE_COLORS}
          COLORS={COLORS}
        />
        <KPICard
          title="Score d'efficacité"
          value={`${avgEfficiency.toFixed(1)}%`}
          icon={ICONS.efficiency}
          color="bg-green-600 dark:bg-green-500"
          efficiencyData={[]} // Pas de graphique dans cette carte
          SERVICE_COLORS={SERVICE_COLORS}
          COLORS={COLORS}
        />
      </div>

      {/* Graphiques - Première rangée */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendance des coûts */}
        <CostTrendChart
          data={costTrendData}
          onDetailsClick={() => console.log('Voir détails clicked')}
        />

        {/* Répartition par service */}
        <ServiceDistributionChart
          data={displayedServiceData}
          showAll={showAllServices}
          toggleShowAll={handleServiceToggle}
          serviceColors={SERVICE_COLORS}
          colors={COLORS}
        />

        <RegionalDistributionChart
          data={costByRegionData}
          colors={COLORS}
          regionColors={REGION_COLORS}
        />
      </div>

      {/* Note: Ajouter les autres composants de graphiques ici */}

      <TeamCostTable
        data={costByTeamData} // le tableau d'objets {name, value}
        filteredData={filteredData} // tout le dataset filtré (pour calculer le top service, etc.)
        totalCost={totalCost}
        formatCurrency={formatCurrency}
        getEfficiencyColor={getEfficiencyColor}
        SERVICE_COLORS={SERVICE_COLORS}
        COLORS={COLORS}
      />

      {/* Pied de page */}
      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8 mb-4">
        AWS FinOps Dashboard | Données simulées en temps réel | Dernière mise à
        jour:{' '}
        {lastUpdated
          ? lastUpdated.toLocaleString()
          : new Date().toLocaleString()}
      </footer>
    </div>
  );
};

export default FinOpsDashboard;
