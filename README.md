# Système Empire de la Long-Hu pour Foundry VTT

Ce système est conçu pour le jeu de rôle maison "L'Empire de la Long-Hu" sur Foundry VTT.

## Modifications récentes

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
