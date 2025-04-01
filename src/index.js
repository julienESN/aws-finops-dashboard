// index.js
// Export des services de données en temps réel

import { DataGeneratorService } from './DataGeneratorService';
import usePersistentData from './usePersistentData';

// Exporter un singleton du service
const dataService = new DataGeneratorService();

export { dataService, usePersistentData };
