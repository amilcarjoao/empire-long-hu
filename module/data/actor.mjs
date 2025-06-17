import { SystemDataModel } from "../system/model.mjs";

/**
 * Modèle de données de base pour les acteurs
 * @extends {SystemDataModel}
 */
class BaseActorDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      biography: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.HTMLField({required: false, blank: true, initial: ""}),
        public: new foundry.data.fields.HTMLField({required: false, blank: true, initial: ""})
      }),
      niveau: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, initial: 0})
      }),
      speeds: new foundry.data.fields.SchemaField({
        walk: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 9}),
          unit: new foundry.data.fields.StringField({required: true, initial: "m"})
        }),
        swim: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 4.5}),
          unit: new foundry.data.fields.StringField({required: true, initial: "m"})
        }),
        climb: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 4.5}),
          unit: new foundry.data.fields.StringField({required: true, initial: "m"})
        }),
        fly: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 0}),
          unit: new foundry.data.fields.StringField({required: true, initial: "m"})
        }),
        burrow: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 0}),
          unit: new foundry.data.fields.StringField({required: true, initial: "m"})
        })
      })
    };
  }
}

/**
 * Modèle de données pour les ressources
 * @extends {SystemDataModel}
 */
class ResourcesDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      chi: new foundry.data.fields.SchemaField({
        corporel: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 0}),
          max: new foundry.data.fields.NumberField({required: true, initial: 0})
        }),
        spirituel: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 0}),
          max: new foundry.data.fields.NumberField({required: true, initial: 0})
        })
      }),
      souffle: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, initial: 0}),
        max: new foundry.data.fields.NumberField({required: true, initial: 0})
      })
    };
  }
}

/**
 * Modèle de données pour les éléments
 * @extends {SystemDataModel}
 */
class ElementsDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      metal: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, initial: 0}),
        max: new foundry.data.fields.NumberField({required: true, initial: 5})
      }),
      eau: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, initial: 0}),
        max: new foundry.data.fields.NumberField({required: true, initial: 5})
      }),
      terre: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, initial: 0}),
        max: new foundry.data.fields.NumberField({required: true, initial: 5})
      }),
      bois: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, initial: 0}),
        max: new foundry.data.fields.NumberField({required: true, initial: 5})
      }),
      feu: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, initial: 0}),
        max: new foundry.data.fields.NumberField({required: true, initial: 5})
      })
    };
  }
}

/**
 * Modèle de données pour les personnages
 * @extends {SystemDataModel}
 */
class CharacterDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseActorDataModel.defineSchema(),
      ResourcesDataModel.defineSchema(),
      ElementsDataModel.defineSchema(),
      {
        level: new foundry.data.fields.NumberField({required: true, initial: 1}),
        rank: new foundry.data.fields.StringField({required: false, initial: "Rustique"}),
        experience: new foundry.data.fields.NumberField({required: true, initial: 0}),
        class: new foundry.data.fields.StringField({required: false, initial: ""}),
        voix: new foundry.data.fields.SchemaField({
          esprit: new foundry.data.fields.StringField({required: false, initial: ""}),
          corps: new foundry.data.fields.StringField({required: false, initial: ""})
        }),
        talents: new foundry.data.fields.ObjectField({required: true, initial: {}})
      }
    );
  }
}

/**
 * Modèle de données pour les véhicules
 * @extends {SystemDataModel}
 */
class VehicleDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseActorDataModel.defineSchema(),
      {
        crew: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField()),
        cargo: new foundry.data.fields.SchemaField({
          capacity: new foundry.data.fields.NumberField({required: true, initial: 0}),
          used: new foundry.data.fields.NumberField({required: true, initial: 0})
        })
      }
    );
  }
}

/**
 * Modèle de données pour les marchands
 * @extends {SystemDataModel}
 */
class MerchantDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseActorDataModel.defineSchema(),
      {
        inventory: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField()),
        speciality: new foundry.data.fields.StringField({required: false, initial: ""}),
        priceModifier: new foundry.data.fields.NumberField({required: true, initial: 1.0})
      }
    );
  }
}

/**
 * Modèle de données pour les régiments
 * @extends {SystemDataModel}
 */
class RegimentDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseActorDataModel.defineSchema(),
      {
        organization: new foundry.data.fields.SchemaField({
          slots: new foundry.data.fields.ObjectField({required: true, initial: {}}),
          members: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField())
        }),
        actions: new foundry.data.fields.ObjectField({required: true, initial: {}}),
        resources: new foundry.data.fields.SchemaField({
          supplies: new foundry.data.fields.SchemaField({
            value: new foundry.data.fields.NumberField({required: true, initial: 0}),
            max: new foundry.data.fields.NumberField({required: true, initial: 0})
          })
        }),
        parent: new foundry.data.fields.StringField({required: false, nullable: true, initial: null}),
        children: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField())
      }
    );
  }
}

/**
 * Modèle de données pour les acteurs
 */
export class EmpireLongHuActorDataModel {
  static character = CharacterDataModel;
  static vehicle = VehicleDataModel;
  static merchant = MerchantDataModel;
  static regiment = RegimentDataModel;
}