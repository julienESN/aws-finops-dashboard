// src/utils/finops/formatters.js
// Fonctions utilitaires pour le formatage des données
import { MONTH_NAMES } from './constants';

/**
 * Formate un montant en euros avec séparateur de milliers et 2 décimales
 * @param {number} value - Montant à formater
 * @returns {string} Montant formaté avec symbole € et séparateurs
 */
export const formatCurrency = (value) => {
  return `${parseFloat(value).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
};

/**
 * Formate une date au format YYYY-MM en format lisible Mois Année
 * @param {string} dateStr - Date au format "YYYY-MM"
 * @returns {string} Date formatée (ex: "Jan 2023")
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';

  const [year, month] = dateStr.split('-');
  return `${MONTH_NAMES[parseInt(month) - 1]} ${year}`;
};

/**
 * Retourne une classe CSS pour la couleur de fond et texte selon le niveau d'efficacité
 * @param {number} efficiency - Score d'efficacité (0-100)
 * @returns {string} Classes CSS pour le niveau d'efficacité
 */
export const getEfficiencyColor = (efficiency) => {
  if (efficiency >= 90)
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (efficiency >= 75)
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
  if (efficiency >= 60)
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
};

/**
 * Formate un pourcentage en chaîne avec signe et flèche de tendance
 * @param {number} value - Valeur du pourcentage
 * @param {boolean} isInverted - Si true, une baisse est considérée positive (pour les coûts)
 * @returns {object} Objet contenant la flèche, la classe CSS et la valeur formatée
 */
export const formatTrendIndicator = (value, isInverted = false) => {
  const isPositive = isInverted ? value < 0 : value > 0;
  const cssClass = isPositive ? 'text-green-600' : 'text-red-600';
  const arrow = isPositive ? '▲' : '▼';

  return {
    arrow,
    cssClass,
    value: Math.abs(value).toFixed(1),
  };
};
