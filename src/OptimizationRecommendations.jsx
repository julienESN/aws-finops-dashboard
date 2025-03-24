import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';

// Importer les fonctions depuis le script original
// const generateAWSOptimizationRecommendations = () => {
//   // Structure de données pour les recommandations
//   const recommendations = {
//     ec2_rightsizing: [],
//     reserved_instances: [],
//     savings_plans: [],
//     storage_optimization: [],
//     idle_resources: [],
//   };

//   // 1. EC2 Rightsizing
//   const instanceTypes = [
//     't3.micro',
//     't3.small',
//     'm5.large',
//     'c5.xlarge',
//     'r5.2xlarge',
//     'm5.2xlarge',
//   ];
//   const rightSizeTargets = [
//     't3.nano',
//     't2.micro',
//     't3.micro',
//     'm5.small',
//     'c5.large',
//     'r5.xlarge',
//   ];

//   // Générer 8-15 recommandations de redimensionnement d'instances
//   const numRightsizingRecs = 8 + Math.floor(Math.random() * 8);

//   for (let i = 0; i < numRightsizingRecs; i++) {
//     const instanceIndex = Math.floor(Math.random() * instanceTypes.length);
//     const currentType = instanceTypes[instanceIndex];
//     const recommendedType = rightSizeTargets[instanceIndex];
//     const region = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'][
//       Math.floor(Math.random() * 4)
//     ];
//     const utilizationMetrics = {
//       cpu: Math.floor(Math.random() * 30) + 5, // 5-35% utilisation
//       memory: Math.floor(Math.random() * 40) + 10, // 10-50% utilisation
//       network: Math.floor(Math.random() * 20) + 5, // 5-25% utilisation
//     };

//     // Calculer les économies potentielles
//     const currentCostHourly = {
//       't3.micro': 0.0104,
//       't3.small': 0.0208,
//       'm5.large': 0.096,
//       'c5.xlarge': 0.17,
//       'r5.2xlarge': 0.504,
//       'm5.2xlarge': 0.384,
//     }[currentType];

//     const recommendedCostHourly = {
//       't3.nano': 0.0052,
//       't2.micro': 0.0116,
//       't3.micro': 0.0104,
//       'm5.small': 0.048,
//       'c5.large': 0.085,
//       'r5.xlarge': 0.252,
//     }[recommendedType];

//     const hourlySavings = currentCostHourly - recommendedCostHourly;
//     const monthlySavings = hourlySavings * 730; // 730 heures par mois en moyenne

//     recommendations.ec2_rightsizing.push({
//       instanceId: `i-${Math.random().toString(36).substring(2, 10)}`,
//       currentInstanceType: currentType,
//       recommendedInstanceType: recommendedType,
//       region: region,
//       currentMonthlyCost: (currentCostHourly * 730).toFixed(2),
//       recommendedMonthlyCost: (recommendedCostHourly * 730).toFixed(2),
//       potentialMonthlySavings: monthlySavings.toFixed(2),
//       utilizationMetrics: utilizationMetrics,
//       paybackPeriod: 'Immediate',
//       confidence:
//         Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
//     });
//   }

//   // 2. Savings Plans
//   const serviceSavingsPlans = [
//     {
//       type: 'Compute Savings Plan',
//       term: '1 year',
//       commitment: '$1000/month',
//       currentOnDemandSpend: 1400,
//       coveragePercentage: 71,
//       savingsRate: 20,
//       monthlySavings: 280,
//     },
//     {
//       type: 'EC2 Instance Savings Plan',
//       term: '3 years',
//       commitment: '$2500/month',
//       currentOnDemandSpend: 3600,
//       coveragePercentage: 69,
//       savingsRate: 40,
//       monthlySavings: 1440,
//     },
//     {
//       type: 'Compute Savings Plan',
//       term: '3 years',
//       commitment: '$5000/month',
//       currentOnDemandSpend: 7200,
//       coveragePercentage: 70,
//       savingsRate: 38,
//       monthlySavings: 2736,
//     },
//     {
//       type: 'SageMaker Savings Plan',
//       term: '1 year',
//       commitment: '$800/month',
//       currentOnDemandSpend: 1100,
//       coveragePercentage: 72,
//       savingsRate: 25,
//       monthlySavings: 275,
//     },
//   ];

