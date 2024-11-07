import { default as express } from "express";
const router = express.Router();
export default router;

// Default route
router.get("/", (req, res) => {
    res.render("calorieEstimation.ejs", { title: 'Calorie Estimation Calculator'});
});