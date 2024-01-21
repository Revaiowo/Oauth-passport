import express from "express";
import '../config/passport.js';

const profileRouter = express.Router();

const authenticateUser = (req, res, next) =>{

    if (!req.user) return res.redirect('/auth/login');

    next();
}

profileRouter.get('/', authenticateUser, (req, res)=>{
    // res.send(req.user)
    console.log(req.user.name)
    res.render('profile', {user: req.user});
})

export default profileRouter;

