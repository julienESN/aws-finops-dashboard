// useRealTimeData.js
import { useState, useEffect } from 'react';
import { DataGeneratorService } from './DataGeneratorService';

let dataService;
const getDataService = () => {
  if (!dataService) {
    // On instancie le service qu'une seule fois
    dataService = new DataGeneratorService();
  }
  return dataService;
};

const useRealTimeData = (category = 'all') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const service = getDataService();

      // Mise à jour locale dès que le service notifie
      const updateData = (newData) => {
        setData(newData);
        setLastUpdated(new Date());
        setLoading(false);
      };

      // On s'abonne à la catégorie demandée
      const unsubscribe = service.subscribe(category, updateData);

      // Cleanup = se désabonner
      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.error("Erreur lors de l'init du data service:", err);
      setError(err);
      setLoading(false);
    }
  }, [category]);

  return {
    data,
    loading,
    error,
    lastUpdated,
  };
};

export default useRealTimeData;
