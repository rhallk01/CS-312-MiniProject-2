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
const RECIPE_API_URL = "https://www.themealdb.com/api/json/v1/1"
var currentCocktail = "";
var currentRecipe = "";

//render home page render
app.get("/", (req, res) => {
  res.render("index.ejs", {content: currentCocktail, recipe: currentRecipe});
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
    currentCocktail = result.data;
    res.render("index.ejs", { content: result.data, recipe: currentRecipe });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error), recipe: currentRecipe });
  }
});

app.get("/get-cocktail-by-letter", async (req, res) => {
  const cocktailLetter = req.query.firstLetterInput;
  try {
    const result = await axios.get(API_URL + "/search.php?f=" + cocktailLetter);
    currentCocktail = result.data;
    res.render("index.ejs", { content: result.data, recipe: currentRecipe });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error), recipe: currentRecipe });
  }
});

app.get("/get-cocktail-random", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random.php");
    currentCocktail = result.data;
    res.render("index.ejs", { content: result.data, recipe: currentRecipe });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error), recipe: currentRecipe });
  }
});


app.get("/get-recipe-by-name", async (req, res) => {
  const recipeName = req.query.nameInput;
  try {
    const result = await axios.get(RECIPE_API_URL + "/search.php?s=" + recipeName);
    currentRecipe = result.data;
    res.render("index.ejs", { recipe: result.data, content: currentCocktail });
  } catch (error) {
    res.render("index.ejs", { recipe: "", content: currentCocktail });
  }
});

app.get("/get-recipe-by-letter", async (req, res) => {
  const recipeLetter = req.query.firstLetterInputFood;
  try {
    const result = await axios.get(RECIPE_API_URL + "/search.php?f=" + recipeLetter);
    currentRecipe = result.data;
    res.render("index.ejs", { recipe: result.data, content: currentCocktail });
  } catch (error) {
    res.render("index.ejs", { recipe: "", content: currentCocktail });
  }
});

app.get("/get-recipe-random", async (req, res) => {
  try {
    const result = await axios.get(RECIPE_API_URL + "/random.php");
    currentRecipe = result.data;
    res.render("index.ejs", { recipe: result.data, content: currentCocktail });
  } catch (error) {
    res.render("index.ejs", { recipe: "", content: currentCocktail });
  }
});




//start the Express server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});