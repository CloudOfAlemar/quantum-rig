const sequelize = require('../config/connection');
const { User, PC_build, Part } = require('../models');

// Sample data files
const userData = require('./userData.json');
const pcBuildData = require('./PC_Build_Data.json');
const partData = require('./partData.json');

// Function to seed the database
const seedDatabase = async () => {
  // Sync all models to the database (force:true will drop the table if it exists)
  await sequelize.sync({ force: true });

  try {
    // Create users
    const users = await User.bulkCreate(userData);

    // Create PC_builds
    const pc_builds = await PC_build.bulkCreate(pcBuildData);

    // Create Parts
    const parts = await Part.bulkCreate(partData);

    // Associate parts with PC_builds
    await Promise.all(
      parts.map(async (part, index) => {
        // Assign pc_build_id to parts based on pcBuildData
        const pc_build_id = pcBuildData[index % pcBuildData.length].id;
        await part.setPC_build(pc_build_id);
      })
    );

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await sequelize.close();
  }
};

// Execute the seedDatabase function
seedDatabase();