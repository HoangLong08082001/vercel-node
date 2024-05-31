const express = require("express");
const DepartmentController = require ("./DepartmentConrtoller.js");
const router = express.Router();
export default function DepartmentRoutes(app) {
  router.post("/create", DepartmentController.createDepartment);
  return app.use("/department", router);
}
