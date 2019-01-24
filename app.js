const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// Server Initialization
const app = express();
const port = 3000;

// Global Variables
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// Server Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Render Home Page
app.get("/", function(req, res) {
  const day = date.getDate();

  res.render("list", { listTitle: day, newListItem: items });
});

// Render About Page
app.get("/about", function(req, res) {
  res.render("about");
});

// Post/Accept New List Item
app.post("/", function(req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

// Render Work Page/List
app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

// Port/Server Listening
app.listen(port, function() {
  console.log("Server started on port " + port);
});
