export class EmpireActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "empire-sheet"],
      template: "systems/empire-long-hu/templates/actor/actor-sheet.hbs",
      width: 720,
      height: 680,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "caractéristiques" }]
    });
  }

  getData() {
    const data = super.getData();
    data.config = game.empire.config;
    
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Tout ce qui suit nécessite que la feuille soit éditable
    if (!this.isEditable) return;

    // Gestion des objets
    html.find('.item-create').click(this._onItemCreate.bind(this));
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
      li.slideUp(200, () => this.render(false));
    });
  }

  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const itemData = {
      name: `Nouvel ${game.i18n.localize(`empire-long-hu.items.${type}`)}`,
      type: type
    };
    return this.actor.createEmbeddedDocuments("Item", [itemData]);
  }
}