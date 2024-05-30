const pool = require("../../config/database");
const { ServiceEmployee } = require("./EmployeeModal");
const bcrypt = require("bcrypt");
const salt = 10;

//id_department	username	password	phone	status	code_verify	date_create	time_create
const createEmployee = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let phone = req.body.phone;
  let id_department = req.body.id_department;
  pool.query(ServiceEmployee.checkEmail, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "fails" });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "fails" });
        }
        if (hash) {
          pool.query(
            ServiceEmployee.create,
            [id_department, username, hash, phone, 1],
            (err, data) => {
              if (err) {
                return res.status(500).json({ message: "fails" });
              }
              if (data) {
                return res.status(200).json({ message: "success" });
              }
            }
          );
        }
      });
    }
  });
};
const loginEmployee = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  pool.query(ServiceEmployee.checkLogin[(username, username)], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "fails" });
    }
    if (data.length > 0) {
      bcrypt.compare(password.toString(), data[0].password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "fails" });
        }
        if (result) {
          pool.query(
            ServiceEmployee.checkPermission,
            [username],
            (err, response) => {
              if (err) {
                return res.status(500).json({ message: "fails" });
              }
              if (response) {
                let payload = {
                  data: response,
                };
              }
            }
          );
        }
      });
    } else {
      return res
        .status(400)
        .json({ message: "Email hoặc số điện thoại này không tồn tại" });
    }
  });
};

module.exports = { createEmployee, loginEmployee };
