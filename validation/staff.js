import Joi from "joi";
const buidingStaffSchema = Joi.object({
  ma_nhan_vien: Joi.string().required(),
  ten: Joi.string().required(),
  ngay_sinh: Joi.date().required(),
  dia_chi: Joi.string().required(),
  so_dien_thoai: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required()
    .messages({ "string.pattern.base": "Số điện thoại không hợp lệ" }),
  bac: Joi.string().required(),
  vi_tri: Joi.string().required(),
  dich_vu_phu_trach: Joi.array().items(Joi.string()).default([]),
  luong: Joi.number().min(0).required(),
});
export default buidingStaffSchema;
