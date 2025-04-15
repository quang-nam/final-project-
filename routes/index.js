import express from "express";
import routeCompany from "./routeCompany.js";
import routeStaff from "./routeStaff.js";
const router = express.Router();
router.use("/company", routeCompany);
router.use("/staff", routeStaff);
export default router;
