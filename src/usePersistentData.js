// src/usePersistentData.js
import { useState, useEffect, useMemo } from 'react';
import { PersistentDataGeneratorService } from './PersistentDataGeneratorService';

// Instance unique du service (singleton)
let dataService;

/**
 * Obtenir l'instance unique du service de données
 */
const getDataService = () => {
  if (!dataService) {
    dataService = new PersistentDataGeneratorService();
  }
  return dataService;
};

/**
 * Hook personnalisé pour accéder aux données persistantes
 * @param {string} category - Catégorie de données ('all', 'costs', 'anomalies', etc.)
 * @param {string} period - Période souhaitée ('current_year', 'last_12_months', etc.)
 * @returns {Object} - Données, état de chargement, erreurs et fonctions utilitaires
 */
const usePersistentData = (category = 'all', period = 'current_year') => {
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const service = getDataService();

      // Fonction de mise à jour pour les données brutes
      const updateData = (newData) => {
        setRawData(newData);
        setLastUpdated(new Date());
        setLoading(false);
      };

      // S'abonner à la catégorie demandée
      const unsubscribe = service.subscribe(category, updateData);

      // Nettoyage - se désabonner
      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.error(
        "Erreur lors de l'initialisation du service de données:",
        err
      );
      setError(err);
      setLoading(false);
    }
  }, [category]); // On ne réabonne que si la catégorie change

  // Filtrer les données selon la période
  const data = useMemo(() => {
    if (!rawData || !rawData.costs) return rawData;

    const filteredData = { ...rawData };
    const now = new Date();
    const currentYear = now.getFullYear();

    // Fonction de filtrage par date
    const filterByDate = (costs, cutoffDate) => {
      return costs.filter((item) => {
        const [year, month] = item.date.split('-');
        const itemDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        return itemDate >= cutoffDate;
      });
    };

    // Filtrer les données selon la période sélectionnée
    if (period === 'current_year') {
      // Filtrer pour l'année en cours
      filteredData.costs = rawData.costs.filter((item) => {
        const [year] = item.date.split('-');
        return parseInt(year) === currentYear;
      });
    } else if (period.startsWith('year_')) {
      // Filtrer pour une année spécifique
      const year = parseInt(period.replace('year_', ''));
      filteredData.costs = rawData.costs.filter((item) => {
        const [itemYear] = item.date.split('-');
        return parseInt(itemYear) === year;
      });
    } else if (period === 'last_12_months') {
      // 12 derniers mois
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - 12);
      filteredData.costs = filterByDate(rawData.costs, cutoffDate);
    } else if (period === 'last_6_months') {
      // 6 derniers mois
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - 6);
      filteredData.costs = filterByDate(rawData.costs, cutoffDate);
    } else if (period === 'last_30_days') {
      // 30 derniers jours
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);
      filteredData.costs = filterByDate(rawData.costs, cutoffDate);
    }

    return filteredData;
  }, [rawData, period]);

  /**
   * Réinitialise complètement les données sauvegardées
   */
  const resetData = () => {
    try {
      const service = getDataService();
      // Effacer les données et en générer de nouvelles
      service.clearSavedData();
      window.location.reload(); // Recharger la page pour réinitialiser le service
      return true;
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des données:', error);
      return false;
    }
  };

  /**
   * Forcer la sauvegarde des données actuelles
   */
  const saveCurrentData = () => {
    try {
      const service = getDataService();
      service.saveData();
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
      return false;
    }
  };

  return {
    data,
    loading,
    error,
    lastUpdated,
    resetData,
    saveCurrentData,
  };
};

export default usePersistentData;
