
// old stuff
// const User = require('./User');
// const Project = require('./Project');


//new stuff; some wierd casing stuff will fix later
const User = require('./User')(sequelize);
const PcPart = require('./PcPart')(sequelize);
const PcBuild = require('./pcBuild2')(sequelize);


// Associations
User.hasMany(PcBuild, { foreignKey: 'userId', onDelete: 'CASCADE' });
PcBuild.belongsTo(User, { foreignKey: 'userId' });

//old stuff
User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, PcPart, Project, PcBuild };
