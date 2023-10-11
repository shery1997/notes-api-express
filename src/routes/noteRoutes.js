const express = require( 'express' );
const { getNotes, createNote, deleteNote, updateNote } = require( '../controllers/noteController' );
const auth = require( '../middlewares/auth' );
const noteRoutes = express.Router();

noteRoutes.get( '/', auth, getNotes );

noteRoutes.post( '/', auth, createNote );

noteRoutes.delete( '/:id', auth, deleteNote );

noteRoutes.put( '/:id', auth, updateNote );

module.exports = noteRoutes;