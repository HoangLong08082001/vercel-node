const pool = require("../../config/database");
const { ServiceDepartment } = require("./DepartmentModal");

const createDepartment = (req, res) => {
  let name = req.body.name;
  pool.query(ServiceDepartment.checkExists, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "fails" });
    }
    if (result.length > 0) {
      return res
        .status(400)
        .json({ message: "Bộ phận này đã tồn tại trong hệ thống" });
    } else {
      pool.query(ServiceDepartment.create, [name], (err, data) => {
        if (err) {
          return res.status(500).json({ message: "fails" });
        }
        if (data) {
          return res.status(200).json({ message: "success" });
        }
      });
    }
  });
};

module.exports = { createDepartment };
