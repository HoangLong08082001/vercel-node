const pool = require("../../config/database.js");
const { ServiceDepartment } = require("./DepartmentModal.js");

const createDepartment = (req, res) => {
  let name = req.body.name;
  pool.query(ServiceDepartment.checkExists, [name], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      return res
        .status(400)
        .json({ message: "Bộ phận này đã tồn tại trong hệ thống" });
    } else {
      pool.query(ServiceDepartment.create, [name], (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          return res.status(200).json({ message: "success" });
        }
      });
    }
  });
};

const GetDepartment = (req, res) => {
  try {
    pool.query(ServiceDepartment.GetDepartment, (err, data) => {
      if (err) {
        return res.status(200).json({ message: "fails" });
      }
      if (data) {
        return res.status(200).json({
          message: "success",
          data,
        });
      }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
}

const UpdateDepartment = (req, res) => {
  try {
    let id_department = req.body.id_department;
    let name_department = req.body.name_department;
    // Thực hiện truy vấn cập nhật
    pool.query(ServiceDepartment.UpdateDepartment, [name_department, id_department], (err, result) => {
      if (err) {
        console.error("Error updating department:", err);
        return res.status(500).json({ message: "Error updating department", error: err });
      }
      console.log("Department updated:", result);
      return res.status(200).json({ message: "Department updated successfully" });
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
}

const DeleteDepartment = (req, res) => {
  try {
    let id_department = req.body.id_department;
    pool.query(ServiceDepartment.DeleteDepartment, [id_department], (err, result) => {
      if (err) {
        console.error("Error deleting department:", err);
        return res.status(500).json({ message: "Error deleting department", error: err });
      }
      console.log("Department updated:", result);
      return res.status(200).json({ message: "Department deleting successfully" });
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
}




module.exports = { createDepartment, GetDepartment, DeleteDepartment, UpdateDepartment };
