import express from 'express'
import path from 'path';

const __dirname = import.meta.dirname;

const PORT = 3000

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Look for static files first
app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////////////////////////////////
// Routes 
app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome To the Health Tracker'})
})

import {default as recipeSearchRouter} from './routes/recipeSearch.mjs'
app.use('/recipeSearch', recipeSearchRouter);

import {default as nutritionTrackerRouter} from './routes/nutritionTracker.mjs'
app.use('/nutritionTracker', nutritionTrackerRouter);

import {default as calorieEstimationRouter} from './routes/calorieEstimation.mjs'
app.use('/calorieEstimation', calorieEstimationRouter);

/////////////////////////////////////////////////////
//404 handling
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.listen(PORT, () => { console.log(`Server Started. Listening on port ${PORT}`) })