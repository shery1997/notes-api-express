const express = require( 'express' );
const quoteRoutes = express.Router();
const quotes = require( '../quotes.json' );

quoteRoutes.get( '/quotes', ( req, res ) => {
  res.json( quotes );
} );

quoteRoutes.get( '/randomQuote', ( req, res ) => {
  let index = Math.floor(Math.random() * quotes.length);
  let quote = quotes[ index ];
  res.json( quote );
} );

module.exports = quoteRoutes;