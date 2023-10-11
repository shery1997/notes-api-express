const express = require( 'express' );
const { signUp, signIn } = require( '../controllers/userController' );
const userRoutes = express.Router();

userRoutes.post( '/signup', signUp );

userRoutes.post( '/signin', signIn );

module.exports = userRoutes;