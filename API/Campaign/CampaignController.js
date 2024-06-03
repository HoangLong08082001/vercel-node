const { get } = require("request");
const pool = require("../../config/database.js");
const { ServiceCampaign } = require("./CampaignModal.js");

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
        throw err;
      }
      if (data) {
        return res.status(200).json({ message: "success" });
      }
    }
  );
};

// const GetCampaign = (req, res) => {

//   pool.query('SELECT * FROM campaign', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     if (data) {
//       // const dataCampaign = [];
//       for (let index = 0; index < data.length; index++) {
//         const arrayProducts = [];
//         pool.query("SELECT p.*, cp.id_campaign FROM products p INNER JOIN campaign_products cp ON p.id_products = cp.id_products WHERE cp.id_campaign = ?;", [data[index].id_campaign], (err, data) => {
//           if (err) {
//             throw err;
//           }
//           if (data) {
//             arrayProducts.push(data);
//           }

//           data[index].products = arrayProducts;
//           // console.log(data);
//         });
//       }

//       return res.status(200).json({ message: "success", data });
//     }

//   })


// }
const getAllCampaign = (req, res) => {
  pool.query(
    "SELECT * FROM campaign JOIN campaign_products ON campaign.id_campaign = campaign_products.id_campaign JOIN products ON campaign_products.id_products = products.id_products",
    [],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        const campaign = {};
        let url = null;
        data.forEach((row) => {
          url = row.link_product;
          if (!campaign[row.name_campaign]) {
            campaign[row.name_campaign] = {
              name: row.name_campaign,
              products: [],
            };
          }
          campaign[row.name_campaign].products.push({
            alias: url + row.alias + "/?bwaf=",
          });
        });
        return res.status(200).json({ data: campaign });
      }
    }
  );
};



// const GetCampaign = async (req, res) => {
//   try {
//     let id_collaborator = req.params.id
//     // Truy vấn tất cả các chiến dịch
//     const campaigns = await new Promise((resolve, reject) => {
//       pool.query('SELECT * FROM campaign ', (err, results) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(results);
//       });
//     });

//     for (let index = 0; index < campaigns.length; index++) {
//       const products = await new Promise((resolve, reject) => {
//         pool.query(
//           "SELECT p.*, cp.id_campaign FROM products p INNER JOIN campaign_products cp ON p.id_products = cp.id_products WHERE cp.id_campaign = ?;",
//           [campaigns[index].id_campaign],
//           (err, results) => {
//             if (err) {
//               return reject(err);
//             }
//             if (results) {
//               results.forEach(element => {
//                 element.link_affilate = campaigns[index].link_product + element.alias + "/bwaf=" + id_collaborator;
//               });
//             }
//             resolve(results);
//           }
//         );
//       });
//       campaigns[index].products = products;
//     }

//     // Trả về kết quả
//     return res.status(200).json({ message: "success", data: campaigns });

//   } catch (err) {
//     console.error('Error:', err);
//     return res.status(500).json({ message: "error", error: err });
//   }
// }
const deleteCampaign = async (req, res) => {
  const id_campaign = req.body.id_campaign;

  try {
    const [campaignProducts] = await pool.query(
      "SELECT * FROM `campaign_products` WHERE id_campaign = ?;",
      [id_campaign]
    );

    if (campaignProducts.length > 0) {
      await pool.query("DELETE FROM `campaign_products` WHERE id_campaign = ?", [id_campaign]);
    }

    await pool.query("DELETE FROM `campaign` WHERE id_campaign = ?", [id_campaign]);
    return res.status(200).json({ message: "success", data: "Chiến dịch xóa thành công!" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
// return res.send("Delete");
// };

const UpdateCamipan = async (req, res) => {
  let id_campaign = req.body.id_campaign;
  let link = req.body.link;
  let name = req.body.name;
  let personal_tax = req.body.personal_tax;
  let affiliate_tax = req.body.affiliate_tax;
  let description = req.body.description;
  let date_start = req.body.date_start;
  let date_end = req.body.date_end;

  try {
    await pool.query(
      "UPDATE `campaign` SET `link_product`=?, `name_campaign`=?, `personal_tax`=?, `affiliate_tax`=?, `description`=?, `date_start`=?, `date_end`=? WHERE id_campaign = ?;",
      [link, name, personal_tax, affiliate_tax, description, date_start, date_end, id_campaign], (err, result) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (result.affectedRows > 0) {
          return res.status(200).json({ message: "Cập nhật thành công!" });
        } else {
          return res.status(404).json({ message: "Chiến dịch không tồn tại!", affectedRows: result.affectedRows });
        }
      }
    );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}


module.exports = { createCampaign, deleteCampaign, getAllCampaign, UpdateCamipan };
