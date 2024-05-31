const bcrypt = require("bcrypt");
const pool = require("../config/database.js");
const { ServiceRenewPage } = require("./ViewsModal.js");
const salt = 10;

const repasswordPage = (req, res) => {
  return res.render("repassword");
};
const renewPassword = (req, res) => {
  let email = req.body.username;
  let password = req.body.password;
  let email_url = req.query.ref;

  try {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      if (hash) {
        pool.query(ServiceRenewPage.renew, [hash, email], (err, result) => {
          if (err) {
            throw err;
          }
          if (result) {
            return res.render("success");
          }
        });
      } else {
        return res.status(400).json({ message: "Không thể tạo password mới" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
};
module.exports = { repasswordPage, renewPassword };
