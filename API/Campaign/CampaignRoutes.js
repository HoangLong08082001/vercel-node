const express = require("express");
const router = express.Router();
const CampaignController = require ("./CampaignController.js");

export default function CampaignRoutes(app) {
  router.post("/create", CampaignController.createCampaign);
  router.delete("/delete", CampaignController.deleteCampaign);
  return app.use("/campaign", router);
}
