# 📘 Fiche Mémo – Certification FinOps Engineer

---

## 🧠 MODULE 1 : Pourquoi suis-je ici ? (Why You're Here)

### 🎯 Objectif

FinOps permet aux ingénieurs de transformer les contraintes budgétaires en opportunités. Grâce à la collaboration entre tech, finance et business, on prend des décisions cloud **éclairées**, **rapides**, et **efficaces**.

### 📌 Définitions importantes

- **FinOps** = Discipline + Culture de gestion financière du Cloud.
- Basée sur **la collaboration**, **la responsabilité**, et **l’optimisation**.

### 🔧 Deux leviers d’optimisation

- **Optimisation d’usage** : arrêter ce qui n’est pas utilisé.
- **Optimisation des taux** : payer le minimum pour ce qui tourne.

### 💡 Responsabilité des ingénieurs

- Vous avez **le pouvoir de déclencher des dépenses** dans le Cloud.
- Vous devez chercher **la meilleure architecture au bon prix**.
- La **valeur métier** est votre boussole.

### 🔑 Les 6 principes FinOps

1. Les équipes doivent **collaborer**.
2. Tout le monde prend **possession** de sa consommation Cloud.
3. Une équipe **centralisée** pilote FinOps.
4. Les **rapports doivent être accessibles et en temps réel**.
5. Les décisions sont basées sur la **valeur métier**.
6. Profitez du modèle **coût/usage variable** du Cloud.

> 💬 "Dans le Cloud, on ne paie pas ce qu’on utilise, mais ce qui est **en fonctionnement**."

### 📈 Pourquoi FinOps compte pour les ingénieurs

- Coût = un **indicateur clé** de performance produit.
- La maîtrise des coûts → + d’**innovation**, + de **budget libéré**.
- FinOps = une compétence valorisée et différenciante.

---

## 🌩️ MODULE 2 : Le Cloud change l’informatique

### 🕰️ Avant le Cloud – modèle traditionnel

- Dépenses fixes, visibles à l’avance.
- Achat centralisé via finance et achats.
- Surdimensionnement courant.
- Cycles d’approvisionnement longs.

### ☁️ Avec le Cloud

- Les ingénieurs peuvent **acheter avec du code**.
- Finance perd en visibilité : dépenses **après-coup**.
- Dépenses **dynamiques**, **variables**, **complexes à prévoir**.

### 🔧 Modèles de consommation Cloud

| Modèle                    | Description                              | Avantages           | Limites            |
| ------------------------- | ---------------------------------------- | ------------------- | ------------------ |
| **Centralisé**            | Une équipe gère les actions cloud        | Contrôle clair      | Innovation limitée |
| **Plateforme partagée**   | API/outil fourni par une équipe centrale | Liberté encadrée    | Complexité         |
| **Entièrement distribué** | Chaque équipe gère ses ressources cloud  | Rapidité, autonomie | Risque de dérive   |

⚠️ Les entreprises combinent parfois plusieurs modèles selon les besoins.

---

## 🔄 MODULE 3 : Développement de FinOps

### 🧠 Pourquoi FinOps est né

- DevOps + Cloud ont donné plus de pouvoir d'achat aux devs.
- Il fallait un **nouveau modèle** qui favorise la **collaboration**.
- FinOps rend **chaque équipe responsable de ses coûts**.

### ✅ Ce que permet FinOps

- Attribution des **coûts au bon produit** ou propriétaire.
- Visualisation en **temps réel**.
- **Décisions alignées** sur coût, rapidité et qualité.

### 📊 Résultats du rapport FinOps 2023

- Principal défi : **Donner les moyens aux ingénieurs d’agir**.
- L’ingénieur joue un rôle central dans la réussite FinOps.

---

## 🚀 MODULE 4 : Passer au Cloud

### 🎯 Le vrai atout du Cloud

- Ce n’est **pas que l’économie**.
- Ce sont **l’échelle**, **l’agilité**, et **l’innovation**.

### ⚠️ Le "syndrome des poches profondes"

- On vous dit : « Ne vous souciez pas des coûts »
- 👉 Mauvais signe ! Demandez des contraintes dès le départ.

