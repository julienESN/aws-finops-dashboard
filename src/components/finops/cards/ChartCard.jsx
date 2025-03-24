// src/components/finops/cards/ChartCard.jsx
import React from 'react';

/**
 * Conteneur pour les graphiques avec titre, sous-titre et action optionnelle
 *
 * @param {object} props - Propriétés du composant
 * @param {string} props.title - Titre de la carte
 * @param {string} [props.subtitle] - Sous-titre optionnel
 * @param {React.ReactNode} [props.action] - Bouton d'action optionnel (ex: "Voir tout")
 * @param {React.ReactNode} props.children - Contenu de la carte (graphique)
 */
const ChartCard = ({ title, children, subtitle, action }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md">
      {/* En-tête avec titre, sous-titre et action */}
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

      {/* Contenu (graphique) */}
      {children}
    </div>
  );
};

export default ChartCard;
