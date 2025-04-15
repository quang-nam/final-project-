import mongoose from "mongoose";

const RaVaoSchema = new mongoose.Schema({
  vi_tri: String,
  thoi_gian: Date,
  loai: { type: String, enum: ["vao", "ra"] },
});

const TheRaVaoSchema = new mongoose.Schema({
  ma_the: String,
  lich_su_ra_vao: [RaVaoSchema],
});

const CompanyEmployeeSchema = new mongoose.Schema({
  ma_nhan_vien: String,
  cmt: String,
  ten: String,
  ngay_sinh: Date,
  so_dien_thoai: String,
  ma_cong_ty: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  the_ra_vao: TheRaVaoSchema,
});

export default mongoose.model("CompanyEmployee", CompanyEmployeeSchema);
