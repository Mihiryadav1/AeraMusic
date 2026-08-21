import express from "express";
import { streamTrack } from "../controllers/stream.controller.js";
const streamRoute = express.Router();

streamRoute.get("/:id", streamTrack);

export default streamRoute;
