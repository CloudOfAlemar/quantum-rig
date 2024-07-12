const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PC_build_parts extends Model {}

PC_build_parts.init(
  {
    pc_build_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'PC_build', key: 'id' }
    },
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Part', key: 'id' }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'PC_build_parts',
  }
);

module.exports = PC_build_parts;