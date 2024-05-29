import ControllerViews from "../viewsPage/ControllerViews";
const express = require("express");
const router = express.Router();

export default function ViewRoutes(app) {
  router.get("/repassword-page", ControllerViews.repasswordPage);
  router.post("/renew", ControllerViews.renewPassword);
  router.get('/success',ControllerViews.getSuccessPage)
  return app.use("/views", router);
}
