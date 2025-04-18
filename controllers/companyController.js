import Company from "../models/Company.js";

export const getCompanyWithCosts = async (req, res) => {
  try {
    const don_gia_thue = 200000; // ví dụ: 200k/m2
    const today = new Date();
    const currentDate = today.getDate();
    const totalDaysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const tileThoiGian = currentDate / totalDaysInMonth;

    const companies = await Company.find().populate(
      "dich_vu_su_dung.ma_dich_vu"
    );

    const result = companies.map((c) => {
      const tien_thue = c.dien_tich_mat_bang * don_gia_thue;

      const tien_dich_vu = c.dich_vu_su_dung.reduce((sum, dv) => {
        const donGia = dv.don_gia || dv.ma_dich_vu?.don_gia_co_ban || 0;
        return sum + donGia * tileThoiGian;
      }, 0);

      return {
        ten_cong_ty: c.ten_cong_ty,
        ma_so_thue: c.ma_so_thue,
        so_nhan_vien: c.so_nhan_vien,
        dien_tich_mat_bang: c.dien_tich_mat_bang,
        tien_thue,
        tien_dich_vu: Math.round(tien_dich_vu),
        tong_chi_phi: Math.round(tien_thue + tien_dich_vu),
      };
    });

    result.sort((a, b) => b.tong_chi_phi - a.tong_chi_phi);
    res.json(result);
  } catch (err) {
    console.error("Error in getCompanyWithCosts:", err);
    res.status(500).json({ error: err.message });
  }
};