### 🧩 La puissance des contraintes

- Les **limites stimulent l’innovation** (comme un haïku ou une recette imposée).
- Exemples :
  - Finances : « Respecte ce budget, et fais ce que tu veux. »

### 🤝 Impact sur les autres

- Les services achats et finance doivent aussi **apprendre le Cloud**.
- Parfois, **peu de compétences techniques**, ce qui crée des frictions.

---

## 💸 MODULE 5 : Le projet de loi sur le Cloud

### 📉 Complexité de la facturation Cloud

- Les factures cloud sont complexes, détaillées et dynamiques.
- L’équation clé : **Utilisation x Tarif = Coût**.
- Exemple : 400 instances M6i.large à 0,096 $/heure = +240k $/an.
- Même **quelques centimes économisés/mois** → gros gains à long terme.

### 🕓 La variable "temps"

- Les mois n’ont pas tous la même durée → attention aux comparaisons !
- Mars ≠ Février → ne pas se faire piéger par les effets calendaires.

---

## 📊 MODULE 6 : Sources de données FinOps

### 📁 Données clés à collecter :

1. **Facturation Cloud Public** : granularité, marquage, SKU, coûts, remises.
2. **Tarification Cloud Public** : tarifs à la demande + remises.
3. **Balisage** : métadonnées → mapping vers d’autres datasets internes.
4. **CMDB** : structure & propriété des services → lien avec usage Cloud.
5. **Centres de coûts** : projets, équipes, départements.
6. **Organisation / RH** : pour relier coût ↔ responsable métier.
7. **Budgets Cloud** : prévisions, budgets par activité.
8. **Données d’usage/performance** : monitoring pour optimiser (CPU, RAM, trafic…).

> 🎓 Exemple : Disney utilise les données multi-cloud pour piloter ses économies FinOps.

---

## 🔧 MODULE 7 : Les deux leviers fondamentaux

### 1. **Réduire la consommation** (éviter les coûts)

- Supprimer les ressources inutiles
- Redimensionner les ressources
- Arrêter les environnements hors horaires

### 2. **Payer moins cher** (réduction des tarifs)

- Plans d’économies, remises, instances réservées
- Identifier avec l’équipe FinOps le modèle optimal

🎯 Même des **optimisations minimes** peuvent produire des effets composés importants.

---

## 💡 MODULE 8 : Se concentrer – FOCUS

### 🔍 Pourquoi FOCUS ?

> FOCUS = **FinOps Open Cost & Usage Specification**

C’est une **spécification ouverte**, indépendante des fournisseurs, pour les données de facturation cloud, SaaS et internes. Elle vise à **simplifier, normaliser et rendre cohérente** l'analyse des coûts et de l’utilisation dans le cloud.

### 🎯 Objectifs de FOCUS

- Uniformiser les données de facturation, quel que soit le fournisseur.
- Simplifier la génération de rapports, de prévisions, de rétrofacturation.
- Permettre **une meilleure compréhension des coûts**, une meilleure collaboration et **des compétences plus transférables** entre clouds/outils.

### 📊 Pourquoi c’est important ?

- Réduit la complexité de l’analyse multi-cloud.
- Favorise la transparence et le **partage ouvert des données**.
- Accélère la prise de décision et le **pilotage des coûts**.
- Permet des **requêtes unifiées** sur différents environnements.

### 🧩 Comment ça fonctionne ?

1. **Définir** les dimensions et métriques essentielles.
2. **Convertir** les formats de facturation vers un format commun (FOCUS).
3. **Impliquer** les fournisseurs (CSP, SaaS) pour un support natif.

### 🚀 Avantages concrets pour les ingénieurs :

- Meilleure compréhension des coûts dès l’architecture.
- Comparaisons simplifiées entre fournisseurs (« comparer des pommes avec des pommes »).
- Structures cohérentes → plus de mobilité professionnelle.

### 🧠 Témoignages et retours :

