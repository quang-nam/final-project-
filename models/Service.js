import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  ma_dich_vu: String,
  ten_dich_vu: String,
  loai_dich_vu: { type: String, enum: ["Bắt buộc", "Tùy chọn"] },
  don_gia_co_ban: Number,
});

export default mongoose.model("Service", ServiceSchema);
