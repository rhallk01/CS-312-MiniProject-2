//Add import statements
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

//set up express, body-parser, and the port
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//render home page render
app.get("/", (req, res) => {
  res.render("index.ejs", {});
});

//render search cocktails page
app.get("/search", (req, res) => {
  res.render("search.ejs", {});
});

//if home button is clicked, redirect to home page
app.get("/clickHome", (req, res) => {
  return res.redirect('/');
});



//start the Express server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});