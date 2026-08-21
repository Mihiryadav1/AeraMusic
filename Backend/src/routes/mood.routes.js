import express from "express";
import {
 getAllMoods
} from "../controllers/mood.controller.js";
const moodRoute = express.Router();

 
moodRoute.get("/", getAllMoods);


export default moodRoute;
