import { createCampaign, deleteCampaign } from "./CampaignController";

const express = require("express");
const router = express.Router();

export default function CampaignRoutes(app) {
  router.post("/create", createCampaign);
  router.delete("/delete", deleteCampaign);
  return app.use("/campaign", router);
}
