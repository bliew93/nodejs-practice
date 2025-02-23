// Finish the rest of the routes, controllers, model methods, etc.
// Move on to making a simple Todo List implementation
// Todo list should be almost the same kinda stuff as the bitly stuff just extra practice

import { Router } from "express";

import {
  shortenedUrlsIndex,
  getShortenedUrl,
  createShortenedUrl,
  removeShortenedUrl,
} from "../controllers/shortenedUrl.controller.js";

const urlShortenerRouter = Router();

urlShortenerRouter.get("/", shortenedUrlsIndex);

urlShortenerRouter.get("/:id", getShortenedUrl);

urlShortenerRouter.post("/", createShortenedUrl);

urlShortenerRouter.delete("/:id", removeShortenedUrl);

export default urlShortenerRouter;
