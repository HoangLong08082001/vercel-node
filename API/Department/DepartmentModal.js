class ServiceDepartment {
  static checkExists = "SELECT * FROM department WHERE name_department=?";
  static create = "INSERT INTO department (name_department) VALUES (?)";

  static GetDepartment = "SELECT * FROM department";
  static UpdateDepartment = "UPDATE department SET name_department = ? WHERE id_department = ? ";
  static DeleteDepartment = "DELETE FROM department WHERE id_department = ?;"
}

module.exports = { ServiceDepartment };
