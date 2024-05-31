import { repasswordPage, renewPassword } from "../viewsPage/ControllerViews.js";
const express = require("express");
const router = express.Router();

export default function ViewRoutes(app) {
  router.get("/repassword-page", repasswordPage);
  router.post("/renew", renewPassword);
  return app.use("/views", router);
}
