import React, { useState, useMemo, useEffect } from 'react';
import _ from 'lodash';

const AdvancedRegionWordCloud = ({ 
  data, 
  title = "Most Popular Region by Spend Previous Month",
  filters = {},
  setFilters = () => {}
}) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  // Calculer les dépenses totales par région - TOUJOURS utiliser les données complètes, pas filtrées
  const regionData = useMemo(() => {
    if (!data || !data.length) return [];
    
    return _.chain(data)
      .groupBy('region')
      .map((items, region) => ({
        region,
        spend: _.sumBy(items, 'cost')
      }))
      .orderBy(['spend'], ['desc'])
      .value();
  }, [data]);

  // Synchroniser la sélection avec les filtres externes
  useEffect(() => {
    if (filters && filters.region && filters.region !== 'all') {
      setSelectedRegion(filters.region);
    } else if (filters && filters.region === 'all') {
      setSelectedRegion(null);
    }
  }, [filters]);
  
  // Calculer les tailles de fonte relatives
  const fontSizes = useMemo(() => {
    if (regionData.length === 0) return {};
    
    const maxSpend = Math.max(...regionData.map(item => item.spend));
    const minSpend = Math.min(...regionData.map(item => item.spend));
    const minFontSize = 16;  // Augmenté légèrement
    const maxFontSize = 100;
    
    // Utiliser une échelle logarithmique pour une meilleure distribution
    const sizes = {};
    
    regionData.forEach(item => {
      // Calculer la taille de fonte relative
      const normalizedSize = (Math.log(item.spend) - Math.log(minSpend)) / 
                             (Math.log(maxSpend) - Math.log(minSpend));
      const fontSize = minFontSize + normalizedSize * (maxFontSize - minFontSize);
      sizes[item.region] = Math.min(maxFontSize, Math.max(minFontSize, fontSize));
    });
    
    return sizes;
  }, [regionData]);

  // Positions plus variées en utilisant une stratégie aléatoire mais déterministe
  const positions = useMemo(() => {
    if (regionData.length === 0) return {};
    
    const pos = {};
    const used = new Set();
    
    // Fonction pour générer une valeur de hash simple pour les positions
    const hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convertir en entier 32 bits
      }
      return Math.abs(hash);
    };
    
    regionData.forEach((item, index) => {
      // Position principale pour les éléments les plus importants
      if (index === 0) {
        pos[item.region] = { x: 50, y: 50 };
        used.add('50-50');
        return;
      }
      
      if (index === 1) {
        pos[item.region] = { x: 30, y: 30 };
        used.add('30-30');
        return;
      }
      
      // Pour les autres éléments, générer des positions pseudo-aléatoires basées sur le nom
      const hash = hashString(item.region);
      let attempts = 0;
      let x, y, key;
      
      do {
        // Varier la position en fonction du hash et de l'index
        x = 20 + ((hash + index * 7 + attempts * 13) % 60);
        y = 20 + ((hash + index * 11 + attempts * 17) % 60);
        key = `${x}-${y}`;
        attempts++;
      } while (used.has(key) && attempts < 20);
      
      pos[item.region] = { x, y };
      used.add(key);
    });
    
    return pos;
  }, [regionData]);

  // Formater les valeurs de dépenses en milliers (K) ou millions (M)
  const formatSpend = (spend) => {
    if (spend >= 1000000) {
      return `$${(spend / 1000000).toFixed(2)}M`;
    } else if (spend >= 1000) {
      return `$${(spend / 1000).toFixed(2)}K`;
    }
    return `$${spend.toFixed(2)}`;
  };

  // Générer des couleurs légèrement différentes pour les différentes régions
  const getRegionColor = (region, index) => {
    // Couleurs de base par région géographique
    const baseColors = {
      'us': '#3b82f6', // bleu
      'eu': '#6366f1', // indigo
      'ap': '#10b981', // vert
      'sa': '#f59e0b', // orange
      'af': '#ef4444', // rouge
      'me': '#8b5cf6', // violet
      'ca': '#ec4899', // rose
      'global': '#14b8a6' // turquoise
    };
    
    // Obtenir la couleur de base pour la région
    const prefix = region.split('-')[0];
    const baseColor = baseColors[prefix] || '#3b82f6';
    
    return baseColor;
  };

  // Gérer le clic sur une région
  const handleRegionClick = (region) => {
    if (selectedRegion === region) {
      // Si on clique sur la région déjà sélectionnée, la désélectionner
      setSelectedRegion(null);
      // Réinitialiser le filtre de région dans les filtres du dashboard
      setFilters(prevFilters => ({
        ...prevFilters,
        region: 'all'
      }));
    } else {
      // Sinon, sélectionner la nouvelle région
      setSelectedRegion(region);
      // Mettre à jour le filtre de région dans les filtres du dashboard
      setFilters(prevFilters => ({
        ...prevFilters,
        region: region
      }));
    }
  };

  if (regionData.length === 0) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg h-72 flex items-center justify-center">
        <p>Aucune donnée disponible pour la visualisation</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg relative h-96 overflow-hidden border border-gray-700">
      {/* Titre */}
      <div className="absolute top-2 left-4 text-sm font-medium text-gray-300">
        {title}
      </div>
      
  
      
      {/* Nuage de mots - Toujours afficher TOUTES les régions */}
      <div className="w-full h-full relative flex items-center justify-center">
        {regionData.map((item, index) => {
          const position = positions[item.region] || { x: 50, y: 50 };
          const fontSize = fontSizes[item.region] || 16;
          
          const isHovered = hoveredRegion === item.region;
          const isSelected = selectedRegion === item.region;
          
          // Déterminer la couleur en fonction de la sélection et du survol
          let color;
          let opacity;
          
          if (selectedRegion) {
            // Si une région est sélectionnée
            if (isSelected) {
              // La région sélectionnée est en blanc
              color = '#ffffff';
              opacity = 1;
            } else {
              // Les autres régions sont en gris
              color = '#94a3b8'; // gray-400
              opacity = 0.4;
            }
          } else {
            // Comportement normal quand aucune région n'est sélectionnée
            opacity = Math.max(0.5, 1 - (index / (regionData.length * 1.5)));
            color = isHovered ? '#ffffff' : getRegionColor(item.region, index);
          }
          
          // Ajouter une étiquette de valeur pour chaque région selon son état
          const showValue = isHovered || isSelected;
          
          return (
            <div 
              key={item.region}
              className="absolute whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                fontSize: `${fontSize}px`,
                fontWeight: (index < 3 || isSelected) ? 'bold' : 'normal',
                opacity: opacity,
                color: color,
                textShadow: (index < 3 || isSelected) ? '0 0 5px rgba(0,0,0,0.3)' : 'none',
                zIndex: isSelected ? 100 : isHovered ? 90 : regionData.length - index,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setHoveredRegion(item.region)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(item.region)}
            >
              {item.region}
              {showValue && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs bg-blue-600 px-1 py-0.5 rounded text-white">
                  {formatSpend(item.spend)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedRegionWordCloud;