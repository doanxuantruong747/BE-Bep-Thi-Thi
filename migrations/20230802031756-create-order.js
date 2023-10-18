/** @format */

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      products: {
        type: Sequelize.TEXT('long'),
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      total_bill: {
        type: Sequelize.DOUBLE,
      },
      is_delete: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:'NEW_ORDER'
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  },
};
