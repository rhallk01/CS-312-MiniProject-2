//Add import statements
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

//set up express, body-parser, and the port
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Url for cocktail API
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";
//URL for meal API
const RECIPE_API_URL = "https://www.themealdb.com/api/json/v1/1"

//store the most recent cocktail and meal recipes for display
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

//GET request to the cocktail API with name as a perameter
app.get("/get-cocktail-by-name", async (req, res) => {
  //get the name from the query
  const cocktailName = req.query.nameInput;
  //try axios request with cocktail name
  try {
    const result = await axios.get(API_URL + "/search.php?s=" + cocktailName);
    //set the current cocktail
    currentCocktail = result.data;
    //render returned cocktail data and the current meal recipe
    res.render("index.ejs", { content: currentCocktail, recipe: currentRecipe });
  //catch error
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error), recipe: currentRecipe });
  }
});

//GET request to the cocktail API with first letter as a perameter
app.get("/get-cocktail-by-letter", async (req, res) => {
  //get the letter from the query
  const cocktailLetter = req.query.firstLetterInput;
  //try axios request with cocktail first letter
  try {
    const result = await axios.get(API_URL + "/search.php?f=" + cocktailLetter);
    //set the current cocktail
    currentCocktail = result.data;
    //render returned cocktail data and the current meal recipe
    res.render("index.ejs", { content: currentCocktail, recipe: currentRecipe });
  //catch error
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error), recipe: currentRecipe });
  }
});

//GET request to the cocktail API for a random cocktail recipe
app.get("/get-cocktail-random", async (req, res) => {
  //try axios request for random cocktail
  try {
    const result = await axios.get(API_URL + "/random.php");
    //set the current cocktail
    currentCocktail = result.data;
    //render returned cocktail data and the current meal recipe
    res.render("index.ejs", { content: currentCocktail, recipe: currentRecipe });
  //catch error
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error), recipe: currentRecipe });
  }
});


//GET request to the meal API with name as a perameter
app.get("/get-recipe-by-name", async (req, res) => {
  //get meal name from query 
  const recipeName = req.query.nameInput;
  try {
    //GET request to API with name param
    const result = await axios.get(RECIPE_API_URL + "/search.php?s=" + recipeName);
    //set the current meal recipe
    currentRecipe = result.data;
    //render main page with meal and cocktail
    res.render("index.ejs", { recipe: currentRecipe, content: currentCocktail });
  } catch (error) {
    res.render("index.ejs", { recipe: "", content: currentCocktail });
  }
});

//GET request to the meal API with first letter as a perameter
app.get("/get-recipe-by-letter", async (req, res) => {
  //get meal first letter from query 
  const recipeLetter = req.query.firstLetterInputFood;
  try {
    //GET request to API with letter param
    const result = await axios.get(RECIPE_API_URL + "/search.php?f=" + recipeLetter);
    //set the current meal recipe
    currentRecipe = result.data;
    //render main page with meal and cocktail
    res.render("index.ejs", { recipe: currentRecipe, content: currentCocktail });
  } catch (error) {
    res.render("index.ejs", { recipe: "", content: currentCocktail });
  }
});

//GET request to the meal API for a random meal recipe
app.get("/get-recipe-random", async (req, res) => {
  try {
    //GET request to API for random
    const result = await axios.get(RECIPE_API_URL + "/random.php");
    //set the current meal recipe
    currentRecipe = result.data;
    //render main page with meal and cocktail
    res.render("index.ejs", { recipe: currentRecipe, content: currentCocktail });
  } catch (error) {
    res.render("index.ejs", { recipe: "", content: currentCocktail });
  }
});




//start the Express server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});