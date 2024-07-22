
const sequelize = require('../config/connection');

// old stuff
// const User = require('./User');
// const Project = require('./Project');


//new stuff; some wierd casing stuff will fix later
const Guest = require('./Guest')(sequelize);
const PcPart = require('./PcPart')(sequelize);
const PcBuild = require('./pcBuild2')(sequelize);


// Associations
Guest.hasMany(PcBuild, { foreignKey: 'userId', onDelete: 'CASCADE' });
PcBuild.belongsTo(Guest, { foreignKey: 'userId' });

//old stuff
Guest.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Part.belongsTo(PcBuild, {
  foreignKey: 'pc_build_id'
});

module.exports = { Guest, PcPart, Project, PcBuild };
