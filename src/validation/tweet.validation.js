// joi validation for postTweet body

const Joi=require("joi")


const postTweet={
    body:Joi.object().keys({
        text:Joi.string().required(),
        
    })
}


module.exports={
    postTweet,
}