//   // Sélectionner aléatoirement 2-3 plans d'épargne
//   const numSavingsPlans = 2 + Math.floor(Math.random() * 2);
//   const shuffledPlans = [...serviceSavingsPlans].sort(
//     () => 0.5 - Math.random()
//   );
//   recommendations.savings_plans = shuffledPlans.slice(0, numSavingsPlans);

//   // 3. Reserved Instances
//   const potentialRIs = [
//     {
//       instanceType: 'r5.2xlarge',
//       region: 'us-east-1',
//       normalizationFactor: 16,
//       instanceCount: 5,
//       term: '1 year',
//       paymentOption: 'No Upfront',
//       utilizationRate: 92,
//       currentMonthlyCost: 1840.0,
//       riMonthlyCost: 1196.0,
//       monthlySavings: 644.0,
//       annualSavings: 7728.0,
//       roi: 35,
//     },
//     {
//       instanceType: 'm5.large',
//       region: 'us-west-2',
//       normalizationFactor: 4,
//       instanceCount: 10,
//       term: '1 year',
//       paymentOption: 'Partial Upfront',
//       utilizationRate: 88,
//       currentMonthlyCost: 700.8,
//       riMonthlyCost: 420.5,
//       monthlySavings: 280.3,
//       annualSavings: 3363.6,
//       roi: 40,
//     },
//     {
//       instanceType: 'c5.xlarge',
//       region: 'eu-west-1',
//       normalizationFactor: 8,
//       instanceCount: 8,
//       term: '3 years',
//       paymentOption: 'All Upfront',
//       utilizationRate: 95,
//       currentMonthlyCost: 992.0,
//       riMonthlyCost: 495.0,
//       monthlySavings: 497.0,
//       annualSavings: 5964.0,
//       roi: 50,
//     },
//     {
//       instanceType: 'r5.xlarge',
//       region: 'ap-southeast-1',
//       normalizationFactor: 8,
//       instanceCount: 4,
//       term: '3 years',
//       paymentOption: 'No Upfront',
//       utilizationRate: 90,
//       currentMonthlyCost: 736.0,
//       riMonthlyCost: 441.6,
//       monthlySavings: 294.4,
//       annualSavings: 3532.8,
//       roi: 40,
//     },
//   ];

//   const numRIs = 2 + Math.floor(Math.random() * 3);
//   const shuffledRIs = [...potentialRIs].sort(() => 0.5 - Math.random());
//   recommendations.reserved_instances = shuffledRIs.slice(0, numRIs);

//   // 4. Storage Optimization
//   const storageOptimizations = [
//     {
//       type: 'S3 Lifecycle Policy',
//       resourceId: 's3://company-analytics-data',
//       currentStorage: {
//         type: 'S3 Standard',
//         sizeGB: 1500,
//         monthlyCost: 34.5,
//       },
//       recommendedStorage: {
//         type: 'S3 Infrequent Access',
//         eligibleGB: 1200,
//         monthlyCost: 15.6,
//       },
//       monthlySavings: 18.9,
//       implementationComplexity: 'Low',
//     },
//     {
//       type: 'S3 Intelligent-Tiering',
//       resourceId: 's3://customer-data-backup',
//       currentStorage: {
//         type: 'S3 Standard',
//         sizeGB: 5000,
//         monthlyCost: 115.0,
//       },
//       recommendedStorage: {
//         type: 'S3 Intelligent-Tiering',
//         eligibleGB: 5000,
//         monthlyCost: 65.0,
//       },
//       monthlySavings: 50.0,
//       implementationComplexity: 'Low',
//     },
//     {
//       type: 'EBS Volume Type Change',
//       resourceId: 'vol-a1b2c3d4e5f6g7h8i',
//       currentStorage: {
//         type: 'EBS gp2',
//         sizeGB: 500,
//         monthlyCost: 50.0,
//       },
//       recommendedStorage: {
//         type: 'EBS gp3',
//         sizeGB: 500,
//         monthlyCost: 35.0,
//       },
//       monthlySavings: 15.0,
//       implementationComplexity: 'Medium',
//     },
//     {
//       type: 'EBS Snapshot Archive',
//       resourceId: 'Multiple Snapshots',
//       currentStorage: {
//         type: 'EBS Snapshots',
//         sizeGB: 2000,
//         monthlyCost: 100.0,
//       },
//       recommendedStorage: {
//         type: 'EBS Snapshot Archive',
//         eligibleGB: 1600,
//         monthlyCost: 32.0,
//       },
//       monthlySavings: 68.0,
//       implementationComplexity: 'Medium',
//     },
//     {
//       type: 'RDS Storage Optimization',
//       resourceId: 'database-1',
//       currentStorage: {
//         type: 'RDS gp2',
//         sizeGB: 1000,
//         monthlyCost: 115.0,
//       },
//       recommendedStorage: {
//         type: 'RDS gp3',
//         sizeGB: 1000,
//         monthlyCost: 95.0,
//       },
//       monthlySavings: 20.0,
//       implementationComplexity: 'High',
//     },
//   ];

