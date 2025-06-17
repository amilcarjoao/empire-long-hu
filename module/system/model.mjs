/**
 * Classe de base pour les modèles de données du système
 * @extends {foundry.abstract.TypeDataModel}
 */
export class SystemDataModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static migrateData(source) {
    return source;
  }
  
  /** @inheritdoc */
  static cleanData(source) {
    return foundry.utils.deepClone(source);
  }
}