// src/utils/finops/constants.js
// Constantes utilisées dans le dashboard FinOps

export const COLORS = {
  blue: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
  green: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'],
  orange: ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'],
  purple: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'],
  red: ['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2'],
  gray: ['#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6'],
};

export const SERVICE_DESCRIPTIONS = {
  EC2: 'Elastic Compute Cloud - Location de serveurs virtuels dans le cloud',
  S3: "Simple Storage Service - Stockage d'objets sécurisé, évolutif et durable",
  RDS: 'Relational Database Service - Services de bases de données relationnelles gérées',
  Lambda: 'Exécution de code sans serveur en réponse à des événements',
  CloudFront: 'CDN mondial qui accélère la distribution de contenu web',
  ECS: "Elastic Container Service - Service d'orchestration de conteneurs",
  DynamoDB: 'Base de données NoSQL entièrement gérée à hautes performances',
  EBS: 'Elastic Block Store - Stockage persistant pour les instances EC2',
  SageMaker:
    'Plateforme pour créer, entraîner et déployer des modèles de machine learning',
};

export const SERVICE_COLORS = {
  EC2: COLORS.orange[0],
  S3: COLORS.blue[0],
  RDS: COLORS.green[0],
  Lambda: COLORS.purple[0],
  CloudFront: COLORS.blue[3],
  ECS: COLORS.green[3],
  DynamoDB: COLORS.red[0],
};

export const REGION_COLORS = {
  'us-east-1': COLORS.blue[0],
  'us-west-1': COLORS.green[0],
  'eu-west-1': COLORS.orange[0],
  'eu-central-1': COLORS.purple[0],
  'ap-southeast-1': COLORS.red[0],
};

export const REGION_DESCRIPTIONS = {
  'us-east-1':
    "Virginie du Nord (Est des États-Unis) - Région principale et la plus ancienne d'AWS",
  'us-west-1':
    'Californie (Ouest des États-Unis) - Région pour la côte ouest américaine',
  'us-west-2':
    'Oregon (Ouest des États-Unis) - Région à faible latence pour la côte ouest avec de nombreux services',
  'eu-west-1': "Irlande (Europe de l'Ouest) - Principale région européenne",
  'eu-central-1':
    "Francfort (Europe centrale) - Région allemande conforme aux règles de l'UE",
  'ap-southeast-1':
    "Singapour (Asie-Pacifique) - Principale région d'Asie du Sud-Est",
  'sa-east-1':
    "São Paulo (Amérique du Sud) - Région brésilienne pour l'Amérique latine",
};

export const TEAM_DESCRIPTIONS = {
  Operations:
    "Équipe chargée de la gestion des opérations quotidiennes de l'infrastructure cloud",
  IT: 'Équipe informatique responsable du support technique et de la maintenance des systèmes',
  Research:
    'Équipe de recherche qui explore de nouvelles technologies et innovations',
  Sales: 'Équipe commerciale responsable des ventes et des relations clients',
  Marketing:
    'Équipe responsable des campagnes promotionnelles et de la stratégie de marque',
  Engineering:
    "Équipe d'ingénierie qui développe et maintient les applications et services",
  'Data Science':
    "Équipe spécialisée dans l'analyse de données et le machine learning",
};

// Icônes SVG pour les KPIs
export const ICONS = {
  cost: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
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
  efficiency: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
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
  ),
  monthly: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
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
  calendar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
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
  chevronDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
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
  ),
};

// Noms des mois français abrégés
export const MONTH_NAMES = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Déc',
];
