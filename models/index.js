const Guest = require('./Guest');
const PC_build = require('./PC_build');
const Part = require('./Part');

Guest.hasMany(PC_build, {
  foreignKey: 'guest_id',
  onDelete: 'CASCADE'
});

PC_build.belongsTo(Guest, {
  foreignKey: 'guest_id'
});

PC_build.hasMany(Part, {
  foreignKey: 'pc_build_id',
  onDelete: 'CASCADE'
});

Part.belongsTo(PC_build, {
  foreignKey: 'pc_build_id'
});

module.exports = { Guest, PC_build, Part};
