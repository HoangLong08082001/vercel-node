const express = require("express");
const EmployeeController = require ("./EmployeeController.js");
const router = express.Router();
export default function EmployeeRoutes(app) {
  router.post("/create", EmployeeController.createEmployee);
  router.post("/login-emoloyee", EmployeeController.loginEmployee);
  return app.use("/employee", router);
}
