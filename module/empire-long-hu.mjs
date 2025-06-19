// Import des classes et fonctions nécessaires
import { empire } from "./config.mjs";
import { EmpireLongHuActorDataModel } from "./data/actor.mjs";
import { EmpireLongHuItemDataModel } from "./data/item.mjs";

/**
 * Classe principale du système Empire de la Long-Hu
 * @extends {Game.System}
 */
class EmpireLongHu {
  
  /**
   * Version du système
   * @type {string}
   */
  static VERSION = "0.0.13";
  /**
   * Initialisation du système
   */
  static init() {
    console.log(`Empire de la Long-Hu | Initialisation du système v${this.VERSION}`);
    
    // Enregistrement des paramètres du système
    game.empire = {
      config: empire,
      version: this.VERSION
    };
    
    // Enregistrement des modèles de données
    CONFIG.Actor.dataModels = {
      character: EmpireLongHuActorDataModel.character,
      vehicle: EmpireLongHuActorDataModel.vehicle,
      merchant: EmpireLongHuActorDataModel.merchant,
      regiment: EmpireLongHuActorDataModel.regiment
    };
    
    CONFIG.Item.dataModels = {
      weapon: EmpireLongHuItemDataModel.weapon,
      armor: EmpireLongHuItemDataModel.armor,
      equipment: EmpireLongHuItemDataModel.equipment,
      class: EmpireLongHuItemDataModel.class,
      background: EmpireLongHuItemDataModel.background,
      learning: EmpireLongHuItemDataModel.learning,
      technique: EmpireLongHuItemDataModel.technique,
      object: EmpireLongHuItemDataModel.object
    };
    
    // Définir les migrations de données pour v13.345
    CONFIG.Actor.systemDataModels = CONFIG.Actor.dataModels;
    CONFIG.Item.systemDataModels = CONFIG.Item.dataModels;
    
    // Définition des types de documents HTML
    CONFIG.Actor.documentClass = EmpireLongHuActor;
    CONFIG.Item.documentClass = EmpireLongHuItem;
    
    // Compatibilité avec v13.345
    if (game.version && isNewerVersion(game.version, "13.300")) {
      CONFIG.Actor.systemDataModels = CONFIG.Actor.dataModels;
      CONFIG.Item.systemDataModels = CONFIG.Item.dataModels;
    }
    
    // Enregistrement des feuilles d'acteurs
    // En v13, on utilise DocumentSheetConfig au lieu de Actors/Items.registerSheet
    DocumentSheetConfig.unregisterSheet(Actor, "core", ActorSheet);
    DocumentSheetConfig.registerSheet(Actor, "empire-long-hu", EmpireLongHuCharacterSheet, { 
      types: ["character"],
      makeDefault: true,
      label: "empire-long-hu.sheets.character"
    });
    DocumentSheetConfig.registerSheet(Actor, "empire-long-hu", EmpireLongHuVehicleSheet, { 
      types: ["vehicle"],
      makeDefault: true,
      label: "empire-long-hu.sheets.vehicle"
    });
    DocumentSheetConfig.registerSheet(Actor, "empire-long-hu", EmpireLongHuMerchantSheet, { 
      types: ["merchant"],
      makeDefault: true,
      label: "empire-long-hu.sheets.merchant"
    });
    DocumentSheetConfig.registerSheet(Actor, "empire-long-hu", EmpireLongHuRegimentSheet, { 
      types: ["regiment"],
      makeDefault: true,
      label: "empire-long-hu.sheets.regiment"
    });
    
    // Enregistrement des feuilles d'objets
    DocumentSheetConfig.unregisterSheet(Item, "core", ItemSheet);
    DocumentSheetConfig.registerSheet(Item, "empire-long-hu", EmpireLongHuItemSheet, {
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
  /** @override */
  prepareData() {
    super.prepareData();
    
    // S'assurer que les valeurs numériques sont bien des nombres
    if (this.system) {
      // Convertir les valeurs des éléments
      if (this.system.elements) {
        for (const [key, element] of Object.entries(this.system.elements)) {
          if (element.value !== undefined) {
            element.value = Number(element.value) || 0;
          }
          if (element.max !== undefined) {
            element.max = Number(element.max) || 5;
          }
        }
      }
      
      // Convertir les valeurs des ressources
      if (this.system.chi) {
        if (this.system.chi.corporel) {
          this.system.chi.corporel.value = Number(this.system.chi.corporel.value) || 0;
          this.system.chi.corporel.max = Number(this.system.chi.corporel.max) || 0;
        }
        if (this.system.chi.spirituel) {
          this.system.chi.spirituel.value = Number(this.system.chi.spirituel.value) || 0;
          this.system.chi.spirituel.max = Number(this.system.chi.spirituel.max) || 0;
        }
      }
      
      if (this.system.souffle) {
        this.system.souffle.value = Number(this.system.souffle.value) || 0;
        this.system.souffle.max = Number(this.system.souffle.max) || 0;
      }
      
      // Convertir les valeurs des talents
      if (this.system.talents) {
        for (const [key, talent] of Object.entries(this.system.talents)) {
          if (talent.value !== undefined) {
            talent.value = Number(talent.value) || 0;
          }
          if (talent.mod !== undefined) {
            talent.mod = Number(talent.mod) || 0;
          }
          // Recalculer le total
          talent.total = (talent.value || 0) + (talent.mod || 0);
        }
      }
    }
  }
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
      width: 1000,
      height: 800,
      //resizable: false,
      tabs: [
        {navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "talents"}
      ]
    });
  }
  
