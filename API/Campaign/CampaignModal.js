class ServiceCampaign {

  static create =
    "INSERT INTO campaign (link_product, name_campaign, personal_tax, affiliate, description, date_start, date_end) VALUES (?,?,?,?,?,?,?)";
}
module.exports = { ServiceCampaign };
