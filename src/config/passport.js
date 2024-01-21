import passport from "passport";
import googlePassport from 'passport-google-oauth20';
const {Strategy: GoogleStrategy} = googlePassport;
import { User } from "../models/auth.js";

import dotevn from 'dotenv';
dotevn.config();

passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
})

passport.use(
    new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: 'https://oauth-passport.onrender.com/auth/google/redirect'

    }, async (accessToken, refreshToken, profile, done) =>{

        const { name, sub:id, email, picture } = profile._json;

        let user = await User.findOne({googleId: id});

        if (!user) {
            user = await User.create({
                name,
                googleId: id,
                email,
                picture,
                isAdmin: false
            });
            done(null, user);
        }
        done(null, user);
        // console.log(user);
    }
));