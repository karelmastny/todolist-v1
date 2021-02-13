const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["First task"];
const workItems = [];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = process.env.PORT;

app.get("/", function (req, res) {

    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    });

});

app.post("/", function (req, res) {

    let newTask = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(newTask);
        res.redirect("/work");
    } else {
        items.push(newTask);
        res.redirect("/");
    }

})


app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
})


app.get("/about", function (req, res) {
    res.render("about");
})


app.listen(port || 3000, function () {
    console.log("Server started on port 3000.");
});
