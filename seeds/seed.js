const sequelize = require('../config/connection');
const { Guest, PcBuild, Part} = require('../models');

const guestData = require('./guestData.json');
const pc_build_data = require('./pcBuildData.json');
const part_data = require('./partData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const guests = await Guest.bulkCreate(guestData, {
    individualHooks: true,
    returning: true,
  });

  for (const pc_build of pc_build_data) {
    await PcBuild.create({
      ...pc_build
    });
  };

  const parts = await Part.bulkCreate(part_data);

  process.exit(0);
};

seedDatabase();