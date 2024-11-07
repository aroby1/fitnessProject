import { default as express } from "express";

const router = express.Router();
export default router;

// Render recipe search page (without search results)
router.get("/", (req, res) => {
    res.render("recipeSearch.ejs", { title: 'Recipe Search Page' });
});

// Route to handle fetching recipes based on query (e.g., /search/chicken)
router.get("/search", async (req, res) => {
    const query = req.query.query;  // Get the search query from the URL params (e.g., /search/chicken)
    let APP_ID = "14fa0a37";
    let APP_KEY = "d938c99d056d72a1cb7267e86c60ff53";
    
    // Construct API URL with the query from the URL parameter
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
        // Fetch the recipe data from the Edamam API
        const recipesData = await getRecipesData(apiUrl);

        console.log("API Response:", recipesData.hits);
        console.log("ApI URL:", apiUrl)

        // Render the recipeSearch page with the search results
        res.render("recipeSearch.ejs", { title: 'Recipe Search Page', recipes: recipesData.hits, query: query });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Error fetching recipes");
    }
});

// Function to fetch recipe data from the Edamam API
async function getRecipesData(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}
