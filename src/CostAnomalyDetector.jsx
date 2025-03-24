import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import useRealTimeData from './useRealTimeData'; // <-- On importe ton hook

// Composant de carte pour les anomalies
const AnomalyCard = ({ anomaly, isSelected, onClick, onResolve }) => {
  const isResolved = anomaly.status === 'Resolved';
  const statusColorClass = isResolved
    ? 'bg-green-500 dark:bg-green-400'
    : 'bg-red-500 dark:bg-red-400';
  const cardBorderClass = isSelected
    ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900'
    : 'border-gray-200 dark:border-gray-700';
  const cardBgClass = isResolved
    ? 'bg-green-50 dark:bg-green-900/20'
    : 'bg-red-50 dark:bg-red-900/20';

  // Format des dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Format pour la date et heure
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Format pour les montants
  const formatCurrency = (value) => {
    return `${value.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €`;
  };

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${cardBorderClass} hover:shadow-md`}
    >
      <div className={`p-4 cursor-pointer ${cardBgClass}`} onClick={onClick}>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColorClass}`}
              ></span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate(anomaly.date)}
              </span>
            </div>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
              Impact:{' '}
              <span className="font-medium text-red-600 dark:text-red-400">
                {formatCurrency(anomaly.impact)}
              </span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                (+{anomaly.percentageIncrease}% du coût normal)
              </span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Détecté: {formatDateTime(anomaly.detectedAt)}
            </div>
            <div className="text-xs mt-1">
              {anomaly.rootCauses.slice(0, 2).map((cause, index) => (
                <span
                  key={index}
                  className="inline-flex items-center mr-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {cause.name}
                </span>
              ))}
              {anomaly.rootCauses.length > 2 && (
                <span className="text-gray-500 dark:text-gray-400">
                  +{anomaly.rootCauses.length - 2} autres
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="p-5 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Coût actuel
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(anomaly.actualCost)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Coût attendu
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(anomaly.expectedCost)}
              </div>
            </div>
          </div>

          {/* Visualisation de l'anomalie */}
          <div className="mb-4 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Impact visuel
            </h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: 'Coût attendu',
                      value: anomaly.expectedCost,
                      fill: '#94a3b8',
                    },
                    {
                      name: 'Coût réel',
                      value: anomaly.actualCost,
                      fill: '#ef4444',
                    },
                  ]}
                  layout="vertical"
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 'dataMax']} hide />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    cursor={false}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {[
                      {
                        name: 'Coût attendu',
                        value: anomaly.expectedCost,
                        fill: '#94a3b8',
                      },
                      {
                        name: 'Coût réel',
                        value: anomaly.actualCost,
                        fill: '#ef4444',
                      },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                  <ReferenceLine y="Coût attendu" strokeWidth={0}>
                    <Label value="Coût attendu" position="center" />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
              Causes racines identifiées
            </h4>
            <div className="space-y-3">
              {anomaly.rootCauses.map((cause, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {cause.name}
                    </span>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      Impact: {cause.impact}%
                    </span>
                  </div>
                  <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                    {cause.reason}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-2 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600">
                    {cause.details.map((detail, i) => (
                      <div key={i} className="flex">
                        <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mt-1.5 mr-2"></span>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {anomaly.affectedAccounts.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Comptes affectés
              </h4>
              <div className="flex flex-wrap gap-2">
                {anomaly.affectedAccounts.map((account, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-lg"
                  >
                    {account}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isResolved
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
              }`}
              disabled={isResolved}
              onClick={() => !isResolved && onResolve(anomaly.id)}
            >
              {isResolved ? 'Résolu' : 'Marquer comme résolu'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant principal pour la détection d'anomalies
const CostAnomalyDetector = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'resolved', 'unresolved'
  const [impactSort, setImpactSort] = useState('desc'); // 'asc', 'desc'
  const [dateRange, setDateRange] = useState('30'); // '7', '30', '90'

  // On récupère TOUTES les données, ou simplement 'anomalies' + 'costs'
  // si ton DataGeneratorService sépare bien.
  // Par simplicité, on fait 'all':
  const { data, loading, error } = useRealTimeData('all');

  // Si tu n'as pas d'erreur (error) ni de loading -> data est dispo:
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-64">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 mb-4 border-4 border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-700 dark:text-gray-300">
              Chargement des données d'anomalies...
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  // Suppose qu'on a data.anomalies et data.costs dans le service
  const anomalies = data?.anomalies || [];
  const costHistory = data?.costs || [];

  // handleResolveAnomaly: on peut juste faire un setState local
  // ou appeler un endpoint.
  const handleResolveAnomaly = (anomalyId) => {
    // On simule la résolution localement
    // (ou on pourrait émettre un event au service, etc.)
    // Filtrage local:
    const updated = anomalies.map((a) =>
      a.id === anomalyId ? { ...a, status: 'Resolved' } : a
    );
    // NOTE: pour vraiment rafraichir l'UI, on doit soit manipuler
    // un state local, soit manipuler dataService,
    // dépend de ta logique. Pour la démo:
    // dataService.resolveAnomaly(anomalyId) (si tu as une méthode).
    // Ici on se contente de *remplacer* localement data.anomalies
    data.anomalies = updated;
  };

  // Filtrage, tri, stats
  const filteredAnomalies = useMemo(() => {
    let filtered = [...anomalies];
    if (filter === 'resolved') {
      filtered = filtered.filter((a) => a.status === 'Resolved');
    } else if (filter === 'unresolved') {
      filtered = filtered.filter((a) => a.status === 'Unresolved');
    }
    filtered.sort((a, b) => {
      if (impactSort === 'desc') return b.impact - a.impact;
      return a.impact - b.impact;
    });
    return filtered;
  }, [anomalies, filter, impactSort]);

  // Statistiques d'anomalies
  const anomalyStats = useMemo(() => {
    const totalImpact = anomalies.reduce((sum, a) => sum + a.impact, 0);
    const resolvedCount = anomalies.filter(
      (a) => a.status === 'Resolved'
    ).length;
    const unresolvedCount = anomalies.filter(
      (a) => a.status === 'Unresolved'
    ).length;

    // Impact par service
    const impactByService = {};
    anomalies.forEach((a) => {
      a.rootCauses.forEach((cause) => {
        const portion = (cause.impact / 100) * a.impact;
        impactByService[cause.name] =
          (impactByService[cause.name] || 0) + portion;
      });
    });
    const impactByServiceData = Object.keys(impactByService).map((service) => ({
      name: service,
      value: Math.round(impactByService[service] * 100) / 100,
    }));

    return {
      totalImpact,
      resolvedCount,
      unresolvedCount,
      totalCount: anomalies.length,
      impactByServiceData: impactByServiceData.sort(
        (a, b) => b.value - a.value
      ),
    };
  }, [anomalies]);

  // Déterminer indices anomalies dans costHistory
  const anomalyIndices = costHistory
    .map((day, idx) => (day.isAnomaly ? idx : null))
    .filter((idx) => idx !== null);

  // Couleurs
  const COLORS = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#6366f1',
  ];

  // Format date
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-64">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 mb-4 border-4 border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-700 dark:text-gray-300">
              Chargement des données d'anomalies...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Détection d'anomalies de coûts
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Identifiez et analysez les dépenses inhabituelles
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <select
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 rounded-lg text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">7 derniers jours</option>
            <option value="30">30 derniers jours</option>
            <option value="90">90 derniers jours</option>
          </select>

          <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Statuts et statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800/50">
          <div className="flex items-start">
            <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Impact total
              </h3>
              <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {formatCurrency(anomalyStats.totalImpact)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Sur {anomalyStats.totalCount} anomalies détectées
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 shadow-sm border border-amber-100 dark:border-amber-800/50">
          <div className="flex items-start">
            <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Anomalies non résolues
              </h3>
              <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {anomalyStats.unresolvedCount}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Sur {anomalyStats.totalCount} anomalies détectées
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 shadow-sm border border-green-100 dark:border-green-800/50">
          <div className="flex items-start">
            <div className="p-3 bg-green-100 dark:bg-green-800/50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600 dark:text-green-400"
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
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Anomalies résolues
              </h3>
              <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {anomalyStats.resolvedCount}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Taux de résolution:{' '}
                {Math.round(
                  (anomalyStats.resolvedCount / anomalyStats.totalCount) * 100
                )}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique d'historique des coûts avec anomalies + impact par service */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Historique des coûts - 30 derniers jours
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costHistory}>
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
                  tickFormatter={(value) => `${value} €`}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip
                  formatter={(value) => [`${value.toFixed(2)} €`, 'Coût']}
                  labelFormatter={(value) =>
                    `Date: ${new Date(value).toLocaleDateString('fr-FR')}`
                  }
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCost)"
                  activeDot={(props) => {
                    const { cx, cy, index } = props;
                    const isAnomaly = anomalyIndices.includes(index);
                    return isAnomaly ? (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={6}
                        fill="#ef4444"
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ) : (
                      <circle cx={cx} cy={cy} r={4} fill="#3b82f6" />
                    );
                  }}
                />
                {anomalyIndices.map((index, i) => (
                  <ReferenceLine
                    key={i}
                    x={costHistory[index].date}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Impact par service
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={anomalyStats.impactByServiceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {anomalyStats.impactByServiceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Liste des anomalies détectées */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Anomalies détectées ({filteredAnomalies.length})
          </h3>

          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            {/* Filtres */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                  filter === 'all'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter('all')}
              >
                Toutes
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                  filter === 'unresolved'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter('unresolved')}
              >
                Non résolues
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                  filter === 'resolved'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter('resolved')}
              >
                Résolues
              </button>
            </div>

            {/* Tri */}
            <button
              className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
              onClick={() =>
                setImpactSort(impactSort === 'desc' ? 'asc' : 'desc')
              }
            >
              <span>Impact</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${
                  impactSort === 'asc' ? 'transform rotate-180' : ''
                }`}
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

        {filteredAnomalies.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
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
            <p className="text-gray-600 dark:text-gray-300">
              Aucune anomalie{' '}
              {filter === 'resolved'
                ? 'résolue'
                : filter === 'unresolved'
                ? 'non résolue'
                : ''}{' '}
              détectée dans la période sélectionnée.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {filteredAnomalies.map((anomaly) => (
              <AnomalyCard
                key={anomaly.id}
                anomaly={anomaly}
                isSelected={selectedAnomaly === anomaly}
                onClick={() =>
                  setSelectedAnomaly(
                    anomaly === selectedAnomaly ? null : anomaly
                  )
                }
                onResolve={handleResolveAnomaly}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section d'aide et alertes */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/50">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Configuration des alertes d'anomalies
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
              <p>
                Vous pouvez configurer les seuils de détection et les
                notifications pour les anomalies de coûts. Cela vous permettra
                d'être alerté automatiquement lorsqu'une dépense inhabituelle
                est détectée.
              </p>
            </div>
            <div className="mt-3">
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 dark:border-blue-700 text-sm leading-5 font-medium rounded-md text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-150">
                Configurer les alertes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnomalyDetector;