- **Walmart**, **Google**, **Microsoft**, **Oracle** soutiennent activement le projet.
- Exemples d’utilisation en production chez de grands groupes.
- Page officielle FOCUS : [focus.finops.org](https://focus.finops.org)

---

## ♻️ MODULE 9 : Durabilité et Cloud

### 🌍 Pourquoi la durabilité dans le cloud est importante

- Forte pression des **investisseurs, clients, gouvernements et employés**.
- Le cloud permet une **mesure plus précise** de l’empreinte carbone.
- Le **coût carbone** des ressources cloud devient un indicateur à suivre.

### 📌 Définition

La **durabilité dans le cloud** consiste à utiliser les services cloud de manière écologiquement et économiquement responsable.

Cela inclut :

- L’impact de l’électricité et du refroidissement des datacenters.
- Les émissions sur le cycle de vie des serveurs.
- Le gaspillage des ressources cloud non utilisées.

---

### 🧠 Concepts clés

#### ☁️ Emissions de carbone dans le cloud : les 3 scopes

| Scope   | Description                                                          |
| ------- | -------------------------------------------------------------------- |
| Scope 1 | Emissions directes (ex. diesel dans les datacenters)                 |
| Scope 2 | Emissions indirectes liées à la production d’énergie utilisée        |
| Scope 3 | Emissions en amont/aval hors de l’entreprise (ex. fournisseur cloud) |

> ✅ Le Scope 3 représente souvent **80-97%** des émissions totales.

---

### 🛠️ Rôle des ingénieurs dans la durabilité

- Optimiser les charges pour **réduire le gaspillage**.
- Utiliser des architectures plus **élastiques**.
- Choisir des services cloud plus **efficaces énergétiquement**.
- Intégrer la **durabilité comme critère NFR** (Non Functional Requirement).

---

### 🤝 Rôles croisés

| FinOps                                                         | Ingénieur                              | Développement durable            |
| -------------------------------------------------------------- | -------------------------------------- | -------------------------------- |
| Travailler avec les fournisseurs pour exposer les scopes 1/2/3 | Éviter les ressources surdimensionnées | Fournir les KPI environnementaux |
| Collaborer avec Finance/IT                                     | Déployer des solutions élastiques      | Suivre les objectifs ESG         |
| Intégrer la durabilité dans les décisions d’achat              | Réduire le code inutile, rationaliser  | Promouvoir des pratiques sobres  |

---

### ⚖️ Décisions & compromis

- Une région cloud peut être **moins chère mais plus polluante**.
- Acheter des instances réservées réduit le coût, **mais pas forcément les émissions**.
- Le **coût ne doit pas être le seul critère** → l'impact environnemental compte.

---

### 🧩 Exemples de pistes d’optimisation durable

- Réduction des **instances de calcul surdimensionnées**
- Suppression des **instances orphelines**
- **Mise à jour** des services tournant sur du vieux matériel
- Choix de **niveaux de stockage adaptés**
- Exécution dans des **zones géographiques moins carbonées**
- **Durée de vie** des snapshots et données inutiles

---

### 💡 À retenir

- **Être "lean" = Moins de coût & moins de carbone**
- **FinOps + Durabilité = Nouvelle culture de la performance cloud**
- Intégrez des **indicateurs durables dans vos dashboards FinOps**
- Favorisez l’**innovation responsable** avec un usage cloud efficient

---

## 🤝 MODULE 10 : Partenariats – Ingénierie rentable et collaboration FinOps

### 🚀 Pourquoi la collaboration est essentielle

> _"Bien commencé est à moitié fait." – Aristote_

- **L’ingénieur** conçoit les solutions.
- **Le FinOps** définit les contraintes budgétaires.
- **La Finance** définit les priorités économiques.
- **La Direction** donne la vision stratégique.

Une bonne collaboration permet :

- Moins de **retravail**.
- Moins de **gaspillage**.
- Plus de **valeur business**.

---

### ⚖️ Les contraintes sont bonnes

- Trop de liberté = **non alignement** avec les besoins de l’entreprise.
- Trop de contraintes = **blocage de l’innovation**.
- 👉 Chercher l’équilibre : contraintes **claires**, mais **flexibles**.

---

### 🏎️ Berline ou voiture de course ?

- **Berline** = efficacité, robustesse, sobriété, maîtrise des coûts.
- **Voiture de course** = performance, tolérance aux pannes, usage intensif des ressources.
- **Les deux approches sont valides**, mais doivent être alignées avec les objectifs business.

---

### 💰 MODULE 10.2 : Principes pour une ingénierie rentable

> _"Un service bon marché mal utilisé coûte cher." – Gabe Hege_

#### Les 4 grands principes :

| Principe                            | Complément                              |
| ----------------------------------- | --------------------------------------- |
| **Maximiser la valeur**             | Plutôt que réduire simplement les coûts |
| **Nous sommes sur la même équipe**  | FinOps + Ingénierie → partenaires       |
| **Présenter les contraintes tôt**   | Pas au moment du go-live                |
| **L’habilitation, pas le contrôle** | Favoriser la liberté encadrée           |

🎯 L’ingénieur doit :

- Travailler avec Finance pour **prévoir, budgétiser et répartir** les coûts.
- Participer aux **décisions dès la phase d’exigences**.
- Faire des **choix techniques alignés avec la valeur business**.

---

### 🤝 MODULE 10.3 : Modèles de partenariat FinOps

| Type de partenariat         | Description                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| **Contribution directe**    | FinOps possède des compétences techniques et collabore directement avec les équipes d'ingénierie. |
| **Collaboration indirecte** | FinOps s’appuie sur les architectes ou le Cloud Center of Excellence.                             |
| **Collaboration ciblée**    | FinOps agit sur des équipes à fort impact ou peu matures pour les accompagner.                    |

---

### 🔧 Conseils pour bien collaborer

1. **Communication & timing** : privilégier les échanges async (mail, backlog) sauf urgences.
2. **Format des recommandations** : intégrer les retours FinOps dans les outils de gestion d’équipe (ex : Jira).
3. **Langage commun** : si le vocabulaire est flou, proposer des termes plus clairs.
4. **Alignement des objectifs** : comprendre les attentes business (ex : réduction du CMV).
5. **Alignement des incitations** : mettre en cohérence les KPIs FinOps avec les objectifs d’équipe (performance, innovation...).

---

### ✅ À retenir

- Un bon partenariat = moins de friction, plus d’impact.
- La **finance** vous protège, pas vous freine.
- La **collaboration** avec FinOps = un levier pour créer des solutions plus efficaces, durables et alignées.

> 💬 « Les coûts, comme la sécurité ou la performance, sont une exigence non fonctionnelle. »

---

## 🔺 MODULE 11 : Le Triangle de Fer & Valeur FinOps

### 🎯 Le Triangle de Fer

Le **Triangle de Fer** est un concept classique en ingénierie :  
**Coût – Rapidité – Qualité**

> « Bon, rapide, pas cher — choisissez-en deux »

#### 🔀 Compromis à prendre

- **Dès le début** du projet (pas après !)
- **Guidés par la valeur métier**
- **Acceptés et alignés** avec les parties prenantes

| Objectif priorisé | Impact probable            |
| ----------------- | -------------------------- |
| Coût faible       | Vitesse ou qualité réduite |
| Haute qualité     | Coûts ou délais accrus     |
| Rapidité          | Coûts ou qualité sacrifiés |

---

### 💬 Pourquoi c’est essentiel

- Aligne les décisions techniques avec la **stratégie de l’entreprise**
- Donne aux ingénieurs un **cadre de décision clair**
- Évite les **reprises coûteuses**
- Favorise une culture de **discussion ouverte sur les compromis**

---

### 🔍 MODULE 11.2 : Maximiser la valeur grâce à FinOps

#### 💼 1. Évaluer les décisions selon l’échelle d’impact

| Exemple                     | Impact | Qui impliquer ?              |
| --------------------------- | ------ | ---------------------------- |
| Changement mineur (< 5%)    | Faible | Équipe d’ingénierie          |
| Optimisation majeure (~30%) | Moyen  | Produit + FinOps             |
| Réarchitecture multi-région | Fort   | CTO / DSI / FinOps / Produit |

🔧 Travailler avec FinOps permet :

- D’**identifier les bons seuils** d’impact
- De **clarifier qui décide quoi**
- D’**anticiper les validations** nécessaires

---

#### 📝 2. Définir les attentes

- Discuter **dès le début** avec les parties prenantes
- Alignement sur les **coûts attendus**
- Justification documentée des **compromis effectués**

---

#### ✅ 3. Valider les résultats

- Le praticien FinOps peut :
  - **Analyser les factures**
  - **Vérifier les impacts réels**
  - Détecter les effets croisés sur **d’autres équipes**
- Exemple : Un changement dans une équipe peut augmenter les **coûts de sécurité** d’une autre.

---

### 🧠 Ça vaut le coup

> Oui, cela demande plus d’effort… mais cela vous **donne plus de liberté**.

- Une solution **construite dans le bon cadre** ne sera pas rejetée
- Vous gagnez en **autonomie**, en **crédibilité**, et en **impact**
- Votre **responsable FinOps est un allié stratégique**

---

### 🧩 Résumé du Triangle de Fer + FinOps

| Étape                    | Action                                              |
| ------------------------ | --------------------------------------------------- |
| 🎯 Compromis             | Choisir en conscience entre coût, rapidité, qualité |
| 🤝 Collaboration         | Travailler avec FinOps & Finance selon l’impact     |
| 🧾 Attentes              | Définir clairement les règles du jeu                |
| 📉 Résultats             | Valider l’impact global via FinOps                  |
| 🔄 Amélioration continue | Réutiliser le modèle pour toutes les décisions      |

> 💬 _"Travailler avec les contraintes, c’est aussi travailler avec créativité."_  
> 💡 _FinOps = maximiser la valeur, pas juste réduire le coût_

## ✅ Conclusion générale

- Le Cloud transforme les **rôles, responsabilités, et décisions**.
- FinOps permet de structurer l’usage Cloud **de façon durable et responsable**.
- En tant qu’ingénieur, vous êtes **acteur de la valeur et de la rentabilité**.

---

## 🔧 MODULE 12 : Leviers d’optimisation

### 🎯 Objectif : Maximiser la valeur, pas seulement réduire les coûts

L’optimisation ne consiste pas uniquement à faire des économies, mais à **réduire la part des coûts dans l’équation de la valeur**. Elle s’inscrit dans une logique de compromis au sein du **triangle de fer (coût, qualité, rapidité)**.

---

### 🛠️ Levier 1 : Optimisation des tarifs

#### Qui ?

👉 Équipe FinOps (vue globale)  
👉 Ingénieur (partenaire pour identifier les engagements)

#### Comment ?

- Utilisation de **plans d’épargne**, **instances réservées**, **engagements d’usage**
- Engagement = économies, mais **moins de flexibilité**
- Optimisation des remises à l’échelle de l’organisation (ex : chevauchement jour/nuit)

> 💡 Plus vous êtes cohérent dans votre consommation cloud, plus les remises seront avantageuses.

---

### ⚙️ Levier 2 : Optimisation de l’utilisation

#### Qui ?

👉 Vous, ingénieur (propriétaire du levier)  
👉 FinOps (fournisseur d’opportunités)

#### Actions concrètes

- Supprimer les ressources inutilisées
- Dimensionner les instances selon les usages
- Passer à des services natifs cloud
- Utiliser du **serverless**, du **containerisé**, ou des architectures modernes
- Éviter le surprovisionnement et moderniser les stacks

> 📈 À considérer comme un **KPI de déploiement**

---

### 👥 Récapitulatif des rôles

| Rôle                          | FinOps                               | Ingénieur                     |
| ----------------------------- | ------------------------------------ | ----------------------------- |
| Optimisation des tarifs       | Analyse globale, gestion des remises | Identifier les usages stables |
| Optimisation de l’utilisation | Identifier les opportunités          | Tester, valider, implémenter  |

---

### 🔍 Informé ≠ Ignorant

- Être **informé** = pouvoir arbitrer, prioriser
- Être **ignorant** = subir les coûts
- L’**ignorance éclairée** : décider en connaissance de cause de **reporter** une optimisation, sans l’ignorer totalement

> 🧠 Vous construisez une **voiture de course** ou une **berline familiale** ? Le choix de vos optimisations dépend du contexte.

---

### 📏 Échelle d'action

| ⚖️ Facteurs d’action               | 🚀 Favorisent | 🐢 Freinent |
| ---------------------------------- | ------------- | ----------- |
| Motivation, compréhension, intérêt | ✅            |             |
| Charge de travail, temps, risque   |               | ❌          |

#### Trucs pour faciliter l’action :

- Demander à FinOps de faire une **pré-analyse**
- Préintégrer la modif dans le **workflow d’ingénierie**
- Obtenir les **approbations en amont**
- Prioriser les optimisations **rentables**

---

> 🔚 Une optimisation = une opportunité de **mieux investir**.  
> Être informé, c’est déjà **agir intelligemment**.

> 💬 « Optimiser, ce n’est pas brider l’innovation. C’est **lui donner un cadre pour s’épanouir**. »

---

## 🤖 MODULE 13 : Automatisation

### 🎯 Objectif : Réduire l’effort manuel, gagner en cohérence et fiabilité

L’automatisation peut ne pas toujours faire gagner du temps immédiatement, mais elle **garantit la cohérence** des actions répétitives et critiques (même si une personne est absente).

---

### ✅ Avantages / ❌ Inconvénients

| ✅ Avantages                       | ❌ Inconvénients                 |
| ---------------------------------- | -------------------------------- |
| Cohérence                          | Temps de développement initial   |
| Fiabilité                          | Complexité croissante / conflits |
| Moins d’erreurs humaines           | Risques de sécurité              |
| Réduction des efforts à long terme | Maintenance nécessaire           |

---

### 🔍 À automatiser ? Voici les 2 questions à se poser :

1. **Quel est l’objectif métier ?** (ex: réduire les coûts, pas seulement supprimer des ressources)
2. **Automatiser est-il plus efficace que le manuel ?**

> 🧠 Le **ROI** est clé : voir [xkcd/1205](https://xkcd.com/1205)

---

### 🔄 Exemples d’automatisations utiles

- Gouvernance des balises : enrichissement automatique via identifiant + CMDB
- Détection de ressources inutilisées
- Planification arrêt/redémarrage d’environnements dev/test
- Surveillance proactive (alerting au lieu d’agir directement)
- Mise à l’échelle automatique / redimensionnement
- Substitution de ressources (modernisation)

---

### ⚠️ Attention aux **conflits d’automatisations**

- Ex: un auto-scale crée une ressource que la gouvernance tag supprime 😬
- 🧯 Solution : isolez les environnements (prod ≠ pre-prod), testez les interactions

---

### 🔐 Sécurité

- Les outils d’automatisation ont souvent **des droits élevés**
- ❗ Risques : suppression involontaire, perte de données, faille de sécurité
- ⚠️ Éviter les outils tiers si non validés par la sécurité interne

---

### 🏗️ Build vs Buy

| 🛠️ Build                      | 💳 Buy                                            |
| ----------------------------- | ------------------------------------------------- |
| Adapté à vos besoins précis   | Maintenance par le fournisseur                    |
| Flexibilité totale            | Mise à jour automatique avec les nouveautés Cloud |
| Besoin de ressources internes | Plus rapide à mettre en place                     |
| Plus risqué / long terme      | Moins personnalisable                             |

---

### 🧪 Conseils pour bien démarrer

1. **Commencer petit**
2. **Mode informatif d’abord** (alerte sans action)
3. **Partager les résultats**
4. **Tester sur dev/test avant prod**
5. **Ne pas tout coder soi-même**
6. **Mesurer les effets !**

---

### 🤝 Collaboration avec FinOps

| 📌 Objectif commun     | 🔧 Exemple                                   |
| ---------------------- | -------------------------------------------- |
| Gouvernance du tagging | Ajouter/enrichir automatiquement les balises |
| Arrêt programmé        | Dev/Test uniquement en heures ouvrées        |
| Réduction des usages   | Alertes ou autostop/redimensionnement        |

> 💡 Conseil : si vous travaillez tard, **skippez temporairement** l’automatisation, ne supprimez pas la tâche.

---

### 🧠 Récapitulatif

- L’automatisation réduit l’effort humain mais **doit être justifiée**
- Attention aux **conflits entre automations**
- Testez en **mode informatif**, puis **déployez progressivement**
- **Mesurez les gains** (coûts, erreurs évitées)
- Travaillez **main dans la main avec FinOps**

---

## 📊 MODULE 14 : Prise de décision basée sur les données

### 🎯 Objectif : Fonder les choix techniques sur des **unit metrics** pour maximiser la **valeur métier**

Les décisions doivent être **données-centrées** (data-driven) pour prouver leur **création de valeur**. Cela permet d’ancrer la culture FinOps dans tous les niveaux, du design à la production.

---

### 🛠️ Niveau d’application

| Rôle       | Quand prendre des décisions fondées sur les données ? |
| ---------- | ----------------------------------------------------- |
| Architecte | Lors de la conception de l'infrastructure             |
| Ingénieur  | Lors de l'écriture du code et déploiement             |
| Équipe Dev | En continu, dès qu'un choix impacte l’usage/les coûts |

---

### 📐 Unit Metrics : la base

> _"The things we measure are the things we improve."_ – James Clear

#### 🔍 Définition

Les **unit metrics** (ou économie unitaire) mesurent un **coût ou revenu par unité** métier : par utilisateur, par transaction, par évaluation, etc.

Exemples :

- 🧮 `Coût par utilisateur actif`
- 🧮 `Coût par transaction`
- 🧮 `Coût par Go stocké`
- 🧮 `Coût par exécution de microservice`

---

### 📊 Formule type

Metric unitaire = Coût cloud (n) / Unité métier (n)

- **Numérateur** : dépense cloud (issue des choix d’architecture ou d’exécution)
- **Dénominateur** : valeur business, technique ou financière (utilisateurs, requêtes, revenus, etc.)

---

### 🧠 À quoi ça sert ?

| 🎯 Objectif                                        | ✅ Impact                                   |
| -------------------------------------------------- | ------------------------------------------- |
| Comprendre les coûts par service ou fonctionnalité | Mieux arbitrer les investissements          |
| Relier l’usage technique à la valeur business      | Meilleure priorisation                      |
| Créer une culture d’**efficacité cloud**           | Aligner tous les acteurs sur la rentabilité |
| Avoir un langage commun avec FinOps/Finance        | Prise de décisions + collaboration          |

---

### 🧩 Rôle des personas

| Persona            | Exemple de Unit Metric                      |
| ------------------ | ------------------------------------------- |
| **FinOps**         | Coût par région, coût par application       |
| **Ingénieur**      | Coût par requête, par serveur, par étudiant |
| **Business Owner** | Coût par fonctionnalité (score, rapport)    |
| **IT Finance**     | Variance budgétaire par étudiant/région     |
| **C-Suite**        | Coût global par région, marge, LTV, CAC     |

---

### 🏁 Résultats attendus (Desired Outcomes)

1. Quantifier le rôle du cloud dans les finances
2. Mieux prévoir la rentabilité
3. Mettre en valeur les actions des ingénieurs dans la marge brute
4. Mettre en place une feuille de route d’optimisation cloud
5. Évaluer le potentiel business d’un produit
6. Soutenir les KPI : **CAC, LTV, Contribution Margin**

---

### 🧮 Exemple de réflexion :

> _"Est-ce que +2% de coût par utilisateur actif peut améliorer de 10% la performance applicative ? Si oui, ça peut valoir le coup !"_

---

### 🔁 Triangle de Fer & Unit Metrics

Les **unit metrics** permettent de :

- Mesurer les effets des décisions sur **coût / qualité / rapidité**
- Mieux justifier les compromis et scénarios
- Donner plus de **liberté aux ingénieurs** en les outillant

---

### ✅ Résumé

- Prenez des décisions dès la conception et pas en fin de process
- Rapprochez-vous de FinOps pour affiner vos métriques
- Alignez coûts et indicateurs business
- Intégrez les données là où elles sont **utiles, pas juste visibles**
