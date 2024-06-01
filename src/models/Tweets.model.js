//tweets model Schema NoSQL

const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
  },
  //for created at and updated at
  {
    timestamps: true,
  }
);

//better indexing for better pagination experince
tweetSchema.index({ createdAt: -1 }); 

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = {
    Tweet: Tweet
  };
