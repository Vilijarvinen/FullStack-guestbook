const express = require("express");
const mongoose = require('mongoose');
const fs = require("fs");
const app = express();
const data = require("./publci/guestbook.json");
const bodyParser = require('body-parser')
const uri = "mongodb+srv://vilija:2JfFP23rLf0sLtgA@cluster0.mjqrbvn.mongodb.net/?retryWrites=true&w=majority";
const schemas = require("./publci/sche");
const schemas2 = require("./publci/sche2");

console.log(data)

app.set("view engine", "ejs");
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("./publci"));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

mongoose.connect(uri).then(() => console.log('db connected'))

schemas.find({date:{"$gte":new Date(0001,1, 1)}}).then(data => {
    console.log(data);
    var gottendt = JSON.stringify(data);
    fs.writeFileSync("./publci/guestbook.json", gottendt, (err) =>{
        if (err) console.log(err);
    });
})

schemas2.find({date:{"$gte":new Date(0001,1, 1)}}).then(data => {
    console.log(data);
    var gottendt2 = JSON.stringify(data);
    fs.writeFileSync("./publci/guestbook.json", gottendt2, (err) =>{
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
