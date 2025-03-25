// DataGeneratorService.js
// Service pour générer des données aléatoires en temps réel pour le dashboard FinOps

class DataGeneratorService {
  constructor() {
    // On stocke un ensemble de callbacks par catégorie: "costs", "anomalies", "recommendations", "stats", "all", etc.
    this.subscribersByCategory = new Map();

    this.data = {
      costs: [],
      services: [],
      regions: [],
      teams: [],
      anomalies: [],
      recommendations: {},
      totalCost: 0,
      efficiency: 0,
      lastUpdated: new Date(),
    };

    // Données de base qui ne changent pas souvent
    this.baseData = {
      regions: [
        'us-east-1',
        'us-west-2',
        'eu-west-1',
        'eu-central-1',
        'ap-southeast-1',
        'sa-east-1',
      ],
      services: [
        'EC2',
        'S3',
        'RDS',
        'Lambda',
        'CloudFront',
        'ECS',
        'DynamoDB',
        'EBS',
        'SageMaker',
      ],
      teams: [
        'Engineering',
        'Marketing',
        'Sales',
        'Operations',
        'Research',
        'IT',
        'Data Science',
      ],
      environments: ['Production', 'Development', 'Staging', 'Testing'],
    };

    // Génération initiale des données
    this.generateInitialData();

    // Mise à jour périodique des données
    this.startPeriodicUpdates();
  }

  /**
   * Permet à un composant (ou un hook) de s'abonner aux mises à jour d'une catégorie
   * @param {string} category - Ex: "costs", "anomalies", "recommendations", "stats", "all"
   * @param {function} callback - fonction appelée à chaque mise à jour
   * @returns {function} une fonction d'unsubscribe
   */
  subscribe(category, callback) {
    if (!this.subscribersByCategory.has(category)) {
      this.subscribersByCategory.set(category, new Set());
    }
    const subscribersSet = this.subscribersByCategory.get(category);

    // On ajoute la callback
    subscribersSet.add(callback);

    // On appelle immédiatement la callback avec la data initiale
    callback(this.getCategoryData(category));

    // On retourne la fonction de désabonnement
    return () => {
      subscribersSet.delete(callback);
    };
  }

  /**
   * Notifie tous les abonnés de la catégorie donnée, ainsi que ceux de 'all'
   * @param {string} category
   */
  notifySubscribers(category) {
    // 1) Notifier ceux qui écoutent "all"
    const allSet = this.subscribersByCategory.get('all');
    if (allSet) {
      for (const cb of allSet) {
        cb(this.data); // on envoie l'ensemble de this.data
      }
    }

    // 2) Notifier la catégorie spécifique (si != 'all')
    if (category !== 'all') {
      const catSet = this.subscribersByCategory.get(category);
      if (catSet) {
        const catData = this.getCategoryData(category);
        for (const cb of catSet) {
          cb(catData);
        }
      }
    }
  }

  /**
   * Renvoie la portion de this.data correspondant à la catégorie (ou tout si "all")
   */
  getCategoryData(category) {
    if (category === 'all') {
      return this.data;
    }
    return this.data[category];
  }

  // Génère les données initiales complètes
  generateInitialData() {
    this.generateCostData();
    this.generateServiceData();
    this.generateAnomaliesData();
    this.generateRecommendationsData();
    this.calculateTotals();
  }

  // Commence les mises à jour périodiques des différentes données
  startPeriodicUpdates() {
    // Mise à jour des coûts toutes les 10 secondes
    setInterval(() => {
      this.updateCostData();
      this.notifySubscribers('costs');
    }, 1000);

    // Mise à jour des anomalies toutes les 15 secondes
    setInterval(() => {
      this.updateAnomaliesData();
      this.notifySubscribers('anomalies');
    }, 15000);

    // Mise à jour des recommandations toutes les 20 secondes
    setInterval(() => {
      this.updateRecommendationsData();
      this.notifySubscribers('recommendations');
    }, 20000);

    // Mise à jour des statistiques globales toutes les 5 secondes
    setInterval(() => {
      this.calculateTotals();
      this.notifySubscribers('stats');
    }, 5000);
  }