  /** @override */
  async getData() {
    // Pour Foundry V13.345+
    const context = await super.getData();
    
    // Ajout des helpers pour les rangs
    context.getRankName = this._getRankName.bind(this);
    
    // Ajout d'un helper pour comparer des chaînes
    context.eq = (a, b) => a === b;
    
    // Récupération du mode d'édition
    context.editMode = this.actor.getFlag("empire-long-hu", "editMode") || false;
    
    // S'assurer que context.system existe
    if (!context.system) {
      context.system = {};
    }
    
    // S'assurer que le niveau est défini
    if (!context.system.level) {
      context.system.level = 1;
      await this.actor.update({ "system.level": 1 });
    }
    
    // Vérifier si le rang doit être mis à jour
    if (context.system.level && (!context.system.rank || this._getRankName(context.system.level) !== context.system.rank)) {
      const newRank = this._getRankName(context.system.level);
      await this.actor.update({ "system.rank": newRank });
      context.system.rank = newRank;
    }
    
    // S'assurer que les ressources sont initialisées
    if (!context.system.chi) {
      context.system.chi = {
        corporel: { value: 0, max: 0 },
        spirituel: { value: 0, max: 0 }
      };
    }
    
    if (!context.system.souffle) {
      context.system.souffle = { value: 0, max: 0 };
    }
    
    // S'assurer que les éléments sont initialisés
    if (!context.system.elements) {
      context.system.elements = {
        metal: { value: 0, max: 5 },
        eau: { value: 0, max: 5 },
        terre: { value: 0, max: 5 },
        bois: { value: 0, max: 5 },
        feu: { value: 0, max: 5 }
      };
    }
    
    // Préparation des talents
    this._prepareCharacterTalents(context);
    
    return context;
  }
  
