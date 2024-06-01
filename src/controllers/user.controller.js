//user controller 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const {userService,tokenService}=require("../services")

//function to register user 
const register = catchAsync(async (req, res) => {
    console.log("in register")
  const userData = req.body;
  try {
    //calls the user service layer and if there is no error token is generated
    const newUser = await  userService.createUser(userData);
    // console.log(newUser)
    const token =await tokenService.generateToken(newUser)
    res
      .status(httpStatus.CREATED)
      .send({user:newUser,tokens:token,message:"craeted successfully"});
    
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});


//function to login user
const login = catchAsync(async (req, res) => {
  const userData = req.body;
  try {
    //calls the user service layer and check the name and password are present and authorization token is given to the user
    const user = await userService.loginUserWithUsernameAndPassword(userData)
    
    const token = await tokenService.generateAuthTokens(user)
    res.status(httpStatus.OK).json({ user,token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
});

module.exports = { register, login };
