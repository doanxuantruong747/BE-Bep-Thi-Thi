/** @format */

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      _id_user: {
        type: Sequelize.STRING,
        defaultValue:null,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
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
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      active_code: {
        type: Sequelize.STRING,
      },
      passcode: {
        type: Sequelize.STRING,
      },
      finger: {
        type: Sequelize.TEXT('long'),
      },
      avatar: {
        type: Sequelize.STRING,
      },
      fcm_token: {
        type: Sequelize.STRING,
      },
      accessToken: {
        type: Sequelize.STRING,
      },
      is_delete: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ADMIN');
  },
};

//  npx sequelize-cli model:generate --name users --attributes firstName:string,lastName:string,email:string
