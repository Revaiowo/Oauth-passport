import express from "express";
import passport from "passport";
import '../config/passport.js';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', {

    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.redirect('/profile')
});

authRouter.get('/login', (req, res)=>{
    res.render('login', {user: req.user});
});

authRouter.get('/logout', (req, res)=>{
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    })
    res.redirect('/');
})

export default authRouter;

