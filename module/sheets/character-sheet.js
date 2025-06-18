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
    
    // Récupération du mode d'édition
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
        await this.actor.setFlag("empire-long-hu", "editMode", isChecked);
        this.render(true);
      });
      
      // Gestion du bouton de sauvegarde
      html.find('.save-button').on('click', async (event) => {
        event.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = this._getSubmitData();
        
        // Mettre à jour le niveau et le rang
        if (formData.system?.level) {
          const level = parseInt(formData.system.level);
          const newRank = this._getRankName(level);
          formData.system.rank = newRank;
        }
        
        // Désactiver le mode édition
        await this.actor.setFlag("empire-long-hu", "editMode", false);
        
        // Soumettre le formulaire avec les données mises à jour
        await this._onSubmit(event, { updateData: formData });
        
        // Rafraîchir la feuille
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
          
          // Récupérer les données du formulaire
          const formData = this._getSubmitData();
          
          // Mettre à jour le niveau et le rang si nécessaire
          if (formData.system?.level) {
            const level = parseInt(formData.system.level);
            const newRank = this._getRankName(level);
            formData.system.rank = newRank;
          }
          
          // Soumettre le formulaire avec les données mises à jour
          await this._onSubmit(event, { updateData: formData });
          
          // Afficher l'indicateur de sauvegarde automatique
          const indicator = html.find('.auto-save-indicator');
          indicator.css('opacity', '1');
          setTimeout(() => {
            indicator.css('opacity', '0.8');
          }, 1000);
        }
      });
    }
  }
  
  /** @override */
  async _updateObject(event, formData) {
    // Mettre à jour le rang si le niveau a changé
    if (formData["system.level"]) {
      const level = parseInt(formData["system.level"]);
      const newRank = this._getRankName(level);
      formData["system.rank"] = newRank;
    }
    
    return super._updateObject(event, formData);
  }
  
  /** @override */
  async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
    // Permettre la soumission normale du formulaire
    return super._onSubmit(event, {updateData, preventClose, preventRender});
  }
}