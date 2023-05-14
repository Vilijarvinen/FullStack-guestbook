require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser')
const schemas = require("./publci/sche");
const schemas2 = require("./publci/sche2");
const sessions = require("express-session");
const cookies = require("cookie-parser");

//console.log(data)

app.set("view engine", "ejs");
app.use(cookies());
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("./publci"));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSIONKEY,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false 
}));

var session;

mongoose.connect(process.env.URIKEY).then(() => console.log('db connected'))

schemas.find({date:{"$gte":new Date(0001,1, 1)}}).then(data => {
    //console.log(data);
    var gottendt = JSON.stringify(data);
    fs.writeFileSync("./publci/guestbook.json", gottendt, (err) =>{
        if (err) console.log(err);
    });
})

schemas2.find({date:{"$gte":new Date(0001,1, 1)}}).then(data => {
    //console.log(data);
    var gottendt2 = JSON.stringify(data);
    fs.writeFileSync("./publci/ajmsg.json", gottendt2, (err) =>{
        if (err) console.log(err);
    });
})

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/ajaxmessage", (req, res) => {
    res.render("ajaxmessage");
});

app.get("/guestbook", (req, res) => {
    res.render("guestbook");
});

app.get("/newmessage", (req, res) => {
    res.render("newmessage");
});

app.get("/admin", (req, res) => {
    session = req.session;
    console.log(session);
    if(session.userid === "admin"){
        return res.redirect("/adminpage")
    } else {
        res.render("admin");
    }
});

app.get("/adminpage", (req, res) =>{
    session = req.session;
    if(session.userid === "admin"){
        res.render("adminpage")
    } else {
        return res.redirect("/admin");
    }
})

app.post("/admin", (req, res) => {
    console.log(req.body);
    if(req.body.username === process.env.ADMIN){
        if(req.body.password === process.env.ADMINPASS){
            session = req.session;
            session.userid = req.body.username;
            console.log(req.session);
            return res.redirect("/admin");
        }
        else {
            return res.status(401).send();
        }
    }
    else {
        return res.status(401).send();
    }
});

app.post("/adminpage/search", (req, res) => {
    console.log(req.body.id);
    try {
        schemas.findOne({id: req.body.id}).then(function(found){
            if (!found) {
                var nulli = {null: null}
                return res.send(nulli);
            }
            else {
                console.log(found);
                return res.send(found);
            }
        })
    }
    catch (error) {
        console.log("error", error);
    }
});

app.post("/adminpage/delete", (req, res) => {
    schemas.findOneAndDelete({id: req.body.id}).then(function(){
        schemas.find({date:{"$gte":new Date(0001,1, 1)}}).then(data => {
            //console.log(data);
            var gottendt = JSON.stringify(data);
            fs.writeFileSync("./publci/guestbook.json", gottendt, (err) =>{
                if (err) console.log(err);
            });
        })
    });
});

app.post("/adminpage/delete2", (req, res) => {
    schemas2.findOneAndDelete({id: req.body.id}).then(function(){
        schemas2.find({date:{"$gte":new Date(0001,1, 1)}}).then(data => {
            //console.log(data);
            var gottendt2 = JSON.stringify(data);
            fs.writeFileSync("./publci/ajmsg.json", gottendt2, (err) =>{
                if (err) console.log(err);
            });
        })
    });
});

app.post("/adminpage/search2", (req, res) => {
    console.log(req.body.id);
    try {
        schemas2.findOne({id: req.body.id}).then(function(found){
            if(!found){
                var nulli = {null: null}
                return res.send(nulli);
            }
            else{
                console.log(found);
                return res.send(found);
            }
        })
    }
    catch (error) {
        console.log("error", error);
    }
});

app.post("/adminpage/ids", (req, res) => {
    try {
        schemas.find().then(function(a){
            return res.send(a);
        })
    }
    catch (error) {
        console.log("error", error);
    }
})

app.post("/adminpage/ids2", (req, res) => {
    try {
        schemas2.find().then(function(a){
            return res.send(a);
        })
    }
    catch (error) {
        console.log("error", error);
    }
})

app.post("/newmessage", (req, res)  => {
    try {
        schemas.deleteMany({ date:{"$gte":new Date(0001,1, 1)} }).then(function(){
            schemas.create(req.body);
        }).catch(function(error){
            console.log(error);
        });
    }
    catch (error) {
        console.log("error", error);
    }
    fs.writeFileSync("./publci/guestbook.json", JSON.stringify(req.body), (err) =>{
        if (err) console.log(err);
    });
});

app.post("/ajaxmessage", (req, res)  => {
    try {
        schemas2.deleteMany({ date:{"$gte":new Date(0001,1, 1)} }).then(function(){
            schemas2.create(req.body);
        }).catch(function(error){
            console.log(error);
        });
    }
    catch (error) {
        console.log("error", error);
    }
    fs.writeFileSync("./publci/ajmsg.json", JSON.stringify(req.body), (err) =>{
        if (err) console.log(err);
    });
});

app.all("*", (req, res) => {
    res.status(404).send("<style>body {background: red; text-align: center; margin-top: 5em; color: yellow; text-shadow: 2px 2px 2px black}</style><h1>404<br>The page you were looking for was not there!</h1>");
})

app.listen(process.env.PORT || 9001);
