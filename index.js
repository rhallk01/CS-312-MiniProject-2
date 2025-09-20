//Add import statements
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

//set up express, body-parser, and the port
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

//render home page render
app.get("/", (req, res) => {
  res.render("index.ejs", {content: ""});
});

//render search cocktails page
app.get("/search", (req, res) => {
  res.render("search.ejs", {});
});

//if home button is clicked, redirect to home page
app.get("/clickHome", (req, res) => {
  return res.redirect('/');
});

app.get("/get-cocktail-by-name", async (req, res) => {
  const cocktailName = req.query.nameInput;
  try {
    const result = await axios.get(API_URL + "/search.php?s=" + cocktailName);
    res.render("index.ejs", { content: result.data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});








//start the Express server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});