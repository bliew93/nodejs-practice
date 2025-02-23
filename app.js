import express from "express";

import { BASE_URL, PORT, NODE_ENV } from "./config/env.js";

import pgPool from "./config/db.js";
import shortenedUrlRouter from "./routes/shortenedUrl.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/bitly", shortenedUrlRouter);

app.get("/", async (req, res) => {
  res.send("Welcome to my Test Node.js + Express App!");
});

app.listen(PORT, () => {
  console.log(`Application running in ${NODE_ENV} on ${BASE_URL}:${PORT}`);
});

export default app;
