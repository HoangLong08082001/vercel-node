const express = require("express");
import DepartmentController from "./DepartmentConrtoller";
const router = express.Router();
export default function DepartmentRoutes(app) {
  router.post("/create", DepartmentController.createDepartment);
  return app.use("/department", router);
}
