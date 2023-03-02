export const TRANG_THAI_DOAN_VIEN = [
  { value: true, displayName: 'Đoàn viên' },
  { value: false, displayName: 'Sinh viên' },
];

export const TRANG_THAI_SO_DOAN = [
  { value: 'CHUA_NOP', display: 'Chưa nộp' },
  { value: 'DA_NOP', display: 'Đã nộp' },
  { value: 'DA_RUT', display: 'Đã rút' },
];

export const validateStudentInfoForm = (values) => {
  const errors = {};

  if (!values.ho) {
    errors.ho = 'Thông tin bắt buộc';
  }
  if (!values.ten) {
    errors.ten = 'Thông tin bắt buộc';
  }
  if (!values.lopSV?._id) {
    errors.lopSV = 'Thông tin bắt buộc';
  }
  if (!values.donVi?._id) {
    errors.donVi = 'Thông tin bắt buộc';
  }

  return errors;
};