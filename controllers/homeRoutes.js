const router = require('express').Router();
const { PcBuild, Guest, Part} = require('../models');
const withAuth = require('../utils/auth');

router.get( "/", async ( req, res ) => {
  try {
    res.render( "landingPage" );
  } catch( error ) {
    res.status( 500 ).json( { error } );
  }
} );

router.get('/builds', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const pcBuildData = await PcBuild.findAll({
      include: [
        {
          model: Guest,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const pcBuilds = pcBuildData.map((pcBuild) => pcBuild.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      pcBuilds, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/pcBuilds/:id', async (req, res) => {
  try {
    const pcBuildData = await PcBuild.findByPk(req.params.id, {
      include: [
        {
          model: Guest,
          attributes: ['name'],
        },
        {
          model: Part
        }
      ],
    });

    const pcBuild = pcBuildData.get({ plain: true });

    res.render('pcBuild', {
      ...pcBuild,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const guestData = await Guest.findByPk(req.session.guest_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: PcBuild }],
    });

    const guest = guestData.get({ plain: true });
    console.log(JSON.stringify(guest));
    res.render('profile', {
      ...guest,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
