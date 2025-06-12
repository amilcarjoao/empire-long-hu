// Import des classes et fonctions nécessaires
import { empire } from "./config.mjs";

// Classe principale du système
class EmpireLongHu {
  static init() {
    console.log("Emfpire de la Long-Hu | Initialisation du système");
    
    // Enregistrement des paramètres du système
    game.empire = {
      config: empire
    };
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
