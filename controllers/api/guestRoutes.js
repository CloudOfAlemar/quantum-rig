const router = require('express').Router();
const { Guest } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const guestData = await Guest.create(req.body);

    req.session.save(() => {
      req.session.guest_id = guestData.id;
      req.session.logged_in = true;

      res.status(200).json(guestData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const guestData = await Guest.findOne({ where: { email: req.body.email } });

    if (!guestData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await guestData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.guest_id = guestData.id;
      req.session.logged_in = true;
      
      res.json({ guest: guestData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
