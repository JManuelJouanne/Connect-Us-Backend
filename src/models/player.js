'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
    }
  }
  Player.init({
    number: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};