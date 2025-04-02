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
import MonthlyTrendChart from './charts/MonthlyTrendChart';
import EfficiencyTrendChart from './charts/EfficiencyTrendChart';
import DataStatusBanner from '../common/DataStatusBanner'; // Importer le composant bannière
import AdvancedRegionWordCloud from './charts/AdvancedRegionWordCloud';
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
const FinOpsDashboard = ({ data, loading, error, lastUpdated, isRefreshing }) => {
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
    // Services AWS communs avec des plages d'efficacité typiques
    const serviceBaseEfficiency = {
      'EC2': 70,
      'S3': 85,
      'RDS': 75,
      'Lambda': 90,
      'CloudFront': 88,
      'ECS': 72,
      'DynamoDB': 80,
      'EBS': 65
    };
  
    return _.chain(filteredData)
      .groupBy('service')
      .map((items, service) => {
        // Calculer l'efficacité moyenne pour ce service
        const serviceEfficiency = _.meanBy(items, 'efficiency');
        
        // Si l'efficacité n'est pas disponible, utiliser une valeur prédéfinie basée sur le service
        // ou générer une valeur aléatoire avec une variabilité contrôlée
        let efficiency;
        if (isNaN(serviceEfficiency) || serviceEfficiency === 0) {
          // Utiliser une valeur de base pour ce service s'il existe, sinon valeur aléatoire
          const baseValue = serviceBaseEfficiency[service] || (60 + Math.random() * 25);
          // Ajouter une petite variation aléatoire (±5%)
          efficiency = baseValue + (Math.random() * 10 - 5);
          // S'assurer que l'efficacité reste dans une plage raisonnable
          efficiency = Math.min(95, Math.max(50, efficiency));
        } else {
          efficiency = serviceEfficiency;
        }
  
        return {
          name: service,
          efficiency: efficiency,
          cost: _.sumBy(items, 'cost'),
        };
      })
      .orderBy(['cost'], ['desc'])
      .slice(0, 6)
      .value();
  }, [filteredData]);

  const getMonthlyTrendData = useMemo(() => {
    return costTrendData.map((item) => ({
      date: item.date,
      cost: item.cost,
    }));
  }, [costTrendData]);

  const getEfficiencyTrendData = useMemo(() => {
    // Si pas de données réelles, générer des données de démonstration plus variées
    if (costTrendData.length === 0) return [];

    // Générer une progression plus visible avec quelques variations
    return costTrendData.map((item, index) => {
      // Progression non-linéaire pour plus de réalisme
      // Commencer bas (55%) et augmenter progressivement avec une courbe plus prononcée
      const baseValue = 55;
      const maxValue = 75;

      // Progression non-linéaire pour créer une courbe plus intéressante
      // Utiliser une fonction cubique pour accentuer les changements récents
      let progress = Math.pow(index / (costTrendData.length - 1 || 1), 1.5);

      // Ajouter une petite variation aléatoire
      const randomVariation = Math.random() * 1.5 - 0.75; // Variation de ±0.75%

      // Calculer la valeur finale
      const efficiency =
        baseValue + (maxValue - baseValue) * progress + randomVariation;

      // Retourner les données formatées pour cette date
      return {
        date: item.date,
        efficiency: efficiency,
      };
    });
  }, [costTrendData]);

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

  const avgEfficiency = useMemo(() => {
    // Si les données sont vides, utiliser la dernière valeur calculée du graphique
    if (getEfficiencyTrendData.length > 0) {
      const lastEff =
        getEfficiencyTrendData[getEfficiencyTrendData.length - 1].efficiency;
      return lastEff;
    }

    // Valeur par défaut si aucune donnée
    return 75;
  }, [getEfficiencyTrendData]);

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
      {/* Bannière de statut des données */}
      <DataStatusBanner lastUpdated={lastUpdated} isRefreshing={isRefreshing} />
      
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Coût mensuel moyen
              </h3>
              <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {formatCurrency(totalCost / Math.max(1, costTrendData.length))}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Basé sur {costTrendData.length} mois de données
              </p>
            </div>
            <div className={`p-3 rounded-lg bg-purple-600 dark:bg-purple-500`}>
              {ICONS.monthly}
            </div>
          </div>

          {/* Graphique de tendance mensuelle */}
          {getMonthlyTrendData.length > 0 && (
            <MonthlyTrendChart data={getMonthlyTrendData} />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Score d'efficacité
              </h3>
              <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {`${avgEfficiency.toFixed(1)}%`}
              </p>
            </div>
            <div className={`p-3 rounded-lg bg-green-600 dark:bg-green-500`}>
              {ICONS.efficiency}
            </div>
          </div>

          {/* Graphique de tendance d'efficacité */}
          <EfficiencyTrendChart data={getEfficiencyTrendData} />
        </div>
      </div>

      {/* Graphiques - Première rangée */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendance des coûts */}
        <CostTrendChart
          data={costTrendData}
          onDetailsClick={() => console.log('Voir détails clicked')}
        />

<AdvancedRegionWordCloud
      data={filteredData}
      title='Most Popular Region by Spend Previous Month'
      filters={filters}
      setFilters={setFilters}
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