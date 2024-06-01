const express = require('express');
const tweetController = require("../../controllers/tweets.controller");
const validate=require("../../middlewares/validate")
const tweetValidation=require("../../validation/tweet.validation")
const auth=require("../../middlewares/auth")
const router = express.Router();
//main route for posting tweets 

//auth middleware to verify token and authorization then joi validation then sent to controller 
router.post('/',auth,validate(tweetValidation),  tweetController.postTweet);


module.exports = router;
