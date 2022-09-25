import 'dotenv/config.js'
import Jwt from "jsonwebtoken";

const validateToken = (req,res,next) => {
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.json('access denied')
    // console.log(req.headers);

    Jwt.verify(accessToken, process.env.SECRET_TOKEN, (error, user) => {
        if(error) throw error.message;
        req.user = user;
        next();
    });
 };

const validateAndAuthorization = (req, res, next) => {
    validateToken(req, res, ()=>{
        if(req.user.id == req.params.id || req.user.id == req.query.user){
            next();  
        } else{
            console.log(req.user.id, req.query.user)
            res.status(403).json('You are not allowed to do that');
        }
    })
};

export default{
    validateToken,
    validateAndAuthorization
};