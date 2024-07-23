

// old stuff
// const User = require('./User');
// const Project = require('./Project');


//new stuff; some wierd casing stuff will fix later
const Guest = require('./Guest');
const PcPart = require('./pcPart');
const PcBuild = require('./pcBuild2');


// Associations
Guest.hasMany(PcBuild, { foreignKey: 'userId', onDelete: 'CASCADE' });
PcBuild.belongsTo(Guest, { foreignKey: 'userId' });

//old stuff
Guest.hasMany(PcBuild, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

PcPart.belongsTo(PcBuild, {
  foreignKey: 'pc_build_id'
});

module.exports = { Guest, PcPart, PcBuild };
