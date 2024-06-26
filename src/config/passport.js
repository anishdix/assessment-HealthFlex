//passport-jwt Strategy for jwt token verification 

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { tokenTypes } = require("./tokens");
const {User}=require("../models")
const secretOrKey = process.env.JWT_SECRET 
// console.log(secretOrKey,"key")
const jwtOptions = {
  secretOrKey: secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    // console.log(payload);

  
    if (payload.type !== tokenTypes.ACCESS) {
      return done(new Error("Invalid Token Type"), false);
    }

   
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

  
    done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
