const sequelize = require('../config/connection');
const { User, PcPart, PcBuild } = require('../models');

const userData = require('./userData.json');
const pcPartData = require('./pcPartData.json');
const pcBuildData = require('./pcBuildData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed pcPartData without user association
  await PcPart.bulkCreate(pcPartData);

  // Seed pcBuildData without user association
  await PcBuild.bulkCreate(pcBuildData);

  process.exit(0);
};

seedDatabase();