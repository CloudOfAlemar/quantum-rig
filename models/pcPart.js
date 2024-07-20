const { Model, DataTypes } = require('sequelize');

class PcPart extends Model {}

PcPart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    priceRange: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['budget', 'mid-range', 'high-end']],
      },
    },
    averagePrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    
    },
  },
  {
    sequelize,
    modelName: 'pcPart',
  }
);

module.exports = PcPart;