  /**
   * Prépare les données des talents pour l'affichage
   * @param {Object} context - Le contexte de données
   * @private
   */
  _prepareCharacterTalents(context) {
    // S'assurer que le système existe
    if (!context.system) {
      context.system = {};
    }
    
    // S'assurer que les talents existent dans le système
    if (!context.system.talents) {
      context.system.talents = {};
    }
    
    // S'assurer que le rang est défini
    if (!context.system.rank && context.system.level) {
      context.system.rank = this._getRankName(context.system.level);
    }
    
    // Liste des talents avec leurs valeurs par défaut
    const talentDefaults = {
      // Combat
      artguerre: { label: "Art de la guerre", value: 0, mod: 0, category: "combat" },
      improvisation: { label: "Improvisation", value: 0, mod: 0, category: "combat" },
      
      // Armes
      bangshu: { label: "Bangshu (bâton)", value: 0, mod: 0, category: "armes" },
      artsmartial: { label: "Arts Martial (main)", value: 0, mod: 0, category: "armes" },
      chuishu: { label: "Chuishu (masse)", value: 0, mod: 0, category: "armes" },
      wuqishu: { label: "Wuqishu (arme de siège)", value: 0, mod: 0, category: "armes" },
      dunshu: { label: "Dunshu (bouclier)", value: 0, mod: 0, category: "armes" },
      gongshu: { label: "Gongshu (arc)", value: 0, mod: 0, category: "armes" },
      jianshu: { label: "Jianshu (escrime)", value: 0, mod: 0, category: "armes" },
      qiangshu: { label: "Qiangshu (hast)", value: 0, mod: 0, category: "armes" },
      nushu: { label: "Nushu (arbalète)", value: 0, mod: 0, category: "armes" },
      
      // Physique
      elementsdefensif: { label: "Éléments défensif", value: 0, mod: 0, category: "physique" },
      acrobatie: { label: "Acrobatie", value: 0, mod: 0, category: "physique" },
      equitation: { label: "Équitation", value: 0, mod: 0, category: "physique" },
      escalade: { label: "Escalade", value: 0, mod: 0, category: "physique" },
      reactionnel: { label: "Réactionnel", value: 0, mod: 0, category: "physique" },
      natation: { label: "Natation", value: 0, mod: 0, category: "physique" },
      lancer: { label: "Lancer", value: 0, mod: 0, category: "physique" },
      
      // Mental
      artisanat: { label: "Artisanat", value: 0, mod: 0, category: "mental" },
      discretion: { label: "Discrétion", value: 0, mod: 0, category: "mental" },
      forge: { label: "Forge", value: 0, mod: 0, category: "mental" },
      larcins: { label: "Larcins", value: 0, mod: 0, category: "mental" },
      survie: { label: "Survie (spé)", value: 0, mod: 0, category: "mental" },
      medecine: { label: "Médecine", value: 0, mod: 0, category: "mental" },
      alteration: { label: "Altération", value: 0, mod: 0, category: "mental" },
      alchimie: { label: "Alchimie", value: 0, mod: 0, category: "mental" },
      animalisme: { label: "Animalisme", value: 0, mod: 0, category: "mental" },
      divination: { label: "Divination", value: 0, mod: 0, category: "mental" },
      empathie: { label: "Empathie", value: 0, mod: 0, category: "mental" },
      exorcisme: { label: "Exorcisme", value: 0, mod: 0, category: "mental" },
      communication: { label: "Communication divine", value: 0, mod: 0, category: "mental" },
      meditation: { label: "Mingxiăng (méditation)", value: 0, mod: 0, category: "mental" },
      stabilite: { label: "Stabilité", value: 0, mod: 0, category: "mental" },
      theologie: { label: "Théologie", value: 0, mod: 0, category: "mental" },
      musique: { label: "Musique (spé)", value: 0, mod: 0, category: "mental" },
      maitrise: { label: "Maîtrise Élémentaire", value: 0, mod: 0, category: "mental" },
      architecture: { label: "Architecture", value: 0, mod: 0, category: "mental" },
      calligraphie: { label: "Calligraphie", value: 0, mod: 0, category: "mental" },
      herboristerie: { label: "Herboristerie", value: 0, mod: 0, category: "mental" },
      histoire: { label: "Histoire", value: 0, mod: 0, category: "mental" },
      investigation: { label: "Investigation", value: 0, mod: 0, category: "mental" },
      litterature: { label: "Littérature", value: 0, mod: 0, category: "mental" },
      loi: { label: "Loi / Justice", value: 0, mod: 0, category: "mental" },
      navigation: { label: "Navigation", value: 0, mod: 0, category: "mental" },
      perception: { label: "Perception", value: 0, mod: 0, category: "mental" },
      savoir: { label: "Savoir (spé)", value: 0, mod: 0, category: "mental" },
      sciences: { label: "Sciences", value: 0, mod: 0, category: "mental" },
      
      // Social
      animation: { label: "Animation", value: 0, mod: 0, category: "social" },
      arts: { label: "Arts", value: 0, mod: 0, category: "social" },
      commandement: { label: "Commandement", value: 0, mod: 0, category: "social" },
      comedie: { label: "Comédie", value: 0, mod: 0, category: "social" },
      danse: { label: "Danse", value: 0, mod: 0, category: "social" },
      diplomatie: { label: "Diplomatie / Négociation", value: 0, mod: 0, category: "social" },
      etiquette: { label: "Étiquette", value: 0, mod: 0, category: "social" },
      heraldique: { label: "Héraldique", value: 0, mod: 0, category: "social" },
      intimidation: { label: "Intimidation", value: 0, mod: 0, category: "social" },
      jeux: { label: "Jeux", value: 0, mod: 0, category: "social" },
      langues: { label: "Langues", value: 0, mod: 0, category: "social" },
      seduction: { label: "Séduction", value: 0, mod: 0, category: "social" },
      elementsoffensif: { label: "Éléments offensif", value: 0, mod: 0, category: "social" }
    };
    
    // Initialiser les talents manquants
    for (const [key, talent] of Object.entries(talentDefaults)) {
      if (!context.system.talents[key]) {
        context.system.talents[key] = talent;
      } else {
        // S'assurer que tous les champs sont présents
        context.system.talents[key] = {
          ...talent,
          ...context.system.talents[key]
        };
      }
      
      // Calculer le total (valeur de base + modificateur)
      context.system.talents[key].total = (context.system.talents[key].value || 0) + 
                                          (context.system.talents[key].mod || 0);
    }
  }
  
