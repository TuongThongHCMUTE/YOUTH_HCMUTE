import { ERROR_MESSAGE } from './message';

export const CHUC_VU_CHI_DOAN = [
  {
    display: 'Bí thư',
    value: 'BI_THU'
  },
  {
    display: 'P.Bí thư',
    value: 'PHO_BI_THU'
  },
  {
    display: 'UV BCH',
    value: 'UV_BCH'
  }
];

export const TRANG_THAI_CHI_DOAN = [
  {
    display: 'Active',
    value: true
  },
  {
    display: 'Inactive',
    value: false
  }
];

export const validateGeneralInfoForm = values => {
  const errors = {};

  if (!values.name) {
    errors.name = ERROR_MESSAGE.requireClassName;
  }
  if (!values.faculty || !values.faculty._id) {
    errors.faculty = ERROR_MESSAGE.requireFaculty;
  }
  if (!values.major) {
    errors.major = ERROR_MESSAGE.requireMajor;
  }

  return errors;
};

export const addManager = (managers, student, position) => {
  const index = managers.findIndex(i => i.chucVu === position);

  if (index !== -1) {
    managers[index] = {
      chucVu: position,
      maSoSV: student.maSoSV,
      hoTen: student.ho + ' ' + student.ten,
      sinhVien: student
    };
  } else {
    managers = [
      ...managers,
      {
        chucVu: position,
        maSoSV: student.maSoSV,
        hoTen: student.ho + ' ' + student.ten,
        sinhVien: student
      }
    ];
  }

  return [...managers];
};

export const removeManager = (managers, id) => {
  return managers.filter(i => i.maSoSV !== id);
};
