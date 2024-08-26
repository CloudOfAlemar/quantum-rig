const sequelize = require('../config/connection');
const { Guest, PcBuild, Part, PartChoice, Commentary } = require('../models');

const guestData = require('./guestData.json');
const pc_build_data = require('./pcBuildData.json');
const part_data = require('./formattedPart.json');
const commentData = require('./commentData.json');

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

  const partChoice = await PartChoice.bulkCreate(part_data, {
    individualHooks: true,
    returning: true,
  });

  const cpuData = part_data.filter(part => part.type === 'CPU');
  const gpuData = part_data.filter(part => part.type === 'GPU');
  const motherboardData = part_data.filter(part => part.type === 'Motherboard');
  const ramData = part_data.filter(part => part.type === 'Memory');
  const ssdData = part_data.filter(part => part.type === 'Storage');
  const psuData = part_data.filter(part => part.type === 'PSU');
  const caseData = part_data.filter(part => part.type === 'Case');
  const coolerData = part_data.filter(part => part.type === 'CPU Cooler');

  let randomParts1 = [];
  let randomParts2 = [];
  let randomParts3 = [];
  randomParts1.push(cpuData[Math.floor((Math.random() * cpuData.length))]);
  randomParts1.push(gpuData[Math.floor((Math.random() * gpuData.length))]);
  randomParts1.push(motherboardData[Math.floor((Math.random() * motherboardData.length))]);
  randomParts1.push(ramData[Math.floor((Math.random() * ramData.length))]);
  randomParts1.push(ssdData[Math.floor((Math.random() * ssdData.length))]);
  randomParts1.push(psuData[Math.floor((Math.random() * psuData.length))]);
  randomParts1.push(caseData[Math.floor((Math.random() * caseData.length))]);
  randomParts1.push(coolerData[Math.floor((Math.random() * coolerData.length))]);
  const updatedParts1 = randomParts1.map(part => ({
    ...part,
    pc_build_id: 1
  }));
  randomParts2.push(cpuData[Math.floor((Math.random() * cpuData.length))]);
  randomParts2.push(gpuData[Math.floor((Math.random() * gpuData.length))]);
  randomParts2.push(motherboardData[Math.floor((Math.random() * motherboardData.length))]);
  randomParts2.push(ramData[Math.floor((Math.random() * ramData.length))]);
  randomParts2.push(ssdData[Math.floor((Math.random() * ssdData.length))]);
  randomParts2.push(psuData[Math.floor((Math.random() * psuData.length))]);
  randomParts2.push(caseData[Math.floor((Math.random() * caseData.length))]);
  randomParts2.push(coolerData[Math.floor((Math.random() * coolerData.length))]);
  const updatedParts2 = randomParts2.map(part => ({
    ...part,
    pc_build_id: 2
  }));

  randomParts3.push(cpuData[Math.floor((Math.random() * cpuData.length))]);
  randomParts3.push(gpuData[Math.floor((Math.random() * gpuData.length))]);
  randomParts3.push(motherboardData[Math.floor((Math.random() * motherboardData.length))]);
  randomParts3.push(ramData[Math.floor((Math.random() * ramData.length))]);
  randomParts3.push(ssdData[Math.floor((Math.random() * ssdData.length))]);
  randomParts3.push(psuData[Math.floor((Math.random() * psuData.length))]);
  randomParts3.push(caseData[Math.floor((Math.random() * caseData.length))]);
  randomParts3.push(coolerData[Math.floor((Math.random() * coolerData.length))]);
  const updatedParts3 = randomParts3.map(part => ({
    ...part,
    pc_build_id: 3
  }));
  console.log(randomParts1);

  const parts1 = await Part.bulkCreate(updatedParts1, {
    individualHooks: true,
    returning: true
  });

  const parts2 = await Part.bulkCreate(updatedParts2, {
    individualHooks: true,
    returning: true
  });

  const parts3 = await Part.bulkCreate(updatedParts3, {
    individualHooks: true,
    returning: true
  });

  for (const comment of commentData) {
    await Commentary.create({
      ...comment,
      guest_id: guests[Math.floor(Math.random() * guests.length)].id,
      pc_build_id: guests[Math.floor(Math.random() * guests.length)].id
    });
  }


  process.exit(0);
};

seedDatabase();