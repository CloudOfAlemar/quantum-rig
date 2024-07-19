const User = require('./User');
const PCBuild = require('./PCBuild');
const Part = require('./Part');
const PCBuildParts = require('./PCBuildParts');

PCBuild.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(PCBuild, {
  foreignKey: 'user_id',
});

PCBuild.belongsToMany(Part, {
  through: {
    model: PCBuildParts,
    unique: false,
  },
});

Part.belongsToMany(PCBuild, {
  through: {
    model: PCBuildParts,
    unique: false,
  },
});

module.exports = { User, PCBuild, Part, PCBuildParts };
