import { EmpireActorSheet } from "./actor-sheet.mjs";

export class PersonnageSheet extends EmpireActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "personnage-sheet"],
      template: "systems/empire-long-hu/templates/actor/personnage-sheet.hbs"
    });
  }
}