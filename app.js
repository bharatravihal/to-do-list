const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const request = require("request");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://achyuta22:ravihal@cluster0.4119uaq.mongodb.net/todolistDB?retryWrites=true&w=majority"
);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.listen(3000, function () {
  console.log("server 3000 started");
});

const itemsschema = {
  name: String,
};
const Item = mongoose.model("item", itemsschema);

function addingitems() {
  const item1 = new Item({
    name: "welcome to your todolist",
  });
  const item2 = new Item({
    name: "hit + button",
  });
  const item3 = new Item({
    name: "<-- hit this if it is completed",
  });
  const defaultItems = [item1, item2, item3];
  Item.insertMany(defaultItems)
    .then(function () {
      console.log("successfully saved");
    })
    .catch(function (err) {
      console.log(err);
    });
}
app.post("/", function (req, res) {
  const itemadded = req.body.thing;
  const item = new Item({
    name: itemadded,
  });
  item.save();
  res.redirect("/");
});
// app.post("/delete",function(req,res){
//    const checkedItemId=req.body.checked;
//    Item.findByIdAndDelete(checkedItemId).then(function(){
//      console.log("successfully saved");

//   }) .catch(function(err){
//    console.log(err);
//   });
//  res.redirect("/");
// });

app.get("/", function (req, res) {
  // let day= date.getdate();
  const finditems = async function () {
    try {
      const response = await Item.find();
      if (response.length === 0) {
        addingitems();
        finditems();
      } else {
        res.render("index", { listtitle: "today", addeditem: response });
      }
    } catch (err) {
      console.log(err);
    }
  };
  finditems();

  // res.render('index',{listtitle:"today", addeditem:items});
});
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId)
    .then(function () {
      console.log("successfully saved");
    })
    .catch(function (err) {
      console.log(err);
    });
  res.redirect("/");
});
app.get("/work", function (req, res) {
  res.render("index", { listtitle: "Work List", addeditem: workitems });
});
app.get("/about", function (req, res) {
  res.render("about");
});
