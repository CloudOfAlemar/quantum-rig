const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PC_Build extends Model {}

PC_Build.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personal_comments: {
      type: DataTypes.STRING,
    },
    parts: {
      type: DataTypes.INTEGER,
      references: { model: 'Part', key: 'id' }    
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'PC_build',
  }
);

module.exports = PC_Build;
