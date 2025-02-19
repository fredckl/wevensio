'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AppToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  AppToken.init({
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    appName: DataTypes.STRING,
    userId: DataTypes.BIGINT,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AppToken',
    tableName: 'app_tokens'
  })
  return AppToken
}
