// src/components/finops/views/StatusViews.jsx
import React from 'react';

/**
 * Affiche un indicateur de chargement
 */
export const LoadingView = () => (
  <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <div className="text-center">
      <div className="animate-spin w-12 h-12 mb-4 border-4 border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent rounded-full mx-auto"></div>
      <p className="text-gray-700 dark:text-gray-300">
        Chargement du dashboard FinOps (temps réel)...
      </p>
    </div>
  </div>
);

/**
 * Affiche un message d'erreur
 * @param {object} props - Propriétés du composant
 * @param {string} props.message - Message d'erreur à afficher
 */
export const ErrorView = ({ message }) => (
  <div className="bg-red-50 dark:bg-red-900/30 rounded-xl shadow p-6">
    <p className="text-red-600 dark:text-red-300">
      Erreur lors du chargement des données: {message}
    </p>
  </div>
);

/**
 * Affiche un message quand aucune donnée n'est disponible
 */
export const NoDataView = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <p className="text-gray-700 dark:text-gray-300">Aucune donnée reçue</p>
  </div>
);
