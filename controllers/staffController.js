import CompanyEmployee from "../models/CompanyEmployee.js";
import BuildingStaff from "../models/BuidingStaff.js";
import buildingStaffSchema from "../validation/staff.js";
import BuidingStaff from "../models/BuidingStaff.js";
import buidingStaffSchema from "../validation/staff.js";
export const getEmployeeAccessInfo = async (req, res) => {
  try {
    const { date } = req.query;
    console.log(date);
    if (!date) return res.status(400).json({ error: "Missing date" });

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Tìm tất cả nhân viên
    const employees = await CompanyEmployee.find().populate("ma_cong_ty");

    const result = [];

    for (const employee of employees) {
      // Lọc các lần ra vào trong ngày của nhân viên
      const accessLogs = employee.the_ra_vao.lich_su_ra_vao.filter(
        (log) => log.thoi_gian >= startOfDay && log.thoi_gian <= endOfDay
      );

      // Tạo danh sách các lần ra/vào
      const chiTietRaVao = accessLogs.map((log) => ({
        vi_tri: log.vi_tri,
        loai: log.loai,
        thoi_gian: log.thoi_gian,
      }));

      result.push({
        ten_nhan_vien: employee.ten,
        ma_nhan_vien: employee.ma_nhan_vien,
        ten_cong_ty: employee.ma_cong_ty?.ten_cong_ty || "Không rõ",
        so_lan_ra_vao: chiTietRaVao.length,
        chi_tiet_ra_vao: chiTietRaVao,
      });
    }

    res.json(result);
  } catch (err) {
    console.error("Error in getEmployeeAccessInfo:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getBuildingStaffsWithSalary = async (req, res) => {
  try {
    const { monthYear } = req.query;
    if (!monthYear) {
      return res.status(400).json({ error: "Missing month and year" });
    }

    // Truy vấn dữ liệu nhân viên tòa nhà
    const buildingStaffs = await BuildingStaff.aggregate([
      {
        $unwind: "$dich_vu_phu_trach",
      },
      {
        $project: {
          ma_nhan_vien: 1,
          ten: 1,
          vi_tri: 1,
          bac: 1,
          dich_vu_phu_trach: 1, // ma_dich_vu
          luong: 1,
        },
      },
      {
        $group: {
          _id: "$ma_nhan_vien", // nhóm theo mã nhân viên
          ten: { $first: "$ten" },
          vi_tri: { $first: "$vi_tri" },
          bac: { $first: "$bac" },
          dich_vu_phu_trach: { $addToSet: "$dich_vu_phu_trach" },
          luong: { $sum: "$luong" },
        },
      },
    ]);

    // Trả về kết quả
    res.json(buildingStaffs);
  } catch (err) {
    console.error("Error in getBuildingStaffsWithSalary:", err);
    res.status(500).json({ error: err.message });
  }
};

export const createBuildingStaff = async (req, res) => {
  try {
    const { error, value } = buildingStaffSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    const exists = await BuildingStaff.findOne({
      ma_nhan_vien: value.ma_nhan_vien,
    });
    if (exists) {
      return res.status(409).json({ error: "Mã nhân viên đã tồn tại" });
    }

    const staff = new BuildingStaff(value);
    await staff.save();

    res.status(201).json({ message: "Thêm nhân viên thành công", data: staff });
  } catch (err) {
    console.error(" Error creating building staff:", err);
    res.status(500).json({ error: err.message });
  }
};
export const getAllBuidingStaff = async (req, res) => {
  try {
    const staffList = await BuidingStaff.find();
    res.json({ data: staffList });
  } catch (error) {
    console.error("Error fetching all building staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBuidingStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing staff ID" });
    }
    const staff = await BuidingStaff.findById(id);
    if (!staff) {
      return res.status(404).json({
        error: "Staff not found",
      });
    }
    return res.status(200).json({
      data: staff,
    });
  } catch (error) {
    console.error("Error fetching building staff by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBuildingStaff = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Missing staff ID",
      });
    }
    // validate body
    const { error, value } = buidingStaffSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        errors: error.details.map((e) => e.message),
      });
    }
    const staffUpdate = await BuidingStaff.findOneAndUpdate(
      { _id: id },
      value,
      { new: true }
    );
    if (!staffUpdate) {
      return res.status(404).json({
        error: "Staff not found",
      });
    }
    return res.status(200).json({
      message: "Cập nhật nhân viên thành công",
      data: staffUpdate,
    });
  } catch (error) {
    console.error("Error updating building staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBuildingStaff = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Missing staff ID",
      });
    }
    const staffDelete = await BuidingStaff.findById({ _id: id });
    if (!staffDelete) {
      return res.status(404).json({
        error: "Staff not found",
      });
    }
    return res.status(200).json({
      message: "Xóa nhân viên thành công",
      data: staffDelete,
    });
  } catch (error) {
    console.error("Error deleting building staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
