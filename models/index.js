const User = require('./User');
const PC_build = require('./PC_build');
const Part = require('./Part');

User.hasMany(PC_build, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

PC_build.belongsTo(User, {
  foreignKey: 'user_id'
});

PC_build.belongsToMany(Part, { 
  through: 'PC_build_parts' });

Part.belongsToMany(PC_build, { 
  through: 'PC_build_parts' });


module.exports = { User, PC_build, Part };
