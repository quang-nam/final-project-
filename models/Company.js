import mongoose from "mongoose";
import Service from "./Service.js";
const DichVuSchema = new mongoose.Schema({
  ma_dich_vu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  ngay_dang_ky: Date,
  don_gia: Number,
});
const CompanySchema = new mongoose.Schema({
  ten_cong_ty: String,
  ma_so_thue: String,
  von_dieu_le: Number,
  linh_vuc_hoat_dong: String,
  so_nhan_vien: Number,
  dia_chi_toa_nha: String,
  so_dien_thoai: String,
  dien_tich_mat_bang: Number,
  dich_vu_su_dung: [DichVuSchema],
});
export default mongoose.model("Company", CompanySchema);
