export class EmpireItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "item", "empire-sheet"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  get template() {
    const path = "systems/empire-long-hu/templates/item";
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  getData() {
    const data = super.getData();
    data.config = game.empire.config;
    
    return data;
  }
}