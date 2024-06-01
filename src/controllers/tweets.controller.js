//tweets controller
const httpStatus = require('http-status');
const mongoose = require("mongoose");
const {tweetService}=require("../services")


//function to add/post tweets
const postTweet = async (req, res) => {
   
    const userId = req.user._id; 
    const { text } = req.body;
    
    // console.log("userId:", userId); 
    // console.log("text:", text)
    try {
        // gets the id and text then adds the tweets to the database using tweet service layer
        const tweet = await tweetService.addTweet(userId, text);
        res.status(httpStatus.CREATED).send({ message: 'Tweet posted successfully',tweet });
        
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
    }
};

// function to get tweets of a user ,can filter the limit response required and reference to the last tweet is returned 
const getTimeline = async (req, res) => {
    // console.log(req.params, req.query);
    const { userId } = req.params;
    const { cursor, limit = 10 } = req.query; // Default limit to 10 if not provided
    
      if (cursor) {
        query._id = { $lt: cursor };
      }
  
      const tweets = await tweetService.getTweets(userId, parseInt(limit, 10));
      const nextCursor = tweets.length === parseInt(limit, 10) ? tweets[tweets.length - 1]._id : null;
  
      res.status(httpStatus.OK).send({ tweets, nextCursor });
    } 
  


module.exports = { postTweet, getTimeline };
