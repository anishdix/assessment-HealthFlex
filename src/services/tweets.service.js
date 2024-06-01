//tweets service layer to perform datasabe modifications

const httpStatus = require("http-status");
const {Tweet}=require("../models")
const ApiError = require("../utils/ApiError");

async function addTweet(userId,text){
    if (!userId || !text) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User ID and text are required");
    }
    const tweet = new Tweet({
        userId,
        text,
        
    });
    await tweet.save();
return tweet
}

async function getTweets(userId,limit){
    console.log(userId,"userId")
    const tweets = await Tweet.find({ userId }).sort({ _id: -1 }).limit(limit);
    return tweets;
}



module.exports={
    addTweet,
    getTweets,
}