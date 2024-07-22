const sequelize = require('../config/connection');
const { Guest, PcPart, PcBuild } = require('../models');

const guestData = require('./guestData.json');
const pcPartData = require('./pcPartData.json');
const pcBuildData = require('./pcBuildData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Guest.bulkCreate(guestData, {
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