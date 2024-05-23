const express = require("express");
const router = express.Router();
import TeamController from "./TeamController";
export default function TeamRoutes(app) {
  router.get("/all-team", TeamController.getAllTeam);
  router.post("/create", TeamController.createTeam);
  router.post("/join", TeamController.joinTeam);
  return app.use("/team", router);
}
