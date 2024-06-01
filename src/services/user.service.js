//users service layer to perform datasabe modifications

const httpStatus = require("http-status");
const {User}=require("../models")
const ApiError = require("../utils/ApiError");
const bcrypt=require("bcryptjs")

//function to encrypt(hash) password and store user data 
async function createUser(user){
    
    const salt=await bcrypt.genSalt()
    const hashedPassword=await bcrypt.hash(user.password,salt)
    const newUser=await User.create({...user,password:hashedPassword})
    return newUser
}


//function to login user and compare the hash password 
async function loginUserWithUsernameAndPassword(user){
    let {username,password}=user
    console.log(username,password)
    const userData=await User.findOne({username})
    console.log(userData)
    if(!userData||!await bcrypt.compare(password,userData.password))
        {throw new ApiError(httpStatus.UNAUTHORIZED,"Invalid username or password")}
    return userData
    
}

module.exports={
    createUser,
    loginUserWithUsernameAndPassword,
}

