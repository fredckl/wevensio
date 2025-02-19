'use strict'

const jwt = require('jsonwebtoken')
const app = require('../../config/app')

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
    await queryInterface.bulkInsert('app_tokens', [{
      userId: 1,
      token: jwt.sign({ id: 1 }, app.jwtSecret, { expiresIn: '1h' }),
      type: 'bearer',
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 * 30),
      createdAt: new Date(),
      updatedAt: new Date(),
      appName: 'wevensio'
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('app_tokens', null, {})
  }
}
