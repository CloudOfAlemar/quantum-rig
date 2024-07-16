const Guest = require('./Guest');
const PC_build = require('./PC_build');
const Part = require('./Part');
const PC_build_parts = require('./PC_build_parts');

PC_build.belongsTo(Guest, {
  foreignKey: 'guest_id'
});

Guest.hasMany(PC_build, {
  foreignKey: 'guest_id'
});

PC_build.belongsToMany(Part, { 
  through: {
    model: PC_build_parts,
    unique: false
  }
});

Part.belongsToMany(PC_build, { 
  through: {
    model: PC_build_parts,
    unique: false
  } });


module.exports = { Guest, PC_build, Part, PC_build_parts };
