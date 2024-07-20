const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PcBuild extends Model {}

  PcBuild.init({
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
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PcBuild',
  });

  return PcBuild;
};
