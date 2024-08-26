const router = require('express').Router();
const guestRoutes = require('./guestRoutes');
const pcBuildRoutes = require('./pcBuildRoutes');
const partRoutes = require('./partRoutes');
const commentRoutes =require('./commentRoutes');

router.use('/guests', guestRoutes);
router.use('/pcBuilds', pcBuildRoutes);
router.use('/parts', partRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
