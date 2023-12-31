'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sponsors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sponsors.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sponsors',
  });
  return sponsors;
};