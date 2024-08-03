const Guest = require('./Guest');
const PcBuild = require('./PcBuild');
const Part = require('./Part');
const PartChoice = require('./PartChoice');

Guest.hasMany(PcBuild, {
  foreignKey: 'guest_id',
  onDelete: 'CASCADE'
});

PcBuild.belongsTo(Guest, {
  foreignKey: 'guest_id'
});

PcBuild.hasMany(Part, {
  foreignKey: 'pc_build_id',
  onDelete: 'CASCADE'
});

Part.belongsTo(PcBuild, {
  foreignKey: 'pc_build_id'
});

module.exports = { Guest, PcBuild, Part, PartChoice};
