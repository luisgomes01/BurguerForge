import express from "express";

export const hamburguerRouter = express.Router();

hamburguerRouter.route("/burguer").get((req, res) => {
  res.send("test");
});
