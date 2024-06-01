import { createCampaign, deleteCampaign, GetCampaign } from "./CampaignController";

const express = require("express");
const router = express.Router();

export default function CampaignRoutes(app) {
  router.post("/create", createCampaign);
  router.delete("/delete", deleteCampaign);
  router.get("/getcampaign/:id", GetCampaign);
  return app.use("/campaign", router);
}
