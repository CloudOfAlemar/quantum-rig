const router = require('express').Router();
const { PC_build } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPcBuild = await PC_build.create({
      ...req.body,
      guest_id: req.session.guest_id,
    });

    res.status(200).json(newPcBuild);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const pcBuildData = await PC_build.destroy({
      where: {
        id: req.params.id,
        guest_id: req.session.guest_id,
      },
    });

    if (!pcBuildData) {
      res.status(404).json({ message: 'No PC Build found with this id!' });
      return;
    }

    res.status(200).json(pcBuildData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
