const express = require("express");
const fs = require("fs");
const app = express();
const data = require("./publci/guestbook.json");
const bodyParser = require('body-parser')

console.log(data)

app.set("view engine", "ejs");
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("./publci"));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

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
    fs.writeFileSync("./publci/guestbook.json", JSON.stringify(req.body), (err) =>{
        if (err) console.log(err);
    });
});

app.all("*", (req, res) => {
    res.status(404).send("<style>body {background: red; text-align: center; margin-top: 5em; color: yellow; text-shadow: 2px 2px 2px black}</style><h1>404<br>The page you were looking for was not there!</h1>");
})

app.listen(process.env.port || 9001);
