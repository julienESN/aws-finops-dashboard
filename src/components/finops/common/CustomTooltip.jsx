// src/components/finops/common/CustomTooltip.jsx
import React from 'react';

/**
 * Tooltip personnalisé pour les graphiques Recharts
 *
 * @param {object} props - Propriétés du composant
 * @param {boolean} props.active - Si le tooltip est actif
 * @param {Array} props.payload - Données du point survolé
 * @param {string} props.label - Label du point survolé
 * @param {Function} props.formatter - Fonction pour formater les valeurs
 * @param {Function} props.labelFormatter - Fonction pour formater le label
 */
const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}) => {
  // Ne rien afficher si le tooltip n'est pas actif ou s'il n'y a pas de données
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
      {/* Label/Titre du tooltip */}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {labelFormatter ? labelFormatter(label) : label}
      </p>

      {/* Données pour chaque série */}
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
};

export default CustomTooltip;
