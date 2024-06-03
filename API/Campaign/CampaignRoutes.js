import { createCampaign, deleteCampaign, getAllCampaign, UpdateCamipan } from "./CampaignController";

const express = require("express");
const router = express.Router();

export default function CampaignRoutes(app) {
  router.post("/create", createCampaign);
  router.put("/update", UpdateCamipan);
  router.delete("/delete", deleteCampaign);
  router.get("/getcampaign", getAllCampaign);
  return app.use("/campaign", router);
}
