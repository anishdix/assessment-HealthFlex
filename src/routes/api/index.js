const express = require('express');
const userRoutes = require('./user.routes'); 
const tweetRoutes= require('./tweets.routes');
const router = express.Router();
//redirect apis to it necessary routes,/users for user routes and /tweeets for tweetroutes
router.use("/users", userRoutes); 
router.use("/tweets",tweetRoutes)

module.exports = router;