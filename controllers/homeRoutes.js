const router = require('express').Router();
const { PCBuild, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const pcBuildData = await PCBuild.findAll({
      include: [{ model: User, attributes: ['name'] }],
    });

    const pcBuilds = pcBuildData.map((pcBuild) => pcBuild.get({ plain: true }));

    res.render('homepage', { 
      pcBuilds, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/build', withAuth, (req, res) => {
  res.render('build');
});

router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: PCBuild }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
