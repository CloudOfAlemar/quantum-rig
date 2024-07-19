const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PCBuildParts extends Model {}

PCBuildParts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pc_build_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pc_build',
        key: 'id',
      },
    },
    part_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'part',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pc_build_parts',
  }
);

module.exports = PCBuildParts;
