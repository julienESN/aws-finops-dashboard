import React, { useState, useRef, useEffect } from 'react';
import {
  SERVICE_DESCRIPTIONS,
  REGION_DESCRIPTIONS,
  TEAM_DESCRIPTIONS,
  ENV_DESCRIPTIONS
} from '../../../utils/finops/constants';
import InfoTooltip from './InfoTooltip';
const SelectWithTooltips = ({
  label,
  options,
  value,
  onChange,
  type = 'service', // 'service', 'region' ou 'team'
  infoText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Déterminer quel dictionnaire de descriptions utiliser
  let descriptions;
  switch (type) {
    case 'service':
      descriptions = SERVICE_DESCRIPTIONS;
      break;
    case 'region':
      descriptions = REGION_DESCRIPTIONS;
      break;
    case 'team':
      descriptions = TEAM_DESCRIPTIONS;
      break;
    case 'environment':
      descriptions = ENV_DESCRIPTIONS;
      break;
    default:
      descriptions = {};
  }

  // Gestion du clic à l'extérieur pour fermer le dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Déterminer le texte d'affichage pour l'option "tous"
  const allText = () => {
    switch (type) {
      case 'service':
        return 'Tous les services';
      case 'region':
        return 'Toutes les régions';
      case 'team':
        return 'Toutes les équipes';
      default:
        return 'Tout';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
        <InfoTooltip text={infoText} />
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="relative w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-left text-gray-700 dark:text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value === 'all' ? allText() : value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            <div
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                onChange({ target: { value: 'all' } });
                setIsOpen(false);
              }}
            >
              <span className="block truncate">{allText()}</span>
              {value === 'all' && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>

            {options.map((option) => (
              <div
                key={option}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  onChange({ target: { value: option } });
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-col">
                  <span className="block truncate font-medium">{option}</span>
                  {descriptions[option] && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {descriptions[option]}
                    </span>
                  )}
                </div>

                {value === option && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectWithTooltips;
