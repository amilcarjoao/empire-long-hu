/**
 * Classe de feuille de personnage pour Empire de la Long-Hu
 * @extends {ActorSheet}
 */
export class EmpireLongHuCharacterSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "character"],
      template: "systems/empire-long-hu/templates/actor/character-sheet.hbs",
      width: 1000,
      height: 800,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "talents"}]
    });
  }
  
  /** @override */
  async getData() {
    const context = await super.getData();
    
    // Ajout des helpers pour les rangs
    context.getRankName = this._getRankName.bind(this);
    context.getRankRange = this._getRankRange.bind(this);
    
    // Récupérer le mode d'édition actuel (ne pas forcer le mode jeu)
    context.editMode = this.actor.getFlag("empire-long-hu", "editMode") || false;
    
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
    
    return context;
  }
  
  /**
   * Obtient le nom du rang en fonction du niveau
   * @param {Number} level - Le niveau du personnage
   * @returns {String} Le nom du rang
   * @private
   */
  _getRankName(level) {
    if (level <= 3) return "Rustique";
    if (level <= 6) return "Noble";
    if (level <= 9) return "Royal";
    if (level <= 12) return "Empereur";
    return "Divin";
  }
  
  /**
   * Obtient la plage de niveaux pour un rang
   * @param {Number} level - Le niveau du personnage
   * @returns {String} La plage de niveaux
   * @private
   */
  _getRankRange(level) {
    if (level <= 3) return "1-3";
    if (level <= 6) return "3-6";
    if (level <= 9) return "6-9";
    if (level <= 12) return "9-12";
    return "12-15+";
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Tout le monde peut voir
    
    // Seul le propriétaire peut éditer
    if (this.actor.isOwner) {
      // Gestion du toggle de mode d'édition
      html.find('.toggle-switch input[name="flags.empire-long-hu.editMode"]').on('change', async (event) => {
        const isChecked = event.target.checked;
        
        // Si on passe du mode édition au mode jeu, enregistrer toutes les modifications
        if (!isChecked && this.actor.getFlag("empire-long-hu", "editMode")) {
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
        await this.actor.setFlag("empire-long-hu", "editMode", isChecked);
        this.render(true);
      });
      
      // Gestion du changement de niveau pour mettre à jour le rang en temps réel
      html.find('input[name="system.level"]').on('change', (event) => {
        const newLevel = parseInt(event.target.value);
        if (!isNaN(newLevel)) {
          const rankName = html.find('.rank-name');
          rankName.text(this._getRankName(newLevel));
        }
      });
      
      // Enregistrement automatique des modifications en mode édition
      html.find('input, select, textarea').on('change', async (event) => {
        if (this.actor.getFlag("empire-long-hu", "editMode")) {
          // Ne pas traiter les changements du toggle d'édition lui-même
          if (event.target.name === "flags.empire-long-hu.editMode") return;
          
          try {
            // Récupérer la valeur modifiée
            const field = event.target.name;
            if (!field) return; // Ignorer les champs sans nom
            
            let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            
            // Convertir en nombre si nécessaire
            if (event.target.dataset.dtype === "Number") {
              value = Number(value);
            }
            
            // Créer un objet de mise à jour
            const updateData = {};
            updateData[field] = value;
            
            // Mettre à jour le rang si le niveau a changé
            if (field === "system.level") {
              const level = parseInt(value);
              if (!isNaN(level)) {
                updateData["system.rank"] = this._getRankName(level);
              }
            }
            
            // Mettre à jour directement l'acteur
            await this.actor.update(updateData);
            console.log(`Empire Long-Hu | Champ mis à jour: ${field} = ${value}`);
          } catch (error) {
            console.error("Empire Long-Hu | Erreur lors de la mise à jour automatique:", error);
          }
        }
      });
      
      // Ajouter un gestionnaire spécifique pour les talents
      html.find('.talent-value input').on('change', async (event) => {
        if (this.actor.getFlag("empire-long-hu", "editMode")) {
          try {
            const field = event.target.name;
            if (!field) return;
            
            // Forcer la conversion en nombre entier
            const value = parseInt(event.target.value) || 0;
            
            // Extraire la clé du talent à partir du nom du champ
            const talentKey = field.match(/system\.talents\.([^.]+)\.value/)?.[1];
            if (!talentKey) return;
            
            // Créer un objet de mise à jour avec la structure correcte
            const updateData = {};
            updateData[`system.talents.${talentKey}.value`] = value;
            
            // Mettre à jour directement l'acteur
            await this.actor.update(updateData);
            console.log(`Empire Long-Hu | Talent mis à jour: ${talentKey} = ${value}`);
            
            // Mettre à jour le total affiché sans recharger la page
            const totalElement = event.target.closest('.talent-item').querySelector('.talent-total');
            if (totalElement) {
              const mod = this.actor.system.talents[talentKey]?.mod || 0;
              totalElement.textContent = value + mod;
            }
          } catch (error) {
            console.error("Empire Long-Hu | Erreur lors de la mise à jour du talent:", error);
          }
        }
      });
    }
  }
  
  /** @override */
  async _updateObject(event, formData) {
    try {
      // Convertir toutes les valeurs numériques
      for (const [key, value] of Object.entries(formData)) {
        if (typeof value === "string" && !isNaN(Number(value)) && key.includes("system.")) {
          formData[key] = Number(value);
        }
      }
      
      // Mettre à jour le rang si le niveau a changé
      if (formData["system.level"]) {
        const level = parseInt(formData["system.level"]);
        const newRank = this._getRankName(level);
        formData["system.rank"] = newRank;
      }
      
      // Traitement spécial pour les talents
      for (const [key, value] of Object.entries(formData)) {
        if (key.match(/system\.talents\.[^.]+\.value/)) {
          // S'assurer que les valeurs des talents sont des nombres
          formData[key] = Number(value) || 0;
        }
      }
      
      // Journaliser les données avant la mise à jour
      console.log("Empire Long-Hu | Mise à jour de l'objet avec données:", formData);
      
      return super._updateObject(event, formData);
    } catch (error) {
      console.error("Empire Long-Hu | Erreur lors de la mise à jour de l'objet:", error);
      ui.notifications.error("Erreur lors de l'enregistrement des modifications. Consultez la console pour plus de détails.");
      return false;
    }
  }
  
  /** @override */
  async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();
    
    try {
      // Récupérer les données du formulaire
      const formData = this._getSubmitData();
      
      // Convertir toutes les valeurs numériques
      for (const [key, value] of Object.entries(formData)) {
        if (typeof value === "string" && !isNaN(Number(value)) && key.includes("system.")) {
          formData[key] = Number(value);
        }
      }
      
      // Mettre à jour le niveau et le rang si nécessaire
      if (formData["system.level"]) {
        const level = parseInt(formData["system.level"]);
        const newRank = this._getRankName(level);
        formData["system.rank"] = newRank;
      }
      
      // Traitement spécial pour les talents
      for (const [key, value] of Object.entries(formData)) {
        if (key.match(/system\.talents\.[^.]+\.value/)) {
          // S'assurer que les valeurs des talents sont des nombres
          formData[key] = Number(value) || 0;
        }
      }
      
      // Mettre à jour l'acteur
      console.log("Empire Long-Hu | Soumission du formulaire avec données:", formData);
      return this.actor.update(formData);
    } catch (error) {
      console.error("Empire Long-Hu | Erreur lors de la soumission du formulaire:", error);
      ui.notifications.error("Erreur lors de l'enregistrement des modifications. Consultez la console pour plus de détails.");
      return false;
    }
  }
}