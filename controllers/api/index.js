const router = require('express').Router();
const guestRoutes = require('./guestRoutes');
const pcBuildRoutes = require('./pcBuildRoutes');

router.use('/guests', guestRoutes);
router.use('/pcBuilds', pcBuildRoutes);

module.exports = router;
