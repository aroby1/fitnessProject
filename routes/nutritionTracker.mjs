import { default as express } from "express";
const router = express.Router();
export default router;

// Default route
router.get("/", (req, res) => {
    res.render("nutritionTracker.ejs", { title: 'Nutrient Tracker Page', nutrition: null, query: null });
});

// Search route
router.get("/search", async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.render("nutritionTracker.ejs", { 
            title: 'Nutrient Tracker Page', 
            nutrition: null, 
            query: query 
        });
    }
    
    const APP_ID = "21df4c28";
    const APP_KEY = "117caf1da886595dfc0b737550dfade0";
    const encodedQuery = encodeURIComponent(query);
    const apiURL = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodedQuery}`;

    try {
        const nutritionData = await getNutritionData(apiURL);
        console.log("API response: ", nutritionData);
        console.log("API URL: ", apiURL);
        
        // Pass nutrition data and query to EJS
        res.render("nutritionTracker.ejs", { 
            title: 'Nutrient Tracker Page', 
            nutrition: nutritionData, 
            query: query 
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Error fetching recipes");
    }
});

// Helper function to fetch nutrition data
async function getNutritionData(apiURL) {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
}
