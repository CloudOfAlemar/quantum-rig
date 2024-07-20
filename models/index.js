
// old stuff
// const User = require('./User');
// const Project = require('./Project');


//new stuff; some wierd casing stuff will fix later
const User = require('./User')(sequelize);
const PcPart = require('./PcPart')(sequelize);
const PcBuild = require('./pcBuild')(sequelize);


User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project };
