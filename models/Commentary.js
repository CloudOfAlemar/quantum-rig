const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Commentary extends Model {}

Commentary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    guest_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'guest',
        key: 'id',
      },
    },
    pc_build_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pcBuild',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'commentary',
  }
);

module.exports = Commentary;
