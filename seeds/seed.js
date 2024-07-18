const sequelize = require('../config/connection');
const { Guest, PC_build, Part, PC_build_parts} = require('../models');

const guestData = require('./guestData.json');
const pc_build_data = require('./PC_Build_Data.json');
const part_data = require('./partData.json');
const pc_build_parts_data = require('./pc_build_parts_data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const guests = await Guest.bulkCreate(guestData, {
    individualHooks: true,
    returning: true,
  });

  for (const pc_build of pc_build_data) {
    await PC_build.create({
      ...pc_build
    });
  };

  const parts = await Part.bulkCreate(part_data);

  const pc_build_parts = await PC_build_parts.bulkCreate(pc_build_parts_data);

  process.exit(0);
};

seedDatabase();