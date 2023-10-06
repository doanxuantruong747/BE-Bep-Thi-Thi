/** @format */

'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('123456', bcrypt.genSaltSync(8));
    return queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        userName: 'Admin',
        email: 'admin@gmail.com',
        password: password,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: true,
        active_code: '',
        role_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