  /**
   * Obtient le nom du rang en fonction du niveau
   * @param {Number} level - Le niveau du personnage
   * @returns {String} Le nom du rang
   * @private
   */
  _getRankName(level) {
    level = parseInt(level);
    if (level < 1) return "Rustique"; // Niveau minimum 1
    if (level <= 3) return "Rustique";
    if (level <= 6) return "Noble";
    if (level <= 9) return "Royal";
    if (level <= 12) return "Empereur";
    return "Divin";
  }
  
  
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Gestion du champ de niveau
    const levelInput = html.find('.level-value');

    // Mise à jour du nom du rang en temps réel
    levelInput.on('change', async (event) => {
      let newLevel = parseInt(event.target.value);
      
      // S'assurer que le niveau est au moins 1
      if (newLevel < 1) {
        newLevel = 1;
        event.target.value = 1;
      }
      
      const rankName = html.find('.rank-name');
      if (rankName.length) {
        const newRankName = this._getRankName(newLevel);
        rankName.text(newRankName);
        
        // Stocker le niveau et le rang dans les données de l'acteur
        await this.actor.update({
          "system.level": newLevel,
          "system.rank": newRankName
        });
      }
    });
    
    // Gestion du toggle mode édition/jeu
    html.find('.toggle-switch input').on('change', async (event) => {
      // Si on passe du mode édition au mode jeu, soumettre le formulaire pour enregistrer les modifications
      if (!event.target.checked && this.actor.getFlag("empire-long-hu", "editMode")) {
        try {
          // Récupérer les données du formulaire
          const formData = this._getSubmitData();
          
          // Convertir les valeurs numériques
          for (const [key, value] of Object.entries(formData)) {
            if (typeof value === "string" && !isNaN(Number(value)) && key.includes("system.")) {
              formData[key] = Number(value);
            }
          }
          
          // Mettre à jour l'acteur avec les données du formulaire
          await this.actor.update(formData);
          console.log("Empire Long-Hu | Sauvegarde automatique lors du passage en mode jeu");
          ui.notifications.info("Modifications enregistrées");
        } catch (error) {
          console.error("Empire Long-Hu | Erreur lors de la sauvegarde automatique:", error);
          ui.notifications.error("Erreur lors de l'enregistrement des modifications");
        }
      }
      
      // Mettre à jour le flag de mode d'édition
      await this.actor.setFlag("empire-long-hu", "editMode", event.target.checked);
      this.render(false);
    });
    
    // Gestion du bouton de sauvegarde
    html.find('.save-button').on('click', async (event) => {
      // Récupérer la valeur du niveau avant de soumettre
      const levelValue = html.find('.level-value').val();
      const level = parseInt(levelValue) || 1;
      
      // Mettre à jour le niveau et le rang dans les données de l'acteur
      await this.actor.update({
        "system.level": level,
        "system.rank": this._getRankName(level)
      });
      
      // Soumettre le formulaire pour enregistrer les autres modifications
      await this._onSubmit(event);
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
  console.log(`Empire de la Long-Hu | Version du système: ${EmpireLongHu.VERSION}`);
  console.log(`Empire de la Long-Hu | Version de Foundry détectée: ${game.version}`);
  
  // Vérifier si les hooks de sauvegarde sont correctement enregistrés
  console.log("Empire de la Long-Hu | Vérification des hooks de sauvegarde");
});

// Hook pour la migration des données
Hooks.once("i18nInit", () => {
  // Vérifier si une migration est nécessaire
  const currentVersion = game.settings.get("core", "version");
  console.log(`Empire de la Long-Hu | Préparation pour Foundry v${currentVersion}`);
});

// Hook pour surveiller les mises à jour d'acteurs
Hooks.on("updateActor", (actor, data, options, userId) => {
  console.log("Empire de la Long-Hu | Acteur mis à jour:", actor.name, data);
  
  // Vérifier si les données contiennent des talents
  if (data.system?.talents) {
    console.log("Empire Long-Hu | Talents mis à jour:", data.system.talents);
  }
  
  // Vérifier si les données contiennent des éléments
  if (data.system?.elements) {
    console.log("Empire Long-Hu | Éléments mis à jour:", data.system.elements);
  }
  
  // Vérifier si les données contiennent des ressources
  if (data.system?.chi || data.system?.souffle) {
    console.log("Empire Long-Hu | Ressources mises à jour");
  }
});

// Hook pour surveiller les erreurs de mise à jour
Hooks.on("error", (err) => {
  console.error("Empire de la Long-Hu | Erreur détectée:", err);
});