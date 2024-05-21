const express = require("express");
const router = express.Router();
import CollaboratorController from "./CollaboratorController";
export default function CollaboratorRoute(app) {
  router.post("/register", CollaboratorController.registerAccount);
  return app.use("/collaborator", router);
}
