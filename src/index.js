// index.js
// Export des services de données en temps réel

import { DataGeneratorService } from './DataGeneratorService';
import useRealTimeData from './useRealTimeData';

// Exporter un singleton du service
const dataService = new DataGeneratorService();

export { dataService, useRealTimeData };
