// FinOpsDashboard.jsx - Version corrigée qui respecte strictement les règles des hooks
import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import _ from 'lodash';
import useRealTimeData from './useRealTimeData';

const KPICard = ({
  title,
  value,
  change,
  secondaryValue,
  icon,
  color,
  efficiencyData,
  costByTeamData,
  filteredData,
  totalCost,
  formatCurrency,
  getEfficiencyColor,
  SERVICE_COLORS,
  COLORS,
}) => {
  const isPositiveChange = change < 0; // Pour les coûts, une baisse est positive
  const changeTextClass = isPositiveChange ? 'text-green-600' : 'text-red-600';
  const changeArrow = isPositiveChange ? '▼' : '▲';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      {/* -- En-tête (titre, valeur, icône) -- */}
      <div className="flex items-start justify-between ">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {value}
          </p>

          {/* Variation (▲ / ▼) */}
          {change !== undefined && (
            <p className={`mt-2 text-sm ${changeTextClass} flex items-center`}>
              <span className="mr-1">{changeArrow}</span>
              <span>{Math.abs(change).toFixed(1)}%</span>
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

      {/* -- Deux blocs sur 2 lignes (efficacité / coûts) -- */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* BLOC 1 : Efficacité par service */}
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
                    <CustomTooltip formatter={(val) => `${val.toFixed(1)}%`} />
                  }
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

const ChartCard = ({ title, children, subtitle, action }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            {action}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="text-sm"
            style={{ color: entry.color }}
          >
            <span className="font-medium">{entry.name}: </span>
            {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Composant Loading
const LoadingView = () => (
  <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <div className="text-center">
      <div className="animate-spin w-12 h-12 mb-4 border-4 border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent rounded-full mx-auto"></div>
      <p className="text-gray-700 dark:text-gray-300">
        Chargement du dashboard FinOps (temps réel)...
      </p>
    </div>
  </div>
);

// Composant Error
const ErrorView = ({ message }) => (
  <div className="bg-red-50 dark:bg-red-900/30 rounded-xl shadow p-6">
    <p className="text-red-600 dark:text-red-300">
      Erreur lors du chargement des données: {message}
    </p>
  </div>
);

// Composant NoData
const NoDataView = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <p className="text-gray-700 dark:text-gray-300">Aucune donnée reçue</p>
  </div>
);

// Composant principal du dashboard
const FinOpsDashboard = ({ data, loading, error, lastUpdated }) => {
  // IMPORTANT: Tous les hooks sont appelés au début du composant et JAMAIS conditionnellement
  const [filters, setFilters] = useState({
    timeRange: '12',
    service: 'all',
    region: 'all',
    team: 'all',
    environment: 'all',
  });

  const [showAllServices, setShowAllServices] = useState(false);

  // Constantes pour les couleurs (pas de hook, juste des constantes)
  const COLORS = {
    blue: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
    green: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'],
    orange: ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'],
    purple: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'],
    red: ['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2'],
    gray: ['#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6'],
  };

  const SERVICE_COLORS = {
    EC2: COLORS.orange[0],
    S3: COLORS.blue[0],
    RDS: COLORS.green[0],
    Lambda: COLORS.purple[0],
    CloudFront: COLORS.blue[3],
    ECS: COLORS.green[3],
    DynamoDB: COLORS.red[0],
  };

  // TOUS les useMemo doivent être appelés avant tout rendu conditionnel
  const allData = useMemo(() => {
    return data && data.costs ? data.costs : [];
  }, [data]);

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

  const costTrendByServiceData = useMemo(() => {
    return _.chain(filteredData)
      .groupBy('date')
      .map((items, date) => {
        const result = { date };
        _.forEach(_.groupBy(items, 'service'), (serviceItems, serviceName) => {
          result[serviceName] = _.sumBy(serviceItems, 'cost');
        });
        return result;
      })
      .orderBy('date')
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
  console.log('efficiencyData:', efficiencyData);

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

  // Fonctions de formatage (pas de hook)
  const formatCurrency = (value) => {
    return `${parseFloat(value).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';

    const [year, month] = dateStr.split('-');
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
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const getEfficiencyColor = (eff) => {
    if (eff >= 90)
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (eff >= 75)
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    if (eff >= 60)
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  // Icônes pour les KPIs
  const costIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const efficiencyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const monthlyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  // MAINTENANT on peut faire des rendus conditionnels après avoir appelé tous les hooks
  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView message={error.message} />;
  }

  if (!data || !data.costs || data.costs.length === 0) {
    return <NoDataView />;
  }
  // Rendu principal
  return (
    <div className="space-y-6">
      {/* En-tête du dashboard */}
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
          {/* Date picker */}
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Période: {filters.timeRange} derniers mois</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Région
            </label>
            <select
              className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              value={filters.region}
              onChange={(e) =>
                setFilters({ ...filters, region: e.target.value })
              }
            >
              <option value="all">Toutes les régions</option>
              {regionOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
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

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Coût total"
          value={formatCurrency(totalCost)}
          change={costChange}
          icon={costIcon}
          color="bg-blue-600 dark:bg-blue-500"
          efficiencyData={efficiencyData}
          costByTeamData={costByTeamData}
          filteredData={filteredData}
          totalCost={totalCost}
          formatCurrency={formatCurrency}
          getEfficiencyColor={getEfficiencyColor}
          SERVICE_COLORS={SERVICE_COLORS}
          COLORS={COLORS}
        />
        <KPICard
          title="Coût mensuel moyen"
          value={formatCurrency(totalCost / Math.max(1, costTrendData.length))}
          secondaryValue={`Basé sur ${costTrendData.length} mois de données`}
          icon={monthlyIcon}
          color="bg-purple-600 dark:bg-purple-500"
          efficiencyData={efficiencyData}
          costByTeamData={costByTeamData}
          filteredData={filteredData}
          totalCost={totalCost}
          formatCurrency={formatCurrency}
          getEfficiencyColor={getEfficiencyColor}
          SERVICE_COLORS={SERVICE_COLORS}
          COLORS={COLORS}
        />
        <KPICard
          title="Score d'efficacité"
          value={`${avgEfficiency.toFixed(1)}%`}
          icon={efficiencyIcon}
          color="bg-green-600 dark:bg-green-500"
          efficiencyData={efficiencyData}
          costByTeamData={costByTeamData}
          filteredData={filteredData}
          totalCost={totalCost}
          formatCurrency={formatCurrency}
          getEfficiencyColor={getEfficiencyColor}
          SERVICE_COLORS={SERVICE_COLORS}
          COLORS={COLORS}
        />
      </div>

      {/* Graphiques - Première rangée */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendance des coûts */}
        <ChartCard
          title="Tendance des coûts"
          subtitle="Évolution des coûts sur la période"
          action="Voir détails"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrendData}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis
                  tickFormatter={(value) => `${value.toLocaleString()} €`}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(value) =>
                        `Période: ${formatDate(value)}`
                      }
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCost)"
                  activeDot={{
                    r: 6,
                    stroke: '#2563eb',
                    strokeWidth: 2,
                    fill: '#ffffff',
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Répartition par service */}
        <ChartCard
          title="Répartition par service"
          subtitle="Distribution des coûts par service AWS"
          action={
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {showAllServices ? 'Voir top 5' : 'Voir tous'}
            </button>
          }
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayedServiceData}
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
                  {displayedServiceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.isOthers
                          ? COLORS.gray[0]
                          : SERVICE_COLORS[entry.name] ||
                            COLORS.blue[index % COLORS.blue.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={
                    <CustomTooltip
                      formatter={(value) => formatCurrency(value)}
                    />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Tendance par service */}
        <ChartCard
          title="Tendance par service"
          subtitle="Évolution des coûts par service AWS"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrendByServiceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis
                  tickFormatter={(value) => `${value.toLocaleString()} €`}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(value) =>
                        `Période: ${formatDate(value)}`
                      }
                    />
                  }
                />
                <Legend />
                {serviceOptions.slice(0, 5).map((service, index) => (
                  <Area
                    key={service}
                    type="monotone"
                    dataKey={service}
                    stackId="1"
                    stroke={
                      SERVICE_COLORS[service] ||
                      COLORS.blue[index % COLORS.blue.length]
                    }
                    fill={
                      SERVICE_COLORS[service] ||
                      COLORS.blue[index % COLORS.blue.length]
                    }
                    fillOpacity={0.6}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Répartition par région */}
        <ChartCard
          title="Répartition par région"
          subtitle="Distribution des coûts par région AWS"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costByRegionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `${value.toLocaleString()} €`}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      formatter={(value) => formatCurrency(value)}
                    />
                  }
                />
                <Bar dataKey="value" name="Coût">
                  {costByRegionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS.blue[index % COLORS.blue.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Répartition par équipe */}
        <ChartCard
          title="Coûts par équipe"
          subtitle="Top 5 équipes (après filtres)"
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
                {costByTeamData.slice(0, 5).map((team) => {
                  // On filtre tous les items correspondants à cette équipe
                  const teamItems = filteredData.filter(
                    (item) => item.team === team.name
                  );

                  // Service le plus coûteux
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
                  const teamEfficiency =
                    _.meanBy(teamItems, 'efficiency') || 75;

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
                        {totalCost > 0
                          ? ((team.value / totalCost) * 100).toFixed(1) + '%'
                          : '0%'}
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
      </div>

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
