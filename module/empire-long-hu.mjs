// Import des classes et fonctions nécessaires
import { empire } from "./config.mjs";

/**
 * Classe principale du système Empire de la Long-Hu
 * @extends {Game.System}
 */
class EmpireLongHu {
  /**
   * Initialisation du système
   */
  static init() {
    console.log("Empire de la Long-Hu | Initialisation du système");
    
    // Enregistrement des paramètres du système
    game.empire = {
      config: empire
    };
    
    // Définition des types de documents HTML
    CONFIG.Actor.documentClass = EmpireLongHuActor;
    CONFIG.Item.documentClass = EmpireLongHuItem;
    
    // Enregistrement des feuilles d'acteurs
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("empire-long-hu", EmpireLongHuCharacterSheet, { 
      types: ["character"],
      makeDefault: true,
      label: "empire-long-hu.sheets.character"
    });
    Actors.registerSheet("empire-long-hu", EmpireLongHuVehicleSheet, { 
      types: ["vehicle"],
      makeDefault: true,
      label: "empire-long-hu.sheets.vehicle"
    });
    Actors.registerSheet("empire-long-hu", EmpireLongHuMerchantSheet, { 
      types: ["merchant"],
      makeDefault: true,
      label: "empire-long-hu.sheets.merchant"
    });
    Actors.registerSheet("empire-long-hu", EmpireLongHuRegimentSheet, { 
      types: ["regiment"],
      makeDefault: true,
      label: "empire-long-hu.sheets.regiment"
    });
    
    // Enregistrement des feuilles d'objets
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("empire-long-hu", EmpireLongHuItemSheet, {
      makeDefault: true,
      label: "empire-long-hu.sheets.item"
    });
    
    // Intégration avec Drag Ruler
    this._registerDragRuler();
    
    // Intégration avec Simple Calendar
    this._registerSimpleCalendar();
  }
  
  /**
   * Intégration avec le module Drag Ruler
   * @private
   */
  static _registerDragRuler() {
    if (!game.modules.get("drag-ruler")?.active) return;
    
    Hooks.once("dragRuler.ready", (SpeedProvider) => {
      class EmpireLongHuSpeedProvider extends SpeedProvider {
        get colors() {
          return [
            {id: "walk", default: 0x00ff00, name: "empire-long-hu.speeds.walk"},
            {id: "dash", default: 0xffff00, name: "empire-long-hu.speeds.dash"},
            {id: "run", default: 0xff8000, name: "empire-long-hu.speeds.run"}
          ];
        }
        
        getRanges(token) {
          const actor = token.actor;
          if (!actor || !actor.system.speeds) return [];
          
          const baseSpeed = actor.system.speeds.walk.value;
          return [
            {range: baseSpeed, color: "walk"},
            {range: baseSpeed * 2, color: "dash"},
            {range: baseSpeed * 3, color: "run"}
          ];
        }
      }
      
      dragRuler.registerSystem("empire-long-hu", EmpireLongHuSpeedProvider);
    });
  }
  
  /**
   * Intégration avec le module Simple Calendar
   * @private
   */
  static _registerSimpleCalendar() {
    if (!game.modules.get("simple-calendar")?.active) return;
    
    Hooks.once("simple-calendar.ready", () => {
      // Configuration du calendrier
      console.log("Empire de la Long-Hu | Intégration avec Simple Calendar");
    });
  }
}

/**
 * Classe de base pour les acteurs du système
 * @extends {Actor}
 */
class EmpireLongHuActor extends Actor {
  // Fonctionnalités spécifiques aux acteurs
}

/**
 * Classe de base pour les objets du système
 * @extends {Item}
 */
class EmpireLongHuItem extends Item {
  // Fonctionnalités spécifiques aux objets
}

/**
 * Feuille de personnage
 * @extends {ActorSheet}
 */
class EmpireLongHuCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "character"],
      template: "systems/empire-long-hu/templates/actor/character-sheet.hbs",
      width: 720,
      height: 680,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features"}]
    });
  }
}

/**
 * Feuille de véhicule
 * @extends {ActorSheet}
 */
class EmpireLongHuVehicleSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "vehicle"],
      template: "systems/empire-long-hu/templates/actor/vehicle-sheet.hbs",
      width: 720,
      height: 680,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
    });
  }
}

/**
 * Feuille de marchand
 * @extends {ActorSheet}
 */
class EmpireLongHuMerchantSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "merchant"],
      template: "systems/empire-long-hu/templates/actor/merchant-sheet.hbs",
      width: 720,
      height: 680,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "inventory"}]
    });
  }
}

/**
 * Feuille de régiment
 * @extends {ActorSheet}
 */
class EmpireLongHuRegimentSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "regiment"],
      template: "systems/empire-long-hu/templates/actor/regiment-sheet.hbs",
      width: 800,
      height: 700,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "organization"}]
    });
  }
}

/**
 * Feuille d'objet
 * @extends {ItemSheet}
 */
class EmpireLongHuItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "item"],
      template: "systems/empire-long-hu/templates/item/item-sheet.hbs",
      width: 520,
      height: 480,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
    });
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
