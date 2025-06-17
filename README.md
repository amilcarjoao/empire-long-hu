# Système Empire de la Long-Hu pour Foundry VTT

Ce système est conçu pour le jeu de rôle maison "L'Empire de la Long-Hu" sur Foundry VTT.

## Modifications récentes

### Mise à jour pour Foundry VTT v13 (v0.2.0)

- **Compatibilité exclusive avec Foundry VTT v13** :
  - Mise à jour des API pour utiliser les nouvelles méthodes de v13
  - Utilisation de DocumentSheetConfig au lieu de Actors/Items.registerSheet
  - Mise à jour de SystemDataModel pour hériter de TypeDataModel

- **Améliorations techniques** :
  - Optimisation des performances
  - Correction de bugs mineurs
  - Préparation pour les futures fonctionnalités

### Modernisation du système (v0.1.0)

- **Adoption d'une approche moderne sans template.json** :
  - Utilisation de dataModels pour définir la structure des données
  - Compatibilité améliorée avec Foundry VTT v12 et v13
  - Structure plus maintenable et extensible

- **Refonte de l'architecture** :
  - Création de modèles de données pour les acteurs et objets
  - Organisation en modules pour une meilleure séparation des responsabilités
  - Utilisation des fonctionnalités avancées de Foundry VTT

### Structure du système (v0.0.6)

- **Refonte complète des types d'acteurs** :
  - Ajout des types : character, vehicle, merchant, regiment
  - Chaque type dispose de sa propre feuille et fonctionnalités spécifiques

- **Nouveaux types d'objets** :
  - weapon, armor, equipment, class, background, learning, technique, object
  - Templates pour objets physiques et non-physiques

- **Système d'éléments** :
  - Implémentation des 5 éléments : Métal, Eau, Terre, Bois, Feu
  - Intégration visuelle avec code couleur

- **Interface utilisateur améliorée** :
  - Feuille de personnage avec 3 panneaux (latéral, en-tête, principal)
  - Affichage des vitesses avec code couleur
  - Gestion des ressources (Chi corporel, Souffle de vie, Chi spirituel)

- **Système de régiments** :
  - Organisation avec slots dynamiques nommables
  - Hiérarchie de régiments (parent/enfants)
  - Agrégation automatique des ressources
  - Actions spécifiques par slot

- **Intégration de modules** :
  - Drag Ruler pour la gestion des déplacements
  - Simple Calendar pour la gestion du temps

## À développer

- Implémentation complète des mécaniques de jeu
- Finalisation des feuilles d'acteurs et d'objets
- Système de combat
- Gestion avancée des talents et compétences
- Automatisation des calculs pour les régiments

## Installation

1. Dans l'application Foundry VTT, accédez à la section "Systèmes"
2. Cliquez sur "Installer un système"
3. Dans l'URL du manifeste, collez le lien vers le fichier system.json
4. Cliquez sur "Installer"

## Dépendances

Ce système nécessite les modules suivants :
- Drag Ruler
- Simple Calendar

## Licence
