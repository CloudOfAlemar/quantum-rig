const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PartChoice extends Model {}

PartChoice.init(
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
    priceRange: {
        type: DataTypes.STRING,
        validate: {
            isIn: ["high-end", "mid-range", "budget"]
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'partChoice',
  }
);

module.exports = PartChoice;
