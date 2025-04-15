import express from "express";
import {
  createBuildingStaff,
  deleteBuildingStaff,
  getAllBuidingStaff,
  getBuidingStaffById,
  getBuildingStaffsWithSalary,
  getEmployeeAccessInfo,
  updateBuildingStaff,
} from "../controllers/staffController.js";

const route = express.Router();
route.get("/accesslog", getEmployeeAccessInfo);
route.get("/salary", getBuildingStaffsWithSalary);
route.post("/add", createBuildingStaff);
route.get("/getall", getAllBuidingStaff);
route.get("/getall/:id", getBuidingStaffById);
route.put("/staff/:id", updateBuildingStaff);
route.delete("/staff/:id", deleteBuildingStaff);
export default route;
