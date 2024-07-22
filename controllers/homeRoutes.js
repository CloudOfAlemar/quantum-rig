const router = require('express').Router();
const { PcBuild, Guest, Part} = require('../models');
const withAuth = require('../utils/auth');

const caseParts = require( "../seeds/partChoice/case.json" );
const coolerParts = require( "../seeds/partChoice/cooler.json" );
const cpuParts = require( "../seeds/partChoice/cpu.json" );
const gpuParts = require( "../seeds/partChoice/gpu.json" );
const memoryParts = require( "../seeds/partChoice/memory.json" );
const motherboardParts = require( "../seeds/partChoice/motherboard.json" );
const psuParts = require( "../seeds/partChoice/psu.json" );
const storageParts = require( "../seeds/partChoice/storage.json" );

const partsArray = [
  { name : "Case", parts : caseParts[ 0 ] },
  { name : "Cooler", parts : coolerParts[ 0 ] },
  { name : "CPU", parts : cpuParts[ 0 ] },
  { name : "GPU", parts : gpuParts[ 0 ] },
  { name : "Memory", parts : memoryParts[ 0 ] },
  { name : "Motherboard", parts : motherboardParts[ 0 ] },
  { name : "PSU", parts : psuParts[ 0 ] },
  { name : "Storage", parts : storageParts[ 0 ] }
];

console.log( partsArray[0].parts );

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
    res.render('builds', { 
      pcBuilds, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
  Creating Forge Routes ( Where we will build our PC )
*/
router.get( "/forge", async ( req, res ) => {
  try {
    res.render( "forge", { partsArray } );
  } catch( error ) {
    res.status( 500 ).json( { error } );
  }
} );

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
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const guestData = await Guest.findByPk(req.session.guest_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: PcBuild }],
    });

    const guest = guestData.get({ plain: true });
    console.log(JSON.stringify(guest));
    res.render('dashboard', {
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
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const guestData = await Guest.findByPk(req.session.guest_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: PcBuild }],
    });

    const guest = guestData.get({ plain: true });

    res.render('profile', {
      ...guest,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
} 
);

router.get('/signup', (req, res) => {
  res.render('signup');
} 
);

module.exports = router;