//   const numStorageOpts = 3 + Math.floor(Math.random() * 3);
//   const shuffledStorage = [...storageOptimizations].sort(
//     () => 0.5 - Math.random()
//   );
//   recommendations.storage_optimization = shuffledStorage.slice(
//     0,
//     numStorageOpts
//   );

//   // 5. Idle Resources
//   const idleResources = [
//     {
//       type: 'Idle EC2 Instance',
//       resourceId: 'i-0123456789abcdef0',
//       region: 'us-east-1',
//       state: 'running',
//       idlePeriod: '14 days',
//       cpuUtilization: '1.2%',
//       networkUtilization: '0.5 KB/s',
//       monthlyCost: 105.12,
//       recommendedAction: 'Terminate',
//     },
//     {
//       type: 'Unattached EBS Volume',
//       resourceId: 'vol-0123456789abcdef0',
//       region: 'us-west-2',
//       sizeGB: 100,
//       state: 'available',
//       idlePeriod: '30 days',
//       monthlyCost: 10.0,
//       recommendedAction: 'Delete',
//     },
//     {
//       type: 'Idle Load Balancer',
//       resourceId:
//         'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-lb/1234567890123456',
//       region: 'us-east-1',
//       state: 'active',
//       requestsPerMinute: '0',
//       idlePeriod: '21 days',
//       monthlyCost: 16.8,
//       recommendedAction: 'Delete',
//     },
//     {
//       type: 'Unused Elastic IP',
//       resourceId: 'eipalloc-0123456789abcdef0',
//       region: 'eu-west-1',
//       state: 'allocated',
//       idlePeriod: '45 days',
//       monthlyCost: 3.6,
//       recommendedAction: 'Release',
//     },
//     {
//       type: 'Idle RDS Instance',
//       resourceId: 'db-ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//       region: 'ap-southeast-1',
//       state: 'available',
//       connectionCount: '0',
//       cpuUtilization: '0.8%',
//       idlePeriod: '10 days',
//       monthlyCost: 140.6,
//       recommendedAction: 'Stop or Terminate',
//     },
//   ];

//   const numIdleResources = 3 + Math.floor(Math.random() * 3);
//   const shuffledIdle = [...idleResources].sort(() => 0.5 - Math.random());
//   recommendations.idle_resources = shuffledIdle.slice(0, numIdleResources);

//   // Calcul des économies totales
//   const totalSavings = {
//     rightsizing: recommendations.ec2_rightsizing.reduce(
//       (total, r) => total + parseFloat(r.potentialMonthlySavings),
//       0
//     ),
//     savingsPlans: recommendations.savings_plans.reduce(
//       (total, r) => total + r.monthlySavings,
//       0
//     ),
//     reservedInstances: recommendations.reserved_instances.reduce(
//       (total, r) => total + r.monthlySavings,
//       0
//     ),
//     storageOptimization: recommendations.storage_optimization.reduce(
//       (total, r) => total + r.monthlySavings,
//       0
//     ),
//     idleResources: recommendations.idle_resources.reduce(
//       (total, r) => total + r.monthlyCost,
//       0
//     ),
//   };

