const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const dotenv = require( 'dotenv' );
const cors = require( 'cors' );

dotenv.config();

/******CONVERTING REQUEST(req) BODY TO JSON WHICH IS OF STRING TYPE BY-DEFAULT******/
app.use( express.json() );

app.use( cors() );

const userRoutes = require( './src/routes/userRoutes' );
const noteRoutes = require( './src/routes/noteRoutes' );
const quoteRoutes = require( './src/routes/quoteRoutes' );


app.use( '/users', userRoutes );
app.use( '/note', noteRoutes );
app.use( '/', quoteRoutes );

app.get( '/', ( req, res ) => {
  res.send( 'Notes API dev using Express JS' );
} );

const mongoUrl = process.env.MONGO_URL;
const PORT = process.env.PORT;
/***********DB CONNECTION **********/
mongoose.connect(mongoUrl)
  .then( () => {
    app.listen( PORT || 8989, () => {
      console.log( 'Server started on port ' + PORT );
    } );
  } )
  .catch( (e) => console.log('Errors = ',e))

