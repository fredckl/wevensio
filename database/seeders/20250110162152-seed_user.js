'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const password = await bcrypt.hash('root', 10)
    const now = new Date()
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName: 'Frédéric',
        lastName: 'KOLLER',
        email: 'fredckl.dev@wevensio.com',
        password,
        emailVerifiedAt: now,
        createdAt: now,
        updatedAt: now
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
}
