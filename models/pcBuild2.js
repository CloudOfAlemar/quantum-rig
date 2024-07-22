// i had some weird conflicts so i had to make this pcBuild2 
const { Model, DataTypes } = require('sequelize');
const sequelize = require( "../config/connection" );

class PcBuild extends Model {}

PcBuild.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pcPartsList: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'pcBuild',
  }
);

module.exports = PcBuild;


