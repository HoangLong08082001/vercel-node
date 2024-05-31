const pool = require("../../config/database");
import ServiceCampaign from "./CampaignModal";

//id_collaborator	id_orders	link_product	name_campaign	personal_tax	affiliate_tax	description	date_start	date_end
const createCampaign = (req, res) => {
  let link = req.body.link;
  let name = req.body.name;
  let personal_tax = req.body.personal_tax;
  let affiliate_tax = req.body.affiliate_tax;
  let description = req.body.description;
  let date_start = req.body.date_start;
  let date_end = req.body.date_end;
  pool.query(
    ServiceCampaign.create,
    [
      link,
      name,
      personal_tax,
      affiliate_tax,
      description,
      date_start,
      date_end,
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "fails" });
      }
      if (data) {
        return res.status(200).json({ message: "success" });
      }
    }
  );
};
const deleteCampaign = (req, res) => {};

module.exports = { createCampaign, deleteCampaign };
