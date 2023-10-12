/** @format */

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
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
      name: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      images: {
        type: Sequelize.TEXT('long'),
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT('long'),
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      pirce: {
        type: Sequelize.DOUBLE,
      },
      pirce_sale: {
        type: Sequelize.DOUBLE,
      },
      unit: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      is_delete: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
