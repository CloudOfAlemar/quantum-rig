const router = require('express').Router();
const { Part, PcBuild } = require('../../models');
const withAuth = require('../../utils/auth');
const partData = require('../../seeds/formattedPart.json');

router.post('/', withAuth, async (req, res) => {
  try {
    const partAdded = partData.filter(part => req.body.includes(part.name));
    const pcBuildData = await PcBuild.findAll({
      limit: 1,
      order: [['id', 'DESC']]
    });
    const pcBuild = pcBuildData.map( pc => pc.get({ plain: true }));
    console.log(partAdded, pcBuild);
    const updatedParts = partAdded.map(part => ({
      ...part,
      pc_build_id: pcBuild[0].id
    }));
    const parts = await Part.bulkCreate(updatedParts, {
      individualHooks: true,
      returning: true
    });
    res.status(200).json({ message: "SUCCESS"});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;
