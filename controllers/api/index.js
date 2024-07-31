const router = require('express').Router();
const guestRoutes = require('./guestRoutes');
const pcBuildRoutes = require('./pcBuildRoutes');
const partRoutes = require('./partRoutes');

router.use('/guests', guestRoutes);
router.use('/pcBuilds', pcBuildRoutes);
router.use('/parts', partRoutes);
module.exports = router;
