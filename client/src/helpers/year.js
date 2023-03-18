import moment from 'moment';
import { ERROR_MESSAGE } from './message';

export const TRANG_THAI_NAM_HOC_OPTIONS = [
  {
    display: 'Hiển thị',
    value: true
  },
  {
    display: 'Ẩn',
    value: false
  }
];

export const NAM_HOC_HIEN_TAI_OPTIONS = [
  {
    display: 'Năm hiện tại',
    value: true
  },
  {
    display: 'Không',
    value: false
  }
];

export const NAM_HOC_INIT_VALUES = {
  maNamHoc: '',
  tenNamHoc: '',
  chuDeNamHoc: '',
  moTa: '',
  ngayBatDau: moment(),
  ngayKetThuc: moment(),
  hienThi: true,
  nameHocHienTai: false
};

export const validateInfoForm = values => {
  const errors = {};

  if (!values.maNamHoc) {
    errors.maNamHoc = ERROR_MESSAGE.requireYearCode;
  }
  if (!values.tenNamHoc) {
    errors.tenNamHoc = ERROR_MESSAGE.requireYearName;
  }

  return errors;
};
