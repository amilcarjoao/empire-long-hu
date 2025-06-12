// Import des classes et fonctions nécessaires
import { empire } from "./config.mjs";
import { PersonnageSheet } from "./sheets/personnage-sheet.mjs";
import { PNJSheet } from "./sheets/pnj-sheet.mjs";
import { EmpireItemSheet } from "./sheets/item-sheet.mjs";

// Classe principale du système
class EmpireLongHu {
  static init() {
    console.log("Empire de la Long-Hu | Initialisation du système");
    
    // Enregistrement des paramètres du système
    game.empire = {
      config: empire
    };

    // Enregistrement des feuilles de personnage
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("empire-long-hu", PersonnageSheet, { 
      types: ["personnage"],
      makeDefault: true
    });
    Actors.registerSheet("empire-long-hu", PNJSheet, { 
      types: ["pnj"],
      makeDefault: true
    });

    // Enregistrement des feuilles d'objets
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("empire-long-hu", EmpireItemSheet, { makeDefault: true });
  }
}

// Enregistrement des hooks Foundry
Hooks.once("init", function() {
  console.log("Empire de la Long-Hu | Démarrage du système");
  EmpireLongHu.init();
});

Hooks.once("ready", function() {
  console.log("Empire de la Long-Hu | Système prêt");
});