// src/components/anomaly/utils/hooks.js
import { useState, useMemo } from 'react';

/**
 * Custom hook to manage anomaly data and related state
 *
 * @param {Object} data - Raw data from API containing anomalies and cost history
 * @returns {Object} Processed data and state management functions
 */
export const useAnomalyData = (data) => {
  // UI state
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'resolved', 'unresolved'
  const [impactSort, setImpactSort] = useState('desc'); // 'asc', 'desc'
  const [dateRange, setDateRange] = useState('30'); // '7', '30', '90'

  // Extract raw data
  const anomalies = data?.anomalies || [];
  const costHistory = data?.costs || [];

  // Calculate filtered anomalies based on current filter and sort
  const filteredAnomalies = useMemo(() => {
    let filtered = [...anomalies];

    // Filter by status
    if (filter === 'resolved') {
      filtered = filtered.filter((a) => a.status === 'Resolved');
    } else if (filter === 'unresolved') {
      filtered = filtered.filter((a) => a.status === 'Unresolved');
    }

    // Sort by impact
    filtered.sort((a, b) => {
      if (impactSort === 'desc') return b.impact - a.impact;
      return a.impact - b.impact;
    });

    return filtered;
  }, [anomalies, filter, impactSort]);

  // Calculate anomaly statistics for dashboard cards
  const anomalyStats = useMemo(() => {
    // Calculate total financial impact
    const totalImpact = anomalies.reduce(
      (sum, a) => sum + parseFloat(a.impact),
      0
    );

    // Count anomalies by status
    const resolvedCount = anomalies.filter(
      (a) => a.status === 'Resolved'
    ).length;
    const unresolvedCount = anomalies.filter(
      (a) => a.status === 'Unresolved'
    ).length;

    // Analyze impact by service
    const impactByService = {};
    anomalies.forEach((a) => {
      a.rootCauses.forEach((cause) => {
        // Calculate portion of impact attributable to each cause
        const portion = (cause.impact / 100) * parseFloat(a.impact);
        impactByService[cause.name] =
          (impactByService[cause.name] || 0) + portion;
      });
    });

    // Convert to array for charts
    const impactByServiceData = Object.keys(impactByService).map((service) => ({
      name: service,
      value: Math.round(impactByService[service] * 100) / 100,
    }));

    return {
      totalImpact,
      resolvedCount,
      unresolvedCount,
      totalCount: anomalies.length,
      // Sort by impact in descending order
      impactByServiceData: impactByServiceData.sort(
        (a, b) => b.value - a.value
      ),
    };
  }, [anomalies]);

  // Find indices of anomaly points in cost history
  const anomalyIndices = useMemo(() => {
    return costHistory
      .map((day, idx) => (day.isAnomaly ? idx : null))
      .filter((idx) => idx !== null);
  }, [costHistory]);

  // Function to handle resolving an anomaly
  const handleResolveAnomaly = (anomalyId) => {
    // Update the anomaly status locally
    if (data && data.anomalies) {
      data.anomalies = data.anomalies.map((a) =>
        a.id === anomalyId ? { ...a, status: 'Resolved' } : a
      );
    }
  };

  return {
    // Processed data
    filteredAnomalies,
    anomalyStats,
    anomalyIndices,
    costHistory,

    // UI state
    selectedAnomaly,
    setSelectedAnomaly,
    filter,
    setFilter,
    impactSort,
    setImpactSort,
    dateRange,
    setDateRange,

    // Actions
    handleResolveAnomaly,
  };
};