//   totalSavings.monthly = Object.values(totalSavings).reduce((a, b) => a + b, 0);
//   totalSavings.annual = totalSavings.monthly * 12;

//   return {
//     recommendations,
//     totalSavings,
//   };
// };

// Composant pour les cartes de sections de recommandation
const RecommendationCategory = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-200">
      <div
        className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
            {icon}
          </div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            {title}
          </h3>
        </div>
        <button className="text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-200 ${
              expanded ? 'transform rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

// Formatage des nombres pour l'affichage
const formatCurrency = (value) => {
  return `${parseFloat(value).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
};

// Tags pour les niveaux de confiance et complexité
const ConfidenceTag = ({ level }) => {
  const colors = {
    High: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Medium:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Low: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level]}`}
    >
      {level}
    </span>
  );
};

const ComplexityTag = ({ level }) => {
  const colors = {
    Low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Medium:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    High: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level]}`}
    >
      {level}
    </span>
  );
};

// Barre de progression avec pourcentage
const ProgressBar = ({ value, maxValue, colorClass = 'bg-blue-500' }) => {
  const percentage = Math.min(100, Math.round((value / maxValue) * 100));

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
      <div
        className={`${colorClass} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Composant principal de recommandations d'optimisation
const OptimizationRecommendations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('savings'); // savings, complexity, confidence
  const [searchQuery, setSearchQuery] = useState('');

  // Générer les recommandations
  useEffect(() => {
    // Simuler un délai de chargement
    setTimeout(() => {
      const optimizationData = generateAWSOptimizationRecommendations();
      setData(optimizationData);
      setLoading(false);
    }, 1000);
  }, []);

  // Transformer les données pour l'affichage
  useEffect(() => {
    if (!data) return;

    // Convertir toutes les recommandations en format unifié pour l'affichage
    const transformedRecommendations = [];

    // EC2 Rightsizing
    data.recommendations.ec2_rightsizing.forEach((rec) => {
      transformedRecommendations.push({
        id: `ec2-${rec.instanceId}`,
        category: 'ec2_rightsizing',
        categoryName: 'Redimensionnement EC2',
        title: `Instance ${rec.currentInstanceType} sous-utilisée`,
        description: `Redimensionner l'instance ${rec.instanceId} de ${rec.currentInstanceType} à ${rec.recommendedInstanceType}`,
        details: [
          `Région: ${rec.region}`,
          `CPU: ${rec.utilizationMetrics.cpu}%, Mémoire: ${rec.utilizationMetrics.memory}%, Réseau: ${rec.utilizationMetrics.network}%`,
          `Coût actuel: ${formatCurrency(rec.currentMonthlyCost)}/mois`,
          `Coût recommandé: ${formatCurrency(rec.recommendedMonthlyCost)}/mois`,
        ],
        savings: parseFloat(rec.potentialMonthlySavings),
        complexity: 'Low',
        confidence: rec.confidence,
        actions: ['Resize', 'Ignore'],
      });
    });

    // Savings Plans
    data.recommendations.savings_plans.forEach((rec) => {
      transformedRecommendations.push({
        id: `sp-${rec.type.replace(/\s+/g, '-').toLowerCase()}-${rec.term}`,
        category: 'savings_plans',
        categoryName: 'Savings Plans',
        title: `${rec.type} (${rec.term})`,
        description: `Souscrire à un ${rec.type} avec un engagement de ${rec.commitment}`,
        details: [
          `Dépenses On-Demand actuelles: ${formatCurrency(
            rec.currentOnDemandSpend
          )}/mois`,
          `Couverture: ${rec.coveragePercentage}%`,
          `Taux d'économie: ${rec.savingsRate}%`,
        ],
        savings: rec.monthlySavings,
        complexity: 'Medium',
        confidence: 'High',
        actions: ['Purchase', 'Ignore'],
      });
    });

    // Reserved Instances
    data.recommendations.reserved_instances.forEach((rec) => {
      transformedRecommendations.push({
        id: `ri-${rec.instanceType}-${rec.region}`,
        category: 'reserved_instances',
        categoryName: 'Instances Réservées',
        title: `${rec.instanceCount}x ${rec.instanceType} (${rec.term})`,
        description: `Acheter des instances réservées ${rec.instanceType} dans ${rec.region}`,
        details: [
          `Option de paiement: ${rec.paymentOption}`,
          `Taux d'utilisation: ${rec.utilizationRate}%`,
          `Coût On-Demand actuel: ${formatCurrency(
            rec.currentMonthlyCost
          )}/mois`,
          `Coût RI: ${formatCurrency(rec.riMonthlyCost)}/mois`,
          `ROI: ${rec.roi}%`,
        ],
        savings: rec.monthlySavings,
        complexity: 'Medium',
        confidence: 'High',
        actions: ['Purchase', 'Ignore'],
      });
    });

    // Storage Optimization
    data.recommendations.storage_optimization.forEach((rec) => {
      transformedRecommendations.push({
        id: `storage-${rec.type
          .replace(/\s+/g, '-')
          .toLowerCase()}-${rec.resourceId.split('/').pop()}`,
        category: 'storage_optimization',
        categoryName: 'Optimisation du Stockage',
        title: rec.type,
        description: `Optimiser ${rec.resourceId} en passant de ${rec.currentStorage.type} à ${rec.recommendedStorage.type}`,
        details: [
          `Stockage actuel: ${rec.currentStorage.sizeGB} GB à ${formatCurrency(
            rec.currentStorage.monthlyCost
          )}/mois`,
          `Stockage recommandé: ${
            rec.recommendedStorage.eligibleGB || rec.currentStorage.sizeGB
          } GB à ${formatCurrency(rec.recommendedStorage.monthlyCost)}/mois`,
        ],
        savings: rec.monthlySavings,
        complexity: rec.implementationComplexity,
        confidence: 'High',
        actions: ['Apply', 'Ignore'],
      });
    });

    // Idle Resources
    data.recommendations.idle_resources.forEach((rec) => {
      const details = [];
      if (rec.cpuUtilization) details.push(`CPU: ${rec.cpuUtilization}`);
      if (rec.networkUtilization)
        details.push(`Réseau: ${rec.networkUtilization}`);
      if (rec.connectionCount)
        details.push(`Connexions: ${rec.connectionCount}`);
      if (rec.sizeGB) details.push(`Taille: ${rec.sizeGB} GB`);
      details.push(`Période d'inactivité: ${rec.idlePeriod}`);
      details.push(`Région: ${rec.region}`);

      transformedRecommendations.push({
        id: `idle-${rec.type
          .replace(/\s+/g, '-')
          .toLowerCase()}-${rec.resourceId.split('/').pop().split('-').pop()}`,
        category: 'idle_resources',
        categoryName: 'Ressources Inactives',
        title: rec.type,
        description: `${rec.recommendedAction} ${rec.resourceId}`,
        details: details,
        savings: rec.monthlyCost,
        complexity: 'Low',
        confidence: 'High',
        actions: [rec.recommendedAction, 'Ignore'],
      });
    });

    setRecommendations(transformedRecommendations);
  }, [data]);

  // Filtrer et trier les recommandations
  const filteredAndSortedRecommendations = useMemo(() => {
    if (!recommendations.length) return [];

    // Filtrer par catégorie et recherche
    let filtered = recommendations;

    if (activeCategory !== 'all') {
      filtered = filtered.filter((rec) => rec.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (rec) =>
          rec.title.toLowerCase().includes(query) ||
          rec.description.toLowerCase().includes(query) ||
          rec.details.some((detail) => detail.toLowerCase().includes(query))
      );
    }

    // Trier
    switch (sortOrder) {
      case 'savings':
        return [...filtered].sort((a, b) => b.savings - a.savings);
      case 'complexity': {
        const complexityValue = { Low: 0, Medium: 1, High: 2 };
        return [...filtered].sort(
          (a, b) =>
            complexityValue[a.complexity] - complexityValue[b.complexity]
        );
      }
      case 'confidence': {
        const confidenceValue = { High: 0, Medium: 1, Low: 2 };
        return [...filtered].sort(
          (a, b) =>
            confidenceValue[a.confidence] - confidenceValue[b.confidence]
        );
      }
      default:
        return filtered;
    }
  }, [recommendations, activeCategory, sortOrder, searchQuery]);

  // Icônes pour les différentes catégories
  const categoryIcons = {
    ec2_rightsizing: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
        />
      </svg>
    ),
    savings_plans: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    reserved_instances: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    storage_optimization: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
        />
      </svg>
    ),
    idle_resources: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    ),
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition-colors duration-200">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 mb-4 border-4 border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-700 dark:text-gray-300">
              Génération des recommandations d'optimisation...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Recommandations d'optimisation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Identifiez les opportunités d'économies et d'optimisation AWS
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <select
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 rounded-lg text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="savings">Trier par économies</option>
              <option value="complexity">Trier par complexité</option>
              <option value="confidence">Trier par confiance</option>
            </select>

            <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Résumé des économies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800/50">
            <div className="flex items-start">
              <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Économies mensuelles
                </h3>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  {formatCurrency(data.totalSavings.monthly)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {recommendations.length} opportunités identifiées
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 shadow-sm border border-green-100 dark:border-green-800/50">
            <div className="flex items-start">
              <div className="p-3 bg-green-100 dark:bg-green-800/50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Économies annuelles
                </h3>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  {formatCurrency(data.totalSavings.annual)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Projection sur 12 mois
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 shadow-sm border border-amber-100 dark:border-amber-800/50">
            <div className="flex items-start">
              <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Actions rapides
                </h3>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  {data.recommendations.idle_resources.length +
                    data.recommendations.ec2_rightsizing.length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Actions à faible risque
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres catégories et recherche */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <button
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-150 ${
                activeCategory === 'all'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              Toutes ({recommendations.length})
            </button>

            {Object.entries({
              ec2_rightsizing: `EC2 (${data.recommendations.ec2_rightsizing.length})`,
              idle_resources: `Ressources Inactives (${data.recommendations.idle_resources.length})`,
              savings_plans: `Savings Plans (${data.recommendations.savings_plans.length})`,
              reserved_instances: `RI (${data.recommendations.reserved_instances.length})`,
              storage_optimization: `Stockage (${data.recommendations.storage_optimization.length})`,
            }).map(([key, label]) => (
              <button
                key={key}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-150 ${
                  activeCategory === key
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveCategory(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery('')}
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Liste des recommandations */}
      <div className="space-y-4">
        {filteredAndSortedRecommendations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-300">
              Aucune recommandation trouvée avec les filtres actuels.
            </p>
          </div>
        ) : (
          filteredAndSortedRecommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-grow">
                  <div className="flex items-start">
                    <div className="p-3 rounded-lg mr-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      {categoryIcons[recommendation.category]}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {recommendation.title}
                        </h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                          {recommendation.categoryName}
                        </span>
                        <ConfidenceTag level={recommendation.confidence} />
                        <ComplexityTag level={recommendation.complexity} />
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {recommendation.description}
                      </p>

                      <div className="pl-3 border-l-2 border-gray-200 dark:border-gray-700 mb-3">
                        {recommendation.details.map((detail, index) => (
                          <p
                            key={index}
                            className="text-xs text-gray-500 dark:text-gray-400 mb-1"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:ml-6 mt-4 md:mt-0 flex flex-col md:items-end justify-between">
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg text-center">
                    <div className="text-xs font-medium uppercase">
                      Économie
                    </div>
                    <div className="text-lg font-bold">
                      {formatCurrency(recommendation.savings)}/mois
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150">
                      Ignorer
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-150">
                      {recommendation.actions[0]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Vue détaillée par catégorie */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Analyse détaillée par catégorie
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendationCategory
            title="Redimensionnement EC2"
            icon={categoryIcons.ec2_rightsizing}
          >
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Les instances EC2 sous-utilisées coûtent{' '}
              {formatCurrency(data.totalSavings.rightsizing)} par mois. Le
              redimensionnement peut réduire ces coûts de façon significative
              sans impacter les performances.
            </p>

            <div className="space-y-3">
              {data.recommendations.ec2_rightsizing
                .slice(0, 3)
                .map((instance) => (
                  <div
                    key={instance.instanceId}
                    className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {instance.instanceId} ({instance.currentInstanceType}{' '}
                          → {instance.recommendedInstanceType})
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Région: {instance.region} | CPU:{' '}
                          {instance.utilizationMetrics.cpu}% | Mémoire:{' '}
                          {instance.utilizationMetrics.memory}%
                        </div>
                      </div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(instance.potentialMonthlySavings)}/mois
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">
                          Utilisation CPU
                        </span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {instance.utilizationMetrics.cpu}%
                        </span>
                      </div>
                      <ProgressBar
                        value={instance.utilizationMetrics.cpu}
                        maxValue={100}
                        colorClass="bg-blue-500 dark:bg-blue-400"
                      />
                    </div>
                  </div>
                ))}

              {data.recommendations.ec2_rightsizing.length > 3 && (
                <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Voir {data.recommendations.ec2_rightsizing.length - 3}{' '}
                  instances supplémentaires
                </button>
              )}
            </div>
          </RecommendationCategory>

          <RecommendationCategory
            title="Savings Plans"
            icon={categoryIcons.savings_plans}
          >
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Les Savings Plans offrent une réduction tarifaire en échange d'un
              engagement d'utilisation. Économisez{' '}
              {formatCurrency(data.totalSavings.savingsPlans)}/mois avec les
              plans recommandés.
            </p>

            <div className="space-y-3">
              {data.recommendations.savings_plans.map((plan) => (
                <div
                  key={`${plan.type}-${plan.term}`}
                  className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {plan.type} ({plan.term})
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Engagement: {plan.commitment} | Couverture:{' '}
                        {plan.coveragePercentage}%
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(plan.monthlySavings)}/mois
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">
                        Taux d'économie
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {plan.savingsRate}%
                      </span>
                    </div>
                    <ProgressBar
                      value={plan.savingsRate}
                      maxValue={100}
                      colorClass="bg-green-500 dark:bg-green-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </RecommendationCategory>

          <RecommendationCategory
            title="Instances Réservées"
            icon={categoryIcons.reserved_instances}
          >
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Les instances réservées offrent jusqu'à 75% d'économies par
              rapport aux tarifs à la demande. Économisez{' '}
              {formatCurrency(data.totalSavings.reservedInstances)}/mois avec
              les réservations recommandées.
            </p>

            <div className="space-y-3">
              {data.recommendations.reserved_instances.map((ri) => (
                <div
                  key={`${ri.instanceType}-${ri.region}`}
                  className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {ri.instanceCount}x {ri.instanceType}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Région: {ri.region} | Terme: {ri.term} | Utilisation:{' '}
                        {ri.utilizationRate}%
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(ri.monthlySavings)}/mois
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">
                        ROI
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {ri.roi}%
                      </span>
                    </div>
                    <ProgressBar
                      value={ri.roi}
                      maxValue={100}
                      colorClass="bg-purple-500 dark:bg-purple-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </RecommendationCategory>

          <RecommendationCategory
            title="Optimisation du Stockage"
            icon={categoryIcons.storage_optimization}
          >
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              L'optimisation du stockage peut réduire les coûts jusqu'à 70%.
              Économisez {formatCurrency(data.totalSavings.storageOptimization)}
              /mois avec nos recommandations.
            </p>

            <div className="space-y-3">
              {data.recommendations.storage_optimization.map((storage) => (
                <div
                  key={`${storage.type}-${storage.resourceId}`}
                  className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {storage.type}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {storage.resourceId} | {storage.currentStorage.type} →{' '}
                        {storage.recommendedStorage.type}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(storage.monthlySavings)}/mois
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Taille: {storage.currentStorage.sizeGB} GB
                    </span>
                    <ComplexityTag level={storage.implementationComplexity} />
                  </div>
                </div>
              ))}
            </div>
          </RecommendationCategory>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/50">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Optimisation automatique
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
              <p>
                Vous pouvez configurer l'optimisation automatique pour certaines
                catégories de recommandations, comme les instances EC2
                sous-utilisées et les volumes EBS non attachés.
              </p>
            </div>
            <div className="mt-3">
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 dark:border-blue-700 text-sm leading-5 font-medium rounded-md text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-150">
                Configurer l'auto-optimisation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationRecommendations;
