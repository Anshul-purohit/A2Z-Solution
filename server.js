require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, dbName: "a2zDB"});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var authenticated = false;

app.get("/", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    const url = "https://zenquotes.io/api/today";
    https.get(url, function(response){
        response.on("data", function(data){
            const quoteData = JSON.parse(data);
            const quote = quoteData[0].q;
            const author = quoteData[0].a;
            res.render("index", {authenticated: authenticated, quote: quote, author: author});
        });
    });
});

app.get("/1stYear", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("1stYear", {authenticated: authenticated});
});

app.get("/2ndYear", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("2ndYear", {authenticated: authenticated});
});

app.get("/3rdYear", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("3rdYear", {authenticated: authenticated});
});

app.get("/4thYear", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("4thYear", {authenticated: authenticated});
});

app.get("/1stSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("1stSem", {authenticated: authenticated});
});

app.get("/2ndSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("2ndSem", {authenticated: authenticated});
});

app.get("/3rdSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("3rdSem", {authenticated: authenticated});
});

app.get("/4thSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("4thSem", {authenticated: authenticated});
});

app.get("/5thSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("5thSem", {authenticated: authenticated});
});

app.get("/6thSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("6thSem", {authenticated: authenticated});
});

app.get("/7thSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("7thSem", {authenticated: authenticated});
});

app.get("/8thSem", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("8thSem", {authenticated: authenticated});
});

app.get("/cp", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("cp", {authenticated: authenticated});
});

app.get("/dev", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("dev", {authenticated: authenticated});
});

app.get("/gate", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("gate", {authenticated: authenticated});
});

app.get("/PBC", function(req, res){
    if(req.isAuthenticated()){
        authenticated = true;
    }
    res.render("PBC", {authenticated: authenticated});
});

app.get("/signup", function(req, res){
    res.render("signup");
});

app.get("/signin", function(req, res){
    res.render("signin");
});

app.post("/signup", function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            res.redirect("/");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});

app.post("/signin", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
      });
    
      req.login(user, function(err){
        if (err) {
          res.redirect("/");
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/");
          });
        }
      });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});