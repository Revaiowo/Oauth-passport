import express from "express";
import authRouter from './routes/auth.js';
import profileRouter from "./routes/profile.js";
import { connectDB } from "./database/db.js";
import cors from 'cors'
import passport from 'passport';
import path from 'path';
import dotevn from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// import { createConnection } from 'mongoose'; 
// import connectMongo from 'connect-mongo';

// const MongoStore = new connectMongo(session);


dotevn.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    })
);
app.use(passport.session());

app.use(passport.initialize());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.get('/', function (req, res) {  
    res.render('home', {user: req.user});
})

app.listen(PORT, async ()=> {
    await connectDB(process.env.MONGO_URI);
    console.log(`Connected to the server on port ${PORT}.`)
});