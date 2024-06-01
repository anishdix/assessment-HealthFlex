const express = require('express');
const userController = require('../../controllers/user.controller');
const tweetController=require("../../controllers/tweets.controller")
const validate=require("../../middlewares/validate")
const userValidation=require("../../validation/user.validation")
const auth=require("../../middlewares/auth")
const router = express.Router();

//user routes for login,register and filter pagination tweets

//auth middleware for token verification and authorization

//joi validation for req body 
router.post('/register',validate(userValidation.register) ,userController.register);
router.post('/login',validate(userValidation.login), userController.login);
router.get('/:userId/timeline',auth, tweetController.getTimeline);


module.exports = router;
