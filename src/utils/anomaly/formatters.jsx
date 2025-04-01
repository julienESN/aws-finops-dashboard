// src/components/anomaly/utils/formatters.js

/**
 * Format date to DD/MM/YYYY
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

/**
 * Format date and time to DD/MM/YYYY HH:MM
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (dateString) => {
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

/**
 * Format currency with Euro symbol and thousands separators
 * @param {number} value - Value to format
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value) => {
  return `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
};

/**
 * Format date for chart display
 * @param {string} dateStr - Date string from data
 * @returns {string} Formatted date (DD/MM)
 */
export const formatChartDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};
