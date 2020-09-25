const express = require(`express`);
const app = express();
const dotenv = require(`dotenv`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
const {connectDB, Post} = require(`./models/posts`);
const addPost = require(`./routes/addPost`);
const showPost = require(`./routes/showPost`);
const editPost = require(`./routes/editPost`);
const home = require(`./routes/home`);
const addGenre = require(`./routes/addGenre`);
const showGenre = require(`./routes/showGenre`);
const editGenre = require(`./routes/editGenre`);

// using dotenv
dotenv.config({path: `./config/config.env`});

// connecting with mongodb
connectDB();

// setting port
const PORT = process.env.PORT || 3000;

// setting public folder
app.use(express.static(`public`));

// using morgan
if(process.env.NODE_ENV === `development`)
  app.use(morgan(`dev`));

// using bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// using ejs
app.set(`view engine`, `ejs`);
app.set(`views`, `views`);

// using pages
app.use(addPost);
app.use(showPost);
app.use(editPost);
app.use(home);
app.use(addGenre);
app.use(showGenre);
app.use(editGenre);

// listening to server
app.listen(PORT, 
  console.log(`listening to server in ${process.env.NODE_ENV} mode on port ${PORT}...`)
);