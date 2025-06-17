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
  getData() {
    const context = super.getData();
    
    // Ajout des helpers pour les rangs
    context.getRankName = this._getRankName.bind(this);
    context.getRankRange = this._getRankRange.bind(this);
    
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

    // Gestion du slider de niveau
    const levelSlider = html.find('.level-slider');
    const levelValue = html.find('.level-value');

    // Mise à jour de l'affichage du niveau lors du déplacement du slider
    levelSlider.on('input', (event) => {
      const newLevel = event.target.value;
      levelValue.text(newLevel);
      
      // Mise à jour du nom et de la plage de rang en temps réel
      const rankName = html.find('.rank-name');
      const rankRange = html.find('.rank-range');
      
      rankName.text(this._getRankName(newLevel));
      rankRange.text(this._getRankRange(newLevel));
    });
  }
}