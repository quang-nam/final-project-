import express from "express";
import { getCompanyWithCosts } from "../controllers/companyController.js";
const route = express.Router();
route.get("/", getCompanyWithCosts);
export default route;
