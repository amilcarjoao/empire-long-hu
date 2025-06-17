# Changelog - L'Empire de la Long-Hu

## v0.0.13 - Compatibilité avec Foundry VTT v13.345 (2024-06-01)

### Changements majeurs
- Mise à jour de la compatibilité pour Foundry VTT v13.345
- Correction des problèmes de compatibilité avec les modèles de données
- Ajout de la méthode cleanData pour SystemDataModel

### Changements techniques
- Mise à jour de la méthode getData pour être asynchrone
- Ajout de CONFIG.Actor.systemDataModels et CONFIG.Item.systemDataModels
- Amélioration de la gestion des versions de Foundry

## v0.2.0 - Mise à jour pour Foundry VTT v13 (2023-12-15)

### Changements majeurs
- Mise à jour de la compatibilité pour Foundry VTT v13 exclusivement
- Mise à jour du système.json avec les paramètres de compatibilité v13
- Mise à jour de la version du système à 0.2.0

### Changements techniques
- Remplacement de `Actors.registerSheet` et `Items.registerSheet` par `DocumentSheetConfig.registerSheet`
- Mise à jour de la classe `SystemDataModel` pour hériter de `foundry.abstract.TypeDataModel`
- Mise à jour des commentaires et de la documentation pour refléter la compatibilité v13
- Ajout d'entrées de traduction pour la version 13

### Documentation
- Mise à jour du README.md avec les informations sur la compatibilité v13
- Ajout d'une section sur les modifications apportées pour la v13
- Création d'un fichier CHANGELOG.md pour suivre les modifications

## v0.1.0 - Modernisation du système (2023-10-30)

### Changements majeurs
- Adoption d'une approche moderne sans template.json
- Utilisation de dataModels pour définir la structure des données
- Compatibilité améliorée avec Foundry VTT v12 et v13
- Structure plus maintenable et extensible

### Refonte de l'architecture
- Création de modèles de données pour les acteurs et objets
- Organisation en modules pour une meilleure séparation des responsabilités
- Utilisation des fonctionnalités avancées de Foundry VTT

## v0.0.6 - Structure du système (2023-09-15)

### Refonte complète des types d'acteurs
- Ajout des types : character, vehicle, merchant, regiment
- Chaque type dispose de sa propre feuille et fonctionnalités spécifiques

### Nouveaux types d'objets
- weapon, armor, equipment, class, background, learning, technique, object
- Templates pour objets physiques et non-physiques

### Système d'éléments
- Implémentation des 5 éléments : Métal, Eau, Terre, Bois, Feu
- Intégration visuelle avec code couleur

### Interface utilisateur améliorée
- Feuille de personnage avec 3 panneaux (latéral, en-tête, principal)
- Affichage des vitesses avec code couleur
- Gestion des ressources (Chi corporel, Souffle de vie, Chi spirituel)

### Système de régiments
- Organisation avec slots dynamiques nommables
- Hiérarchie de régiments (parent/enfants)
- Agrégation automatique des ressources
- Actions spécifiques par slot

### Intégration de modules
- Drag Ruler pour la gestion des déplacements
- Simple Calendar pour la gestion du temps