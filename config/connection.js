const Sequelize = require('sequelize');
// const path = require( "path" );
// require( "dotenv" ).config( { path : path.resolve( __dirname, "../.env" ) } );
require('dotenv').config();


let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.HOST,
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;
