import { SystemDataModel } from "../system/model.mjs";

/**
 * Modèle de données de base pour les objets
 * @extends {SystemDataModel}
 */
class BaseItemDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      description: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.HTMLField({required: false, blank: true, initial: ""}),
        chat: new foundry.data.fields.HTMLField({required: false, blank: true, initial: ""})
      }),
      quantity: new foundry.data.fields.NumberField({required: true, initial: 1}),
      weight: new foundry.data.fields.NumberField({required: true, initial: 0})
    };
  }
}

/**
 * Modèle de données pour les objets physiques
 * @extends {SystemDataModel}
 */
class PhysicalItemDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      price: new foundry.data.fields.NumberField({required: true, initial: 0}),
      rarity: new foundry.data.fields.StringField({required: true, initial: "common"}),
      condition: new foundry.data.fields.NumberField({required: true, initial: 100})
    };
  }
}

/**
 * Modèle de données pour les armes
 * @extends {SystemDataModel}
 */
class WeaponDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      PhysicalItemDataModel.defineSchema(),
      {
        quality: new foundry.data.fields.StringField({required: false, initial: ""}),
        element: new foundry.data.fields.StringField({required: false, initial: ""}),
        bonus: new foundry.data.fields.NumberField({required: true, initial: 0}),
        durability: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({required: true, initial: 10}),
          max: new foundry.data.fields.NumberField({required: true, initial: 10})
        }),
        damage: new foundry.data.fields.SchemaField({
          formula: new foundry.data.fields.StringField({required: true, initial: "1d6"}),
          type: new foundry.data.fields.StringField({required: true, initial: "physical"})
        }),
        defense: new foundry.data.fields.NumberField({required: true, initial: 0}),
        dodge: new foundry.data.fields.NumberField({required: true, initial: 0})
      }
    );
  }
}

/**
 * Modèle de données pour les armures
 * @extends {SystemDataModel}
 */
class ArmorDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      PhysicalItemDataModel.defineSchema(),
      {
        level: new foundry.data.fields.NumberField({required: true, initial: 1}),
        type: new foundry.data.fields.StringField({required: false, initial: ""}),
        condition: new foundry.data.fields.NumberField({required: true, initial: 100}),
        resistances: new foundry.data.fields.ObjectField({required: true, initial: {}}),
        defense: new foundry.data.fields.NumberField({required: true, initial: 0})
      }
    );
  }
}

/**
 * Modèle de données pour l'équipement
 * @extends {SystemDataModel}
 */
class EquipmentDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      PhysicalItemDataModel.defineSchema(),
      {
        equipped: new foundry.data.fields.BooleanField({required: true, initial: false}),
        attunement: new foundry.data.fields.NumberField({required: true, initial: 0})
      }
    );
  }
}

/**
 * Modèle de données pour les classes
 * @extends {SystemDataModel}
 */
class ClassDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      {
        level: new foundry.data.fields.NumberField({required: true, initial: 1}),
        abilities: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField())
      }
    );
  }
}

/**
 * Modèle de données pour les backgrounds
 * @extends {SystemDataModel}
 */
class BackgroundDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      {
        traits: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField())
      }
    );
  }
}

/**
 * Modèle de données pour les apprentissages
 * @extends {SystemDataModel}
 */
class LearningDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      {
        level: new foundry.data.fields.NumberField({required: true, initial: 1}),
        progress: new foundry.data.fields.NumberField({required: true, initial: 0}),
        teacher: new foundry.data.fields.StringField({required: false, initial: ""})
      }
    );
  }
}

/**
 * Modèle de données pour les techniques
 * @extends {SystemDataModel}
 */
class TechniqueDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      {
        level: new foundry.data.fields.NumberField({required: true, initial: 1}),
        element: new foundry.data.fields.StringField({required: false, initial: ""}),
        cost: new foundry.data.fields.SchemaField({
          chi: new foundry.data.fields.NumberField({required: true, initial: 0}),
          souffle: new foundry.data.fields.NumberField({required: true, initial: 0})
        })
      }
    );
  }
}

/**
 * Modèle de données pour les objets divers
 * @extends {SystemDataModel}
 */
class ObjectDataModel extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return foundry.utils.mergeObject(
      BaseItemDataModel.defineSchema(),
      PhysicalItemDataModel.defineSchema()
    );
  }
}

/**
 * Modèle de données pour les objets
 */
export class EmpireLongHuItemDataModel {
  static weapon = WeaponDataModel;
  static armor = ArmorDataModel;
  static equipment = EquipmentDataModel;
  static class = ClassDataModel;
  static background = BackgroundDataModel;
  static learning = LearningDataModel;
  static technique = TechniqueDataModel;
  static object = ObjectDataModel;
}