  // Génère les données initiales de coûts
  generateCostData() {
    const nowDate = new Date();
    const months = 60;
    this.data.costs = [];

    // Générer 12 mois de données
    for (let i = 0; i < months; i++) {
      const date = new Date(nowDate);
      date.setMonth(nowDate.getMonth() - (months - i - 1));
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}`;

      // Coût de base avec légère tendance à la hausse
      const baseCost = 5000 + i * 200 + (Math.random() * 1000 - 500);

      // Coût par service
      const servicesCost = {};
      const totalServiceCost = baseCost;
      let allocatedCost = 0;

      // Allouer des coûts à chaque service, sauf le dernier
      for (let j = 0; j < this.baseData.services.length - 1; j++) {
        const service = this.baseData.services[j];
        const percentage = 0.05 + Math.random() * 0.15;
        const serviceCost =
          Math.round(totalServiceCost * percentage * 100) / 100;
        servicesCost[service] = serviceCost;
        allocatedCost += serviceCost;
      }

      // Allouer le reste au dernier service
      const lastService =
        this.baseData.services[this.baseData.services.length - 1];
      servicesCost[lastService] =
        Math.round((totalServiceCost - allocatedCost) * 100) / 100;

      // Ajouter l'entrée de coût
      for (const [svcName, svcCost] of Object.entries(servicesCost)) {
        this.data.costs.push({
          date: yearMonth,
          service: svcName,
          cost: svcCost,
          isAnomaly: Math.random() < 0.1,

          region:
            this.baseData.regions[
              Math.floor(Math.random() * this.baseData.regions.length)
            ],

          team: this.baseData.teams[
            Math.floor(Math.random() * this.baseData.teams.length)
          ],

        environment:
         this.baseData.environments[
          Math.floor(Math.random() * this.baseData.environments.length)
      ],
        });
      }
    }
  }

  // Mise à jour incrémentale des données de coûts
  updateCostData() {
    // Mettre à jour la date
    const now = new Date();
    this.data.lastUpdated = now;

    // On calcule combien de lignes "coût" on veut mettre à jour
    const numServices = this.baseData.services.length;
    const recentCosts = this.data.costs.slice(-3 * numServices);

    // 1) Mettre à jour chaque "costItem" dans un nouveau tableau
    const updatedCosts = this.data.costs.map((costItem) => {
      if (!recentCosts.includes(costItem)) {
        return costItem; // Pas un des "3 derniers mois"
      }

      // On crée un clone du costItem
      const newCostItem = { ...costItem };

      // Variation de ± 5%
      const variationFactor = 1 + (Math.random() * 0.1 - 0.05);
      newCostItem.cost =
        Math.round(newCostItem.cost * variationFactor * 100) / 100;

      // Petite chance de toggler isAnomaly
      if (Math.random() < 0.05) {
        newCostItem.isAnomaly = !newCostItem.isAnomaly;
      }

      return newCostItem;
    });

    // 2) On recrée l'objet data
    this.data = {
      ...this.data,
      costs: updatedCosts,
      lastUpdated: now,
    };

    // 3) On notifie UNE seule fois
    this.notifySubscribers('costs');
  }

  // Génère les données initiales de services
  generateServiceData() {
    this.data.services = [];

    this.baseData.services.forEach((serviceName) => {
      const service = {
        name: serviceName,
        cost: 1000 + Math.random() * 9000,
        usage: Math.floor(Math.random() * 1000),
        efficiency: 50 + Math.random() * 50,
        growth: Math.random() * 30 - 10, // -10% à +20%
        regions: {},
      };

      // Répartition du coût par région
      let remainingCost = service.cost;

      this.baseData.regions.forEach((region, index) => {
        if (index < this.baseData.regions.length - 1) {
          const regionCost =
            Math.round(remainingCost * (0.1 + Math.random() * 0.3) * 100) / 100;
          service.regions[region] = regionCost;
          remainingCost -= regionCost;
        } else {
          // Dernière région obtient le reste
          service.regions[region] = Math.round(remainingCost * 100) / 100;
        }
      });

      this.data.services.push(service);
    });
  }

  // Génère les données initiales d'anomalies
  generateAnomaliesData() {
    this.data.anomalies = [];
    const anomalyCount = 3 + Math.floor(Math.random() * 4); // 3-6 anomalies

    for (let i = 0; i < anomalyCount; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      const service =
        this.baseData.services[
          Math.floor(Math.random() * this.baseData.services.length)
        ];
      const region =
        this.baseData.regions[
          Math.floor(Math.random() * this.baseData.regions.length)
        ];
      const impact = 100 + Math.floor(Math.random() * 900);
      const percentageIncrease = 20 + Math.floor(Math.random() * 80);

      this.data.anomalies.push({
        id: `anomaly-${Date.now()}-${i}`,
        date: date.toISOString().split('T')[0],
        detectedAt: new Date(
          date.getTime() + Math.random() * 86400000
        ).toISOString(),
        service,
        region,
        actualCost: ((impact * (100 + percentageIncrease)) / 100).toFixed(2),
        expectedCost: impact.toFixed(2),
        impact: impact.toFixed(2),
        percentageIncrease,
        status: Math.random() > 0.3 ? 'Unresolved' : 'Resolved',
        rootCauses: [
          {
            name: service,
            impact: 70 + Math.floor(Math.random() * 30),
            reason: this.getRandomReason(service),
            details: this.getRandomDetails(service),
          },
        ],
        affectedAccounts:
          Math.random() > 0.5 ? ['Production'] : ['Production', 'Development'],
      });
    }
  }

  // Mise à jour incrémentale des anomalies
  updateAnomaliesData() {
    // Petite chance de créer une nouvelle anomalie
    if (Math.random() < 0.15) {
      const service =
        this.baseData.services[
          Math.floor(Math.random() * this.baseData.services.length)
        ];
      const region =
        this.baseData.regions[
          Math.floor(Math.random() * this.baseData.regions.length)
        ];
      const impact = 100 + Math.floor(Math.random() * 900);
      const percentageIncrease = 20 + Math.floor(Math.random() * 80);

      this.data.anomalies.push({
        id: `anomaly-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        detectedAt: new Date().toISOString(),
        service,
        region,
        actualCost: ((impact * (100 + percentageIncrease)) / 100).toFixed(2),
        expectedCost: impact.toFixed(2),
        impact: impact.toFixed(2),
        percentageIncrease,
        status: 'Unresolved',
        rootCauses: [
          {
            name: service,
            impact: 70 + Math.floor(Math.random() * 30),
            reason: this.getRandomReason(service),
            details: this.getRandomDetails(service),
          },
        ],
        affectedAccounts:
          Math.random() > 0.5 ? ['Production'] : ['Production', 'Development'],
      });
    }

    // Petite chance de résoudre une anomalie existante
    const unresolvedAnomalies = this.data.anomalies.filter(
      (a) => a.status === 'Unresolved'
    );
    if (unresolvedAnomalies.length > 0 && Math.random() < 0.2) {
      const indexToResolve = Math.floor(
        Math.random() * unresolvedAnomalies.length
      );
      unresolvedAnomalies[indexToResolve].status = 'Resolved';
    }

    // Limite le nombre d'anomalies pour éviter une croissance infinie
    if (this.data.anomalies.length > 15) {
      const resolvedAnomalies = this.data.anomalies.filter(
        (a) => a.status === 'Resolved'
      );
      if (resolvedAnomalies.length > 5) {
        this.data.anomalies = this.data.anomalies.filter(
          (a) =>
            a.status !== 'Resolved' ||
            new Date(a.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );
      }
    }
  }

  // Génère les données initiales de recommandations
  generateRecommendationsData() {
    this.data.recommendations = {
      ec2_rightsizing: [],
      reserved_instances: [],
      savings_plans: [],
      storage_optimization: [],
      idle_resources: [],
    };

    // EC2 Rightsizing
    const instanceTypes = [
      't3.micro',
      't3.small',
      'm5.large',
      'c5.xlarge',
      'r5.2xlarge',
    ];
    const rightSizeTargets = [
      't3.nano',
      't2.micro',
      't3.micro',
      'm5.small',
      'c5.large',
    ];

    for (let i = 0; i < 6 + Math.floor(Math.random() * 5); i++) {
      const instanceIndex = Math.floor(Math.random() * instanceTypes.length);
      const currentType = instanceTypes[instanceIndex];
      const recommendedType = rightSizeTargets[instanceIndex];
      const region =
        this.baseData.regions[
          Math.floor(Math.random() * this.baseData.regions.length)
        ];

      // Utilisation basse pour justifier le rightsizing
      const utilizationMetrics = {
        cpu: Math.floor(Math.random() * 30) + 5,
        memory: Math.floor(Math.random() * 40) + 10,
        network: Math.floor(Math.random() * 20) + 5,
      };

      // Calcul des économies
      const currentCostHourly = 0.02 + Math.random() * 0.5;
      const recommendedCostHourly =
        currentCostHourly * (0.4 + Math.random() * 0.3); // 40-70% du coût actuel
      const monthlySavings = (currentCostHourly - recommendedCostHourly) * 730;

      this.data.recommendations.ec2_rightsizing.push({
        instanceId: `i-${Math.random().toString(36).substring(2, 10)}`,
        currentInstanceType: currentType,
        recommendedInstanceType: recommendedType,
        region: region,
        currentMonthlyCost: (currentCostHourly * 730).toFixed(2),
        recommendedMonthlyCost: (recommendedCostHourly * 730).toFixed(2),
        potentialMonthlySavings: monthlySavings.toFixed(2),
        utilizationMetrics,
        paybackPeriod: 'Immediate',
        confidence:
          Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
      });
    }

    // Savings Plans
    const serviceSavingsPlans = [
      {
        type: 'Compute Savings Plan',
        term: '1 year',
        commitment: '$1000/month',
        currentOnDemandSpend: 1400,
        coveragePercentage: 71,
        savingsRate: 20,
        monthlySavings: 280,
      },
      {
        type: 'EC2 Instance Savings Plan',
        term: '3 years',
        commitment: '$2500/month',
        currentOnDemandSpend: 3600,
        coveragePercentage: 69,
        savingsRate: 40,
        monthlySavings: 1440,
      },
      {
        type: 'SageMaker Savings Plan',
        term: '1 year',
        commitment: '$800/month',
        currentOnDemandSpend: 1100,
        coveragePercentage: 72,
        savingsRate: 25,
        monthlySavings: 275,
      },
    ];

    const numSavingsPlans = 2 + Math.floor(Math.random() * 2);
    this.data.recommendations.savings_plans = this.shuffleArray([
      ...serviceSavingsPlans,
    ]).slice(0, numSavingsPlans);

    // Autres recommandations (version simplifiée)
    this.generateSimplifiedRecommendations();
  }

  // Génère des recommandations simplifiées pour les autres catégories
  generateSimplifiedRecommendations() {
    // Reserved Instances (RI)
    for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
      const instanceType = ['r5.2xlarge', 'm5.large', 'c5.xlarge', 'r5.xlarge'][
        Math.floor(Math.random() * 4)
      ];
      const region =
        this.baseData.regions[
          Math.floor(Math.random() * this.baseData.regions.length)
        ];
      const instanceCount = 2 + Math.floor(Math.random() * 10);
      const term = Math.random() > 0.5 ? '1 year' : '3 years';
      const utilizationRate = 85 + Math.floor(Math.random() * 15);

      const currentMonthlyCost = instanceCount * (100 + Math.random() * 200);
      const riMonthlyCost = currentMonthlyCost * (0.6 + Math.random() * 0.2);
      const monthlySavings = currentMonthlyCost - riMonthlyCost;

      this.data.recommendations.reserved_instances.push({
        instanceType,
        region,
        normalizationFactor: 8,
        instanceCount,
        term,
        paymentOption: ['No Upfront', 'Partial Upfront', 'All Upfront'][
          Math.floor(Math.random() * 3)
        ],
        utilizationRate,
        currentMonthlyCost: currentMonthlyCost.toFixed(2),
        riMonthlyCost: riMonthlyCost.toFixed(2),
        monthlySavings: monthlySavings.toFixed(2),
        annualSavings: (monthlySavings * 12).toFixed(2),
        roi: Math.floor(30 + Math.random() * 30),
      });
    }

    // Storage Optimization
    const storageTypes = [
      {
        type: 'S3 Lifecycle Policy',
        resourceId: 's3://company-analytics-data',
      },
      {
        type: 'S3 Intelligent-Tiering',
        resourceId: 's3://customer-data-backup',
      },
      { type: 'EBS Volume Type Change', resourceId: 'vol-a1b2c3d4e5f6g7h8i' },
      { type: 'EBS Snapshot Archive', resourceId: 'Multiple Snapshots' },
      { type: 'RDS Storage Optimization', resourceId: 'database-1' },
    ];

    for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
      if (i < storageTypes.length) {
        const storage = storageTypes[i];
        const sizeGB = 100 + Math.floor(Math.random() * 1000);
        const currentCost = sizeGB * (0.02 + Math.random() * 0.08);
        const recommendedCost = currentCost * (0.4 + Math.random() * 0.3);
        const monthlySavings = currentCost - recommendedCost;

        this.data.recommendations.storage_optimization.push({
          type: storage.type,
          resourceId: storage.resourceId,
          currentStorage: {
            type: this.getStorageType(storage.type, false),
            sizeGB,
            monthlyCost: currentCost.toFixed(2),
          },
          recommendedStorage: {
            type: this.getStorageType(storage.type, true),
            eligibleGB: Math.floor(sizeGB * (0.7 + Math.random() * 0.3)),
            monthlyCost: recommendedCost.toFixed(2),
          },
          monthlySavings: monthlySavings.toFixed(2),
          implementationComplexity: ['Low', 'Medium', 'High'][
            Math.floor(Math.random() * 3)
          ],
        });
      }
    }

    // Idle Resources
    const idleResourceTypes = [
      { type: 'Idle EC2 Instance', resourceId: 'i-0123456789abcdef0' },
      { type: 'Unattached EBS Volume', resourceId: 'vol-0123456789abcdef0' },
      {
        type: 'Idle Load Balancer',
        resourceId:
          'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-lb/1234567890123456',
      },
      { type: 'Unused Elastic IP', resourceId: 'eipalloc-0123456789abcdef0' },
      {
        type: 'Idle RDS Instance',
        resourceId: 'db-ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      },
    ];

    for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
      if (i < idleResourceTypes.length) {
        const resource = idleResourceTypes[i];
        const region =
          this.baseData.regions[
            Math.floor(Math.random() * this.baseData.regions.length)
          ];
        const idlePeriod = `${5 + Math.floor(Math.random() * 45)} days`;
        const monthlyCost = 5 + Math.random() * 150;

        const idleResource = {
          type: resource.type,
          resourceId: resource.resourceId,
          region,
          state: 'running',
          idlePeriod,
          monthlyCost: monthlyCost.toFixed(2),
          recommendedAction: 'Terminate',
        };

        // Ajout de métriques spécifiques selon le type de ressource
        if (resource.type.includes('EC2') || resource.type.includes('RDS')) {
          idleResource.cpuUtilization = `${(Math.random() * 3).toFixed(1)}%`;
        }

        if (resource.type.includes('Load Balancer')) {
          idleResource.requestsPerMinute = '0';
        }

        if (resource.type.includes('EBS')) {
          idleResource.sizeGB = 50 + Math.floor(Math.random() * 500);
        }

        this.data.recommendations.idle_resources.push(idleResource);
      }
    }
  }

  // Mise à jour incrémentale des recommandations
  updateRecommendationsData() {
    // Mise à jour des éc2_rightsizing
    this.data.recommendations.ec2_rightsizing.forEach((recommendation) => {
      recommendation.utilizationMetrics.cpu = Math.max(
        1,
        Math.min(
          99,
          recommendation.utilizationMetrics.cpu + (Math.random() * 6 - 3)
        )
      );
      recommendation.utilizationMetrics.memory = Math.max(
        1,
        Math.min(
          99,
          recommendation.utilizationMetrics.memory + (Math.random() * 6 - 3)
        )
      );

      const variation = 1 + (Math.random() * 0.1 - 0.05);
      const newSavings =
        parseFloat(recommendation.potentialMonthlySavings) * variation;
      recommendation.potentialMonthlySavings = newSavings.toFixed(2);

      const currentCost = parseFloat(recommendation.currentMonthlyCost);
      recommendation.currentMonthlyCost = (
        currentCost *
        (1 + (Math.random() * 0.06 - 0.03))
      ).toFixed(2);
      recommendation.recommendedMonthlyCost = (
        parseFloat(recommendation.currentMonthlyCost) - newSavings
      ).toFixed(2);
    });

    // Mise à jour des Savings Plans
    this.data.recommendations.savings_plans.forEach((plan) => {
      plan.coveragePercentage = Math.max(
        50,
        Math.min(95, plan.coveragePercentage + (Math.random() * 6 - 3))
      );

      const variation = 1 + (Math.random() * 0.08 - 0.04);
      plan.monthlySavings = Math.round(plan.monthlySavings * variation);
      plan.currentOnDemandSpend = Math.round(
        (plan.monthlySavings / (plan.savingsRate / 100)) *
          (100 / plan.coveragePercentage)
      );
    });

    // Petite chance de nouvelle reco de rightsizing
    if (Math.random() < 0.1) {
      const instanceTypes = [
        't3.micro',
        't3.small',
        'm5.large',
        'c5.xlarge',
        'r5.2xlarge',
      ];
      const rightSizeTargets = [
        't3.nano',
        't2.micro',
        't3.micro',
        'm5.small',
        'c5.large',
      ];
      const instanceIndex = Math.floor(Math.random() * instanceTypes.length);

      this.data.recommendations.ec2_rightsizing.push({
        instanceId: `i-${Math.random().toString(36).substring(2, 10)}`,
        currentInstanceType: instanceTypes[instanceIndex],
        recommendedInstanceType: rightSizeTargets[instanceIndex],
        region:
          this.baseData.regions[
            Math.floor(Math.random() * this.baseData.regions.length)
          ],
        currentMonthlyCost: (Math.random() * 200 + 50).toFixed(2),
        recommendedMonthlyCost: (Math.random() * 100 + 20).toFixed(2),
        potentialMonthlySavings: (Math.random() * 100 + 30).toFixed(2),
        utilizationMetrics: {
          cpu: Math.floor(Math.random() * 30) + 5,
          memory: Math.floor(Math.random() * 40) + 10,
          network: Math.floor(Math.random() * 20) + 5,
        },
        paybackPeriod: 'Immediate',
        confidence:
          Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
      });
    }

    // Limite le nombre de recommandations EC2
    if (this.data.recommendations.ec2_rightsizing.length > 15) {
      this.data.recommendations.ec2_rightsizing =
        this.data.recommendations.ec2_rightsizing.slice(-15);
    }
  }

  // Recalcule les totaux et statistiques globales (ex: totalCost, efficiency)
  calculateTotals() {
    if (this.data.costs.length > 0) {
      // Trouver la date du dernier item dans this.data.costs
      const lastDate = this.data.costs[this.data.costs.length - 1].date;

      // Calculer la somme pour ce lastDate
      const sumForLastDate = this.data.costs
        .filter((cItem) => cItem.date === lastDate)
        .reduce((acc, cItem) => acc + cItem.cost, 0);

      this.data.totalCost = Math.round(sumForLastDate * 100) / 100;
    } else {
      this.data.totalCost = 0;
    }

    // Petite variation aléatoire
    const variation = 1 + (Math.random() * 0.06 - 0.03);
    this.data.totalCost =
      Math.round(this.data.totalCost * variation * 100) / 100;

    // Mettre à jour l'efficacité globale
    this.data.efficiency = Math.min(
      99,
      Math.max(60, 75 + (Math.random() * 10 - 5))
    );

    // Mise à jour horodatage
    this.data.lastUpdated = new Date();
  }

  // FONCTIONS UTILITAIRES
  getRandomReason(service) {
    const reasons = {
      EC2: [
        "Augmentation inattendue du nombre d'instances",
        "Lancement d'instances de grande taille pour le traitement par lots",
        'Instances non terminées après les tests',
      ],
      S3: [
        'Volume exceptionnel de requêtes GET',
        'Augmentation des données stockées',
        'Transfert de données cross-region important',
      ],
      RDS: [
        'Configuration des sauvegardes modifiée',
        'Mise à niveau vers des instances plus puissantes',
        'Création non planifiée de répliques de lecture',
      ],
      Lambda: [
        "Pic d'exécutions de fonctions",
        "Durée d'exécution prolongée",
        'Erreurs provoquant des tentatives multiples',
      ],
      CloudFront: [
        'Trafic exceptionnel vers la distribution',
        'Changement du modèle de cache',
        'Attaque DDoS mitigée',
      ],
    };

    const serviceReasons = reasons[service] || [
      'Utilisation anormale du service',
      "Pics d'activité non planifiés",
      'Configuration modifiée récemment',
    ];

    return serviceReasons[Math.floor(Math.random() * serviceReasons.length)];
  }

  getRandomDetails(service) {
    const details = {
      EC2: [
        "ID d'instance: i-09a8d76b5c4f3e2a1",
        'Type: m5.2xlarge',
        'Région: us-east-1',
      ],
      S3: [
        'Bucket: data-analytics-prod',
        '153GB transférés vers us-west-2',
        '2.4M requêtes GET',
      ],
      RDS: [
        'Instance: postgres-main-db',
        'Stockage provisionné augmenté à 500GB',
        'IOPS modifiées: 1000 → 3000',
      ],
      Lambda: [
        'Fonction: data-processor',
        'Durée moyenne: 890ms',
        '4.5M invocations',
      ],
      CloudFront: [
        'Distribution: E1ABCDE23FGHI4',
        'Trafic: 2.4TB',
        'Origine: us-east-1 S3 + EC2',
      ],
      DynamoDB: [
        'Table: user-sessions',
        'Capacité de lecture: 3000 RCU',
        "Capacité d'écriture: 1000 WCU",
      ],
      ECS: ['Cluster: api-cluster', 'Tâches: 85 instances', 'CPU: 256 unités'],
    };

    // On peut renvoyer un sous-ensemble de ces détails, ou tout
    return details[service] || ['Aucun détail particulier'];
  }

  // Petit helper pour mélanger un tableau
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Pour la logique "getStorageType" si nécessaire:
  getStorageType(baseType, recommended) {
    // Ex. pour illustrer, on fait juste renvoyer un string
    if (!recommended) return baseType.includes('S3') ? 'S3 Standard' : baseType;
    if (baseType === 'S3 Lifecycle Policy') return 'S3 Infrequent Access';
    if (baseType === 'S3 Intelligent-Tiering') return 'S3 Intelligent-Tiering';
    if (baseType === 'EBS Volume Type Change') return 'EBS gp3';
    if (baseType === 'EBS Snapshot Archive') return 'Snapshot Archive';
    if (baseType === 'RDS Storage Optimization') return 'RDS gp3';
    return baseType;
  }
}

export { DataGeneratorService };
