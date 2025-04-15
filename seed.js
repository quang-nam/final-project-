const mongoose = require("mongoose");
require("dotenv").config();

// Import model
const Company = require("./models/Company");
const CompanyEmployee = require("./models/CompanyEmployee");
const Service = require("./models/Service");
const BuildingStaff = require("./models/BuidingStaff");
const ServiceRevenue = require("./models/ServiceRevenue");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Company.deleteMany();
    await CompanyEmployee.deleteMany();
    await Service.deleteMany();
    await BuildingStaff.deleteMany();
    await ServiceRevenue.deleteMany();

    // Seed Services
    const services = await Service.insertMany([
      {
        ma_dich_vu: "DV_VESINH",
        ten_dich_vu: "Vệ sinh",
        loai_dich_vu: "Bắt buộc",
        don_gia_co_ban: 100000,
      },
      {
        ma_dich_vu: "DV_BAO_VE",
        ten_dich_vu: "Bảo vệ",
        loai_dich_vu: "Bắt buộc",
        don_gia_co_ban: 120000,
      },
      {
        ma_dich_vu: "DV_AN_UONG",
        ten_dich_vu: "Ăn uống",
        loai_dich_vu: "Tùy chọn",
        don_gia_co_ban: 80000,
      },
      {
        ma_dich_vu: "DV_XE",
        ten_dich_vu: "Trông giữ xe",
        loai_dich_vu: "Tùy chọn",
        don_gia_co_ban: 90000,
      },
      {
        ma_dich_vu: "DV_BAO_TRI",
        ten_dich_vu: "Bảo trì thiết bị",
        loai_dich_vu: "Tùy chọn",
        don_gia_co_ban: 110000,
      },
    ]);
    console.log("✅ Seeded Services");

    // Seed Company
    const company = await Company.create({
      ten_cong_ty: "Công ty ABC",
      ma_so_thue: "123456789",
      von_dieu_le: 50000000,
      linh_vuc_hoat_dong: "Công nghệ",
      so_nhan_vien: 15,
      dia_chi_toa_nha: "Tầng 3, Tòa nhà A",
      so_dien_thoai: "0987654321",
      dien_tich_mat_bang: 150,
      dich_vu_su_dung: [
        {
          ma_dich_vu: services[0]._id,
          ngay_dang_ky: new Date("2025-04-01"),
          don_gia: 110000,
        },
        {
          ma_dich_vu: services[1]._id,
          ngay_dang_ky: new Date("2025-04-01"),
          don_gia: 120000,
        },
        {
          ma_dich_vu: services[2]._id,
          ngay_dang_ky: new Date("2025-04-05"),
          don_gia: 85000,
        },
      ],
    });
    console.log("✅ Seeded Company");

    // Seed Company Employees
    await CompanyEmployee.insertMany([
      {
        ma_nhan_vien: "NV001",
        cmt: "012345678",
        ten: "Nguyễn Văn A",
        ngay_sinh: new Date("1990-01-01"),
        so_dien_thoai: "0901234567",
        ma_cong_ty: company._id,
        the_ra_vao: {
          ma_the: "THE001",
          lich_su_ra_vao: [
            { vi_tri: "Tầng 1", thoi_gian: new Date(), loai: "vao" },
            { vi_tri: "Tầng 1", thoi_gian: new Date(), loai: "ra" },
          ],
        },
      },
      {
        ma_nhan_vien: "NV002",
        cmt: "987654321",
        ten: "Trần Thị B",
        ngay_sinh: new Date("1992-05-05"),
        so_dien_thoai: "0912345678",
        ma_cong_ty: company._id,
        the_ra_vao: {
          ma_the: "THE002",
          lich_su_ra_vao: [],
        },
      },
    ]);
    console.log("✅ Seeded Company Employees");

    // Seed Building Staff
    await BuildingStaff.insertMany([
      {
        ma_nhan_vien: "STF001",
        ten: "Lê Văn C",
        ngay_sinh: new Date("1985-08-10"),
        dia_chi: "Hà Nội",
        so_dien_thoai: "0966123456",
        bac: "3",
        vi_tri: "Giám sát",
        dich_vu_phu_trach: ["DV_VESINH", "DV_BAO_VE"],
        luong: 7000000,
      },
      {
        ma_nhan_vien: "STF002",
        ten: "Phạm Thị D",
        ngay_sinh: new Date("1990-11-12"),
        dia_chi: "Hồ Chí Minh",
        so_dien_thoai: "0977123456",
        bac: "2",
        vi_tri: "Nhân viên",
        dich_vu_phu_trach: ["DV_AN_UONG"],
        luong: 5000000,
      },
    ]);
    console.log("✅ Seeded Building Staff");

    // Seed Service Revenue
    await ServiceRevenue.insertMany([
      { ma_dich_vu: "DV_VESINH", thang: "2025-04", doanh_thu: 1000000 },
      { ma_dich_vu: "DV_AN_UONG", thang: "2025-04", doanh_thu: 700000 },
    ]);
    console.log("✅ Seeded Service Revenue");

    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
