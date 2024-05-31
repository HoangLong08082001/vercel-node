const express = require("express");
const router = express.Router();
const TeamController = require ("./TeamController.js");
export default function TeamRoutes(app) {
  router.get("/all-team", TeamController.getAllTeam);
  router.post("/create", TeamController.createTeam);
  router.post("/join", TeamController.joinTeam);
  return app.use("/team", router);
}
