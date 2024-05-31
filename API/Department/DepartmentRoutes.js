import { createDepartment } from "./DepartmentConrtoller";

const express = require("express");
const router = express.Router();
export default function DepartmentRoutes(app) {
  router.post("/create", createDepartment);
  return app.use("/department", router);
}
