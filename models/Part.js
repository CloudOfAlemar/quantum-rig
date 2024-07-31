const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Part extends Model {}

Part.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ["CPU", "GPU", "Motherboard", "PSU", "CPU Cooler", "Memory", "Storage", "Case"]
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT
    },
    pc_build_id: {
        type: DataTypes.INTEGER,
        references: { model: 'pcBuild', key: 'id' }    
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'part',
  }
);

module.exports = Part;
