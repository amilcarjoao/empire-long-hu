import { EmpireActorSheet } from "./actor-sheet.mjs";

export class PNJSheet extends EmpireActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["empire-long-hu", "sheet", "actor", "pnj-sheet"],
      template: "systems/empire-long-hu/templates/actor/pnj-sheet.hbs",
      width: 600,
      height: 600
    });
  }
}