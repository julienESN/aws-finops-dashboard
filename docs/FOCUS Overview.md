# FinOps & FOCUS – Mémo Complet

Ce document regroupe les informations clés sur la spécification FOCUS et les capacités FinOps, ainsi que la bibliothèque de cas d'utilisation qui clarifie les défis et les données nécessaires à la réussite des pratiques FinOps.

---

## 1. FOCUS Overview – Lesson 1 of 4

### Contexte et Défis
- **Données et Complexité :**  
  - Pour exploiter pleinement les capacités FinOps, il est indispensable d’utiliser des données issues de la facturation cloud.  
  - La grande variété des formats et des fournisseurs complique l’ingestion, la normalisation et l’analyse de ces données pour produire des rapports cohérents.

### Qu'est-ce que FOCUS ?
- **Définition :**  
  FOCUS (FinOps Open Cost & Usage Specification) est une spécification technique et un toolkit qui vise à standardiser les données de coût, d’utilisation et de facturation du cloud.
- **Objectifs :**  
  - Rendre les données de facturation plus cohérentes et utilisables (Cloud, SaaS, sources internes).
  - Permettre à toutes les parties prenantes de parler le même langage pour prendre de meilleures décisions.
  - Simplifier les processus de chargeback, budgétisation, prévisions et allocation.

### Création et Adoption
- **Origine Collaborative :**  
  - Le développement de FOCUS est le résultat d’un effort commun entre de nombreux membres, dont des praticiens expérimentés, des fournisseurs et des prestataires cloud.
  - En tant que spécification open source, FOCUS offre transparence, flexibilité et agilité.
- **Mise en Œuvre :**  
  1. Développer une spécification détaillant les dimensions et métriques clés pour la gestion des coûts.
  2. Collaborer avec la communauté pour convertir les formats de facturation existants.
  3. Travailler avec les fournisseurs pour intégrer nativement le support FOCUS.

---

## 2. Bibliothèque de Cas d'Utilisation FinOps

### Qu'est-ce que la Bibliothèque de Cas d'Utilisation ?
- **Objectif :**  
  Clarifier les défis que FOCUS peut relever en identifiant les cas d'utilisation essentiels.  
  - Chaque cas d'utilisation présente les données et KPI requis pour une pratique FinOps réussie (allocation, détection des anomalies, etc.).
  - Elle détaille également les requêtes SQL, les colonnes et les personas concernés.
- **Bac à Sable FOCUS :**  
  - Un environnement sandbox permettant aux praticiens FinOps d'exécuter des requêtes SQL sur des données de facturation réelles (anonymisées).
  - Objectif : Se familiariser avec l'apparence des données FOCUS et comprendre les informations qu’elles génèrent.

### Comment FOCUS Pose les Bases
- Fournit des requêtes et des recommandations pour collecter les données pertinentes.
- Simplifie les étapes nécessaires à la mise en place d'une pratique FinOps efficace.

---

## 3. Capacités FinOps et Domaines Associés

Chaque capacité FinOps est associée à un domaine spécifique, illustrant comment les données et les pratiques standardisées de FOCUS peuvent transformer la gestion des coûts cloud.

### Domain: Understand Usage & Cost
- **Allocation :**  
  Définir des stratégies pour attribuer et partager les coûts cloud via des comptes, tags, labels et autres métadonnées, créant ainsi une responsabilité au sein des équipes et projets.
- **Anomaly Management :**  
  Détecter, identifier, clarifier, alerter et gérer les événements inattendus liés aux coûts cloud afin de minimiser leur impact sur l’entreprise.
- **Reporting & Analytics :**  
  Examiner et présenter les données cloud pour obtenir des insights sur les tendances d’utilisation et de dépenses.
- **Data Ingestion :**  
  Collecter, transférer, traiter, transformer et corréler diverses données afin de créer un référentiel interrogeable et contextualisé.

### Domain: Optimize Usage & Cost
- **Architecting for Cloud :**  
  Intégrer dans les choix d’ingénierie et de produit non seulement les besoins opérationnels mais aussi la viabilité financière et la durabilité.
- **Benchmarking :**  
  Comparer des indicateurs de performance clés (KPI) en interne et avec d'autres organisations pour optimiser la valeur du cloud.
- **Cloud Sustainability :**  
  Prendre des décisions en considérant à la fois l’impact environnemental et les objectifs de durabilité de l’organisation.
- **Rate Optimization :**  
  Optimiser les tarifs payés pour les ressources cloud utilisées.
- **Licensing & SaaS :**  
  Comprendre et optimiser l’impact des licences logicielles et des investissements SaaS sur la structure de valeur cloud.

### Domain: Quantify Business Value
- **Budgeting :**  
  Processus stratégique et continu de définition de limites, de suivi et de gestion des dépenses cloud en alignement avec les objectifs de l’entreprise.
- **Forecasting :**  
  Créer un modèle des coûts et de la valeur futurs en se basant sur des méthodes statistiques, des historiques de dépenses et des métriques pertinentes.
- **Unit Economics :**  
  Développer et suivre des métriques pour comprendre comment l'utilisation et la gestion du cloud influencent la valeur des produits ou services de l’organisation.
- **Planning & Estimating :**  
  Évaluer les coûts et la valeur potentiels des charges de travail dans le cloud selon différents modèles.

### Domain: Manage the FinOps Practice
- **FinOps Assessment :**  
  Évaluer l'efficacité de la pratique FinOps et identifier les axes d'amélioration en fonction des objectifs organisationnels.
- **FinOps Education & Enablement :**  
  Développer une compréhension commune des concepts, terminologies et pratiques FinOps parmi tous les intervenants.
- **FinOps Practice Operations :**  
  Ensemble des activités nécessaires pour établir et gérer une pratique FinOps au sein d'une organisation.
- **FinOps Tools & Services :**  
  Utiliser des outils et services (qu’ils soient fournis par les CSP ou tiers) pour soutenir les capacités FinOps.
- **Intersecting Disciplines :**  
  Coordonner avec des équipes et disciplines alliées pour une collaboration efficace avec la pratique FinOps.
- **Invoicing & Chargeback :**  
  Gérer les factures cloud et mettre en place des mécanismes de refacturation officiels entre la pratique FinOps et les équipes financières.
- **Onboarding Workloads :**  
  Orchestrer la migration des systèmes vers ou entre des environnements cloud tout en assurant la transparence des coûts et la rentabilité.
- **Policy & Governance :**  
  Établir des politiques, contrôles et mécanismes de gouvernance pour aligner l'utilisation du cloud avec les objectifs commerciaux et réglementaires.

---

## Conclusion

La standardisation apportée par FOCUS, combinée aux diverses capacités FinOps, permet de transformer une masse de données disparates en informations claires et exploitables. Cela conduit à :
- Une meilleure compréhension et gestion des coûts cloud.
- Des processus financiers simplifiés.
- Une collaboration accrue entre équipes grâce à une terminologie et des pratiques unifiées.
- Des décisions d’ingénierie et de produit plus éclairées, intégrant des considérations financières et de durabilité.

Ce mémo offre une vue d’ensemble complète des enjeux, des solutions et des pratiques FinOps dans un environnement cloud en constante évolution.

## Use Case 

https://focus.finops.org/use-cases/?prod_use_cases%5BrefinementList%5D%5Brelated_capabilities.post_title%5D%5B0%5D=Reporting%20%26%20Analytics#modal-column-14650
https://github.com/FinOps-Open-Cost-and-Usage-Spec

## 4. Données FOCUS – Leçon 3 sur 4

### Exemple de Données de FOCUS

- **Exemple 1 : Colonne Coût facturé**  
  Le coût facturé représente les frais servant de base à la facturation. Il inclut l'impact de tous les tarifs réduits et remises, hors amortissement des achats (ponctuels ou récurrents) payés pour couvrir les futurs frais éligibles. Ce coût est exprimé dans la devise de facturation et est utilisé pour des fonctions FinOps telles que l'allocation, la budgétisation et le rapprochement des factures.

- **Exemple 2 : Colonne de catégorie de prix**  
  La catégorie de tarification décrit le modèle appliqué au coût au moment de l'utilisation ou de l'achat. Elle distingue les coûts au tarif catalogue des tarifs réduits, mettant ainsi en évidence des opportunités d'optimisation (par exemple, augmenter la couverture des remises basées sur l'engagement).

- **Exemple 3 : Attribut de format de date/heure**  
  - **Exigences :**  
    - Toutes les colonnes capturant des valeurs de date/heure doivent suivre la norme ISO 8601.
    - Les valeurs doivent être en UTC pour éviter toute ambiguïté.
    - Le format doit respecter la forme étendue ISO 8601 avec décalage UTC, par exemple `AAAA-MM-JJTHH:mm:ssZ`.
    - La date et l'heure doivent être séparées par la lettre "T" et se terminer par "Z".

### Données d'Échantillon Supplémentaires
- Des ensembles de données supplémentaires (anonymisés et réels) sont disponibles sur GitHub pour explorer, tester des outils et générer des rapports FOCUS.

### Collecte et Adoption des Ensembles de Données FOCUS
- **Collecte :**  
  Pour commencer à utiliser les données FOCUS, vous pouvez collecter des ensembles de données auprès des fournisseurs cloud (Amazon Web Services, Microsoft Azure, Google Cloud, Oracle Cloud, etc.) selon les procédures indiquées par chacun.
  
- **Convertisseur de Données FOCUS :**  
  Un outil en ligne de commande permet de convertir les fichiers de données de facturation des principaux fournisseurs vers le schéma commun FOCUS. Ce convertisseur est conçu pour :
  - Traiter des fichiers volumineux et les formats natifs des fournisseurs.
  - Encapsuler la compréhension de la spécification FOCUS.
  - Adapter la conversion lorsque certaines données attendues ne sont pas présentes.
  - Être modulaire pour intégrer de nouveaux types de données.

- **Demande de Données FOCUS auprès des Fournisseurs :**  
  Si votre fournisseur (cloud ou SaaS) ne propose pas de données conformes à FOCUS, discutez avec votre chargé de clientèle pour aligner les formats de données sur la spécification FOCUS.

> FOCUS est conçu pour rendre les données de coût, d'utilisation et de facturation du cloud plus transparentes et standardisées, facilitant ainsi l'adoption et l'optimisation par toutes les organisations.
