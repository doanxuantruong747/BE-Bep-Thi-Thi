'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class add - is - claim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  add - is - claim.init({
    is_claim: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'add-is-claim',
  });
  return add - is - claim;
};