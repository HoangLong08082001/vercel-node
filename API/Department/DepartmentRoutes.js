import { createDepartment, GetDepartment, DeleteDepartment, UpdateDepartment } from "./DepartmentConrtoller";

const express = require("express");
const router = express.Router();
export default function DepartmentRoutes(app) {
  router.post("/create", createDepartment);
  router.delete("/deletedepartment", DeleteDepartment);
  router.put("/updatedepartment", UpdateDepartment);
  router.get("/getdepartment", GetDepartment);
  return app.use("/department", router);
}
