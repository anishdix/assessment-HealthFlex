//token service layer ,mainly genrating token and authenication user

const jwt = require("jsonwebtoken");

const { tokenTypes } = require("../config/tokens");


const generateToken = (newUser,expires,type,secret = process.env.JWT_SECRET) => {
  console.log(newUser,"new user")
  const payload={
    sub:newUser,
    type:type,
    exp:expires?expires:3000,
    iat:Date.now()/1000 
  }

  const jwtToken=jwt.sign(payload,secret);
  return jwtToken;
};


const generateAuthTokens = async (user) => {
  const expiration=Math.floor(Date.now()/1000)+process.env.JWT_ACCESS_EXPIRATION_MINUTES*60; 
  const GeneratedToken= generateToken(user._id,expiration,tokenTypes.ACCESS);

  return{
    access:{
      token:GeneratedToken,
      expires:new Date(expiration*1000)
    }
  }
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
