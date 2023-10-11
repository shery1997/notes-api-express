const bycrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const userModel = require( '../models/user' );
const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async ( req, res ) => {

  //Existing user check
  const { username, email, password } = req.body;
  try {
    const existringUser = await userModel.findOne( { email: email } );
    if ( existringUser ) {
      return res.status( 400 ).json( { message: 'User already exists' } );
    }
    //Hashed Password
    const hashedPassword = await bycrypt.hash( password, 10 );
    
    //User Creation
    const result = await userModel.create( {
      username: username,
      password: hashedPassword,
      email: email
    } );

    //Token Generate
    const token = jwt.sign( { email: result.email, id: result._id }, SECRET_KEY );
    res.status( 201 ).json( { user: result, token: token } );
  }
  catch (error){
    console.log( error );
    res.status( 500 ).json( { message: 'Something went wrong' } );
  }


}

const signIn = async( req, res ) => {
  const { email, password } = req.body;
  try {
    //Existing email check
    const existringUser = await userModel.findOne( { email: email } );
    if ( !existringUser ) {
      return res.status( 404 ).json( { message: 'User not found' } );
    }
    //Match password entered
    const matchPassword = await bycrypt.compare( password, existringUser.password );
    if ( !matchPassword ) {
      return res.status( 400 ).json( { message: 'Invalid Credentials' } );
    }

    //Token Generate
    const token = jwt.sign( { email: existringUser.email, id: existringUser._id }, SECRET_KEY );
    res.status( 200 ).json( { user: existringUser, token: token } );

  }
  catch(error){
    console.log( error );
    res.status( 500 ).json( { message: 'Something went wrong' } );
  }
}

module.exports = {
  signIn , signUp
}