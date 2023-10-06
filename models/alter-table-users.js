'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alter - table - users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  alter - table - users.init({
    role_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'alter-table-users',
  });
  return alter - table - users;
};