const router = require('express').Router();
const { PcBuild, Guest, Part, PartChoice, Commentary } = require('../models');
const withAuth = require('../utils/auth');

router.get( "/", async ( req, res ) => {
  try {
    res.render( "landingPage", {
      logged_in: req.session.logged_in 
    } );
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
router.get( "/forge", withAuth, async ( req, res ) => {
  try {
    const partData = await PartChoice.findAll();
    const parts = partData.map(part => part.get({plain: true}));

    const cpuParts = parts.filter(part => part.type === "CPU");
    const gpuParts = parts.filter(part => part.type === "GPU");
    const caseParts = parts.filter(part => part.type === "Case");

    const coolerParts = parts.filter(part => part.type === "CPU Cooler");

    const memoryParts = parts.filter(part => part.type === "Memory");

    const motherboardParts = parts.filter(part => part.type === "Motherboard");

    const psuParts = parts.filter(part => part.type === "PSU");

    const storageParts = parts.filter(part => part.type === "Storage");

    let partsArray = [
      { 
      name : "Case", 
      parts : {budget: JSON.stringify(caseParts.filter(part => part.priceRange === 'budget')),
               high_end: JSON.stringify(caseParts.filter(part => part.priceRange === 'high-end')),
               mid_range: JSON.stringify(caseParts.filter(part => part.priceRange === 'mid-range'))
              }
      },
      { 
        name : "Cooler", 
        parts : {budget: JSON.stringify(coolerParts.filter(part => part.priceRange === 'budget')),
                high_end: JSON.stringify(coolerParts.filter(part => part.priceRange === 'high-end')),
                mid_range: JSON.stringify(coolerParts.filter(part => part.priceRange === 'mid-range'))
       } 
      },
      { 
        name : "CPU", 
        parts : {budget: JSON.stringify(cpuParts.filter(part => part.priceRange === 'budget')),
                high_end: JSON.stringify(cpuParts.filter(part => part.priceRange === 'high-end')),
                mid_range: JSON.stringify(cpuParts.filter(part => part.priceRange === 'mid-range'))
       }
      },
      { 
        name : "GPU", 
        parts : {budget: JSON.stringify(gpuParts.filter(part => part.priceRange === 'budget')),
                high_end: JSON.stringify(gpuParts.filter(part => part.priceRange === 'high-end')),
                mid_range: JSON.stringify(gpuParts.filter(part => part.priceRange === 'mid-range'))
       } 
      },
      { 
        name : "Memory", 
        parts : {budget: JSON.stringify(memoryParts.filter(part => part.priceRange === 'budget')),
                high_end: JSON.stringify(memoryParts.filter(part => part.priceRange === 'high-end')),
                mid_range: JSON.stringify(memoryParts.filter(part => part.priceRange === 'mid-range'))
       }
      },
      { 
        name : "Motherboard", 
        parts : {budget: JSON.stringify(motherboardParts.filter(part => part.priceRange === 'budget')),
                high_end: JSON.stringify(motherboardParts.filter(part => part.priceRange === 'high-end')),
                mid_range: JSON.stringify(motherboardParts.filter(part => part.priceRange === 'mid-range'))
       }
      },
      { 
        name : "PSU", 
        parts : {budget: JSON.stringify(psuParts.filter(part => part.priceRange === 'budget')),
                high_end: JSON.stringify(psuParts.filter(part => part.priceRange === 'high-end')),
                mid_range: JSON.stringify(psuParts.filter(part => part.priceRange === 'mid-range'))
       }
      },
      { 
        name : "Storage", 
        parts : {budget: JSON.stringify(storageParts.filter(part => part.priceRange === 'budget')),
                high_end: JSON.stringify(storageParts.filter(part => part.priceRange === 'high-end')),
                mid_range: JSON.stringify(storageParts.filter(part => part.priceRange === 'mid-range'))
       }
      }
    ];

    partsArray = partsArray.map(part => ({
      ...part,
      parts: {
        budget: JSON.parse(part.parts.budget),
        mid_range: JSON.parse(part.parts.mid_range),
        high_end: JSON.parse(part.parts.high_end)
      }
    }));
    console.log(partsArray);
    res.render( "forge", { partsArray } );
  } catch( error ) {
    console.log(error);
    res.status( 500 ).json( { error } );
  }
} );

router.get('/pcBuilds/:id', withAuth, async (req, res) => {
  try {
    const pcBuildData = await PcBuild.findByPk(req.params.id, {
      include: [
        {
          model: Guest,
          attributes: ['name'],
        },
        {
          model: Part
        },
        {
          model: Commentary,
          include: [
            {
              model: Guest,
            }
          ]
        },
      ],
    });

    const pcBuild = pcBuildData.get({ plain: true });
    console.log(JSON.stringify(pcBuild));
    let total = 0;
    console.log(pcBuild.parts.map(part => total+= part.price));
    res.render('pcBuild', {
      ...pcBuild,
      total,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comments/', async (req, res) => {
  try {
    // Get all blogPosts and JOIN with user data
    const commentData = await Commentary.findAll({
      include: [
        {
          model: Guest,
          attributes: ['name'],
        },
        {
          model: PcBuild
        }
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.status(200).json(comments)
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
    res.redirect('/');
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

router.get('/signup', (req, res) => {
  res.render('signup');
} 
);

module.exports = router;
