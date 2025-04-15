import mongoose from "mongoose";

const ServiceRevenueSchema = new mongoose.Schema({
  ma_dich_vu: String,
  thang: String, // "YYYY-MM"
  doanh_thu: Number,
});

export default mongoose.model("ServiceRevenue", ServiceRevenueSchema);
