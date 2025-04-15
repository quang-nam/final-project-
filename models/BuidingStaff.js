// Các nhân viên trong công ty có thông tin về mã nhân viên, CMT, tên, ngày sinh, số điện thoại.

import mongoose from "mongoose";
const BuidingStaff = new mongoose.Schema({
  ma_nhan_vien: String,
  ten: String,
  ngay_sinh: Date,
  dia_chi: String,
  so_dien_thoai: String,
  bac: String,
  vi_tri: String,
  dich_vu_phu_trach: [String], // ma_dich_vu
  luong: Number,
});
export default mongoose.model("BuidingStaff", BuidingStaff);
