const sequelize = require('../config/connection');
const { User, PCBuild, Part, PCBuildParts } = require('../models');

const userData = require('./userData.json');
const pcBuildData = require('./pcBuildData.json');
const partData = require('./partData.json');
const pcBuildPartsData = require('./pcBuildPartsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const pcBuilds = await PCBuild.bulkCreate(pcBuildData, {
    returning: true,
  });

  const parts = await Part.bulkCreate(partData, {
    returning: true,
  });

  await PCBuildParts.bulkCreate(pcBuildPartsData);

  process.exit(0);
};

seedDatabase();
