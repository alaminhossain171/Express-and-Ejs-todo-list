const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = ["wake up early", "read books", "take breakfast"];
var workItems = [];

app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function(req, res) {
    var item = req.body.newItem;
    console.log(req.body);
    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }


});
app.get("/work", function(req, res) {
    res.render("list", { listTitle: "work List", newListItems: workItems });
});
app.post("/work", function(req, res) {
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function(req, res) {
    console.log("server run at port 3000");
});