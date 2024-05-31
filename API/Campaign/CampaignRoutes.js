const express = require("express");
const router = express.Router();
import CampaignController from "./CampaignController";

export default function CampaignRoutes(app) {
  router.post("/create", CampaignController.createCampaign);
  router.delete("/delete", CampaignController.deleteCampaign);
  return app.use("/campaign", router);
}
