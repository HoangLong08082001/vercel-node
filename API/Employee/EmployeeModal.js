class ServiceEmployee {
  static create =
    "INSERT INTO employee (id_department, username, password, phone, status) VALUES (?,?,?,?,?)";
  static checkEmail = "SELECT * FROM employee";
  static checkLogin = "SELECT * FROM employee WHERE username=? OR phone=?";
  static checkPermission =
    "SELECT * FROM employee Join departmant on employee.id_department=department.id_department join department_rule on department.id_department=department_rule.id_department join rule on department_rule.id_rule=rule.id_rule WHERE employee.username=?";
}
module.exports = { ServiceEmployee };
