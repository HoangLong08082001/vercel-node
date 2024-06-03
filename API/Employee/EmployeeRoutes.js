import { createEmployee, loginEmployee, UpdateEmployee, DeleteEmployee } from "./EmployeeController";

const express = require("express");
const router = express.Router();
export default function EmployeeRoutes(app) {
  router.put("/update", UpdateEmployee);
  router.delete("/delete", DeleteEmployee);
  router.post("/create", createEmployee);
  router.post("/login-emoloyee", loginEmployee);
  return app.use("/employee", router);
}
