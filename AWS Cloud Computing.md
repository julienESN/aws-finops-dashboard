# AWS Cloud Computing - Mémo des concepts clés

## Définition du Cloud Computing
- Mise à disposition de ressources informatiques à la demande via Internet
- Paiement à l'utilisation (pas de paiement à l'avance)
- Types de ressources: calcul, mise en réseau, stockage, analytique, etc.

## Amazon EC2 (Elastic Compute Cloud)
- Serveurs virtuels appelés "instances EC2"
- Mise en service et arrêt dynamiques
- Familles d'instances selon les besoins:
  - **À usage général**: équilibre entre calcul, mémoire et réseau
  - **Optimisées pour le calcul**: idéales pour les charges de travail de traitement par lots et processeurs hautes performances
  - **Optimisées pour la mémoire**: adaptées au traitement de grands jeux de données en mémoire (bases de données hautes performances)
  - **Calcul accéléré**: pour les charges de travail utilisant des accélérateurs matériels
  - **Optimisées pour le stockage**: pour accès séquentiel élevé à de grands jeux de données locaux

### Mise à l'échelle des instances EC2
- **Verticale**: redimensionnement de l'instance
- **Horizontale**: lancement de nouvelles instances
- **Auto Scaling**: configuration automatique de la mise à l'échelle horizontale
  - Ajout/suppression automatique d'instances selon la demande
  - Différent d'Elastic Load Balancing

### Elastic Load Balancer
- Distribution du trafic entrant entre les instances
- Garantit qu'aucune instance n'a à supporter seule la charge de travail complète
- Empêche la surexploitation des ressources

### Modèles de tarification EC2
- **À la demande**: flexible, sans contrat
- **Spot**: utilisation de capacité inutilisée à prix réduit
  - Option la plus économique pour les charges de travail pouvant résister aux interruptions
  - Idéal pour les charges de travail temporaires (inférieures à 1 an)
- **Instances réservées**: contrat pour des prix réduits avec engagement d'utilisation
  - Durées de contrat disponibles: 1 an ou 3 ans uniquement (pas de 2, 4 ou 5 ans)
  - Plus économique pour les charges de travail prévisibles à long terme
- **Instances dédiées**: instances exécutées sur du matériel dédié à un seul client
  - Coût plus élevé que les options sur matériel partagé
  - Utilisées pour des exigences de conformité ou de licence spécifiques
- **Savings Plans**: engagement de dépense horaire
  - S'applique aussi à AWS Lambda et AWS Fargate

## Services de messagerie AWS
### Amazon SQS (Simple Queue Service)
- Découplage des composants d'un système
- Messages conservés en file d'attente jusqu'au traitement/suppression

### Amazon SNS (Simple Notification Service)
- Envoi de messages (emails, SMS, notifications push, requêtes HTTP)
- Messages publiés envoyés à tous les abonnés

## Autres services de calcul AWS
### Services de conteneurs
- **Amazon ECS** (Elastic Container Service)
  - Service d'orchestration de conteneurs propriétaire AWS
  - Plus simple à configurer et à utiliser
  - Intégration native avec d'autres services AWS
  - Idéal pour les applications conteneurisées qui n'ont pas besoin des fonctionnalités complètes de Kubernetes
- **Amazon EKS** (Elastic Kubernetes Service)
  - Service géré Kubernetes (standard open-source)
  - Plus complexe mais offre plus de flexibilité et de portabilité
  - Compatible avec l'écosystème Kubernetes existant
  - Idéal pour les applications déjà sur Kubernetes ou nécessitant ses fonctionnalités avancées
- Les deux sont des outils d'orchestration de conteneurs

### AWS Fargate
- Exécution de conteneurs sur plateforme de calcul sans serveur

### AWS Lambda
- Téléchargement et exécution de code selon des déclencheurs
- Paiement uniquement lors de l'exécution du code
- Pas de conteneurs ou machines virtuelles à gérer
