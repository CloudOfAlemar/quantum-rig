const path = require('path');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fs = require('fs');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Create a write stream for the access log in append mode
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers: {
    ...helpers,
    stringify: (context) => JSON.stringify(context, null, 2), // Custom helper to stringify objects
  },
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Middleware to make the logged_in variable available to all templates
app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in;
  next();
});

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use morgan for logging
app.use(morgan('combined', { stream: accessLogStream }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
