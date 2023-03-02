/* eslint-disable indent */
/* eslint-disable quotes */
// Node Modules ============================================================ //
import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from '../BarcodeSearchPage.module.scss';
// Redux =================================================================== //
import { activeFacultiesSelector } from 'redux/selectors/faculty-selectors';
import { activeClassesSelector } from 'redux/selectors/class-selectors';
// Material UI ============================================================= //
import {
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LoadingButton from '@mui/lab/LoadingButton';
// Helpers ================================================================= //
import {
  TRANG_THAI_DOAN_VIEN,
  TRANG_THAI_SO_DOAN,
  validateStudentInfoForm
} from 'helpers/student';

// =============================|| INFO FORM ||============================= //
const StudentInfoForm = props => {
  const { student, onSubmit } = props;
  const faculties = useSelector(activeFacultiesSelector);
  const classes = useSelector(activeClassesSelector);

  const FACULTY_OPTIONS = [
    { _id: undefined, tenDonVi: 'Chọn khoa' },
    ...faculties
  ];

  const CLASS_OPTIONS = [{ _id: undefined, tenLop: 'Chọn lớp' }, ...classes];

  const GENERAL_INFO_FIELDS = [
    {
      name: 'ho',
      label: 'Họ và tên đệm',
      required: true,
      defaultValue: '',
      col: 6
    },
    {
      name: 'ten',
      label: 'Tên',
      required: true,
      defaultValue: '',
      col: 6
    },
    {
      name: 'ngaySinh',
      label: 'Ngày sinh',
      required: true,
      defaultValue: '1990-01-01',
      col: 3
    },
    {
      name: 'gioiTinh',
      label: 'Giới tính',
      defaultValue: '',
      required: false,
      col: 3
    },
    {
      name: 'danToc',
      label: 'Dân tộc',
      defaultValue: '',
      required: false,
      col: 3
    },
    {
      name: 'tonGiao',
      label: 'Tôn giáo',
      defaultValue: '',
      required: false,
      col: 3
    },
    {
      name: 'khoaHoc',
      label: 'Khóa học',
      defaultValue: '',
      required: false,
      col: 6
    },
    {
      name: 'nganhHoc',
      label: 'Ngành học',
      defaultValue: '',
      required: false,
      col: 6
    },
    {
      id: 'faculty',
      name: 'donVi',
      label: 'Khoa',
      required: true,
      defaultValue: undefined,
      options: FACULTY_OPTIONS,
      col: 6
    },
    {
      id: 'class',
      name: 'lopSV',
      label: 'Lớp',
      required: true,
      defaultValue: undefined,
      options: CLASS_OPTIONS,
      col: 6
    },
    {
      name: 'doanVien',
      label: 'Đoàn viên',
      options: TRANG_THAI_DOAN_VIEN,
      defaultValue: false,
      col: 6
    },
    {
      name: 'chucVu',
      label: 'Chức vụ',
      defaultValue: '',
      required: false,
      col: 6
    }
  ];

  const CONTACT_INFO_FIELDS = [
    {
      name: 'email',
      label: 'Email',
      defaultValue: '',
      required: false,
      readOnly: true,
      col: 6
    },
    {
      name: 'soDienThoai',
      label: 'Số điện thoại',
      defaultValue: '',
      required: false,
      col: 6
    },
    {
      name: 'diaChi',
      label: 'Địa chỉ',
      defaultValue: '',
      required: false,
      col: 12
    }
  ];

  const STUDENT_INFO_SECTIONS = [
    {
      id: 'thong-tin-chung',
      name: 'Thông tin chung',
      fields: GENERAL_INFO_FIELDS
    },
    {
      id: 'thong-tin-lien-he',
      name: 'Thông tin liên hệ',
      fields: CONTACT_INFO_FIELDS
    }
  ];

  const getLabel = item => {
    let label = item.label;
    if (item.readOnly) {
      label += ' (read-only)';
    }
    return label;
  };

  const renderStudentInfoInputs = (
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue
  ) => {
    return STUDENT_INFO_SECTIONS.map(section => (
      <Grid container key={section.id}>
        <Grid item xs={12} sx={{ p: 1.5 }}>
          <Typography className={styles.SectionTitle}>
            {section.name}
          </Typography>
        </Grid>
        {section.fields.map(item => {
          switch (item.name) {
            case 'ngaySinh':
              return (
                <Grid
                  item
                  key={item.name}
                  sm={item.col}
                  xs={12}
                  sx={{ p: 1.5 }}
                >
                  <DatePicker
                    name={item.name}
                    views={['year', 'month', 'day']}
                    inputFormat="DD/MM/yyyy"
                    label={getLabel(item)}
                    value={
                      values && values[item.name]
                        ? moment(values[item.name]).format('YYYY-MM-DD')
                        : moment(item.defaultValue).format('YYY-MM-DD')
                    }
                    onChange={value => setFieldValue(item.name, value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        className="text-field"
                        helperText={null}
                        variant="outlined"
                        type="date"
                        size="small"
                        required={item.required}
                      />
                    )}
                  />
                </Grid>
              );
            case 'donVi':
              return (
                <Grid
                  item
                  key={item.name}
                  sm={item.col}
                  xs={12}
                  sx={{ p: 1.5 }}
                >
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    className="text-field"
                    error={errors?.[item.name]}
                  >
                    <InputLabel id={`${item.id}-group`}>
                      {getLabel(item)}
                    </InputLabel>
                    <Select
                      name={`${item.name}._id`}
                      labelId={`${item.id}-group`}
                      id={`input-${item.id}`}
                      value={
                        values && values[item.name] && values[item.name]._id
                          ? values[item.name]._id
                          : item.defaultValue
                      }
                      label={getLabel(item)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {item.options.map(i => (
                        <MenuItem key={i._id || 'select'} value={i._id}>
                          {i.tenDonVi}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.[item.name] && (
                      <FormHelperText>{errors[item.name]}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              );
            case 'lopSV':
              return (
                <Grid
                  item
                  key={item.name}
                  sm={item.col}
                  xs={12}
                  sx={{ p: 1.5 }}
                >
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    className="text-field"
                    error={errors?.[item.name]}
                  >
                    <InputLabel id={`${item.id}-group`}>
                      {getLabel(item)}
                    </InputLabel>
                    <Select
                      name={`${item.name}._id`}
                      labelId={`${item.id}-group`}
                      id={`input-${item.id}`}
                      value={
                        values && values[item.name] && values[item.name]._id
                          ? values[item.name]._id
                          : item.defaultValue
                      }
                      label={getLabel(item)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {item.options
                        .filter(
                          c =>
                            c._id === undefined ||
                            c.donVi._id === values?.donVi._id
                        )
                        .map(i => (
                          <MenuItem key={i._id || 'select'} value={i._id}>
                            {i.tenLop}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors?.[item.name] && (
                      <FormHelperText>{errors[item.name]}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              );
            case 'doanVien':
              return (
                <Grid
                  item
                  key={item.name}
                  sm={item.col}
                  xs={12}
                  sx={{ p: 1.5 }}
                >
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    className="text-field"
                    error={errors?.[item.name]}
                  >
                    <InputLabel>{getLabel(item)}</InputLabel>
                    <Select
                      name={item.name}
                      value={
                        values && values[item.name]
                          ? values[item.name]
                          : item.defaultValue
                      }
                      label={getLabel(item)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {item.options.map(i => (
                        <MenuItem key={i.value} value={i.value}>
                          {i.displayName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.[item.name] && (
                      <FormHelperText>{errors[item.name]}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              );
            default:
              return (
                <Grid
                  item
                  key={item.name}
                  sm={item.col}
                  xs={12}
                  sx={{ p: 1.5 }}
                >
                  <TextField
                    name={item.name}
                    className="text-field"
                    variant="outlined"
                    size="small"
                    label={getLabel(item)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      values && values[item.name]
                        ? values[item.name]
                        : item.defaultValue
                    }
                    inputProps={{
                      readOnly: item.readOnly
                    }}
                    required={item.required}
                    error={errors?.[item.name]}
                    helperText={errors?.[item.name]}
                  />
                </Grid>
              );
          }
        })}
      </Grid>
    ));
  };

  return (
    <Formik
      initialValues={student}
      enableReinitialize
      validate={values => validateStudentInfoForm(values)}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(values).then(() => {
          setSubmitting(false);
        });
      }}
    >
      {({
        values,
        errors,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
            <Grid container sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {renderStudentInfoInputs(
                values,
                errors,
                handleChange,
                handleBlur,
                setFieldValue
              )}
              {values.doanVien && (
                <>
                  <Grid item xs={12} sx={{ p: 1.5 }}>
                    <Typography className={styles.SectionTitle}>
                      Đoàn viên
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ p: 1.5 }}>
                    <DatePicker
                      name="thongTinDoanVien.ngayVaoDoan"
                      views={['year', 'month', 'day']}
                      inputFormat="DD/MM/yyyy"
                      label="Ngày vào Đoàn"
                      value={
                        values.thongTinDoanVien?.ngayVaoDoan
                          ? moment(values.thongTinDoanVien.ngayVaoDoan).format(
                              'YYYY-MM-DD'
                            )
                          : moment('1990-01-01').format('YYYY-MM-DD')
                      }
                      onChange={value =>
                        setFieldValue('thongTinDoanVien.ngayVaoDoan', value)
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          className="text-field"
                          helperText={null}
                          variant="outlined"
                          size="small"
                          type="date"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ p: 1.5 }}>
                    <TextField
                      name="thongTinDoanVien.noiVaoDoan"
                      className="text-field"
                      variant="outlined"
                      size="small"
                      label="Nơi vào Đoàn"
                      value={values.thongTinDoanVien?.noiVaoDoan || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ p: 1.5 }}>
                    <TextField
                      name="thongTinDoanVien.soTheDoan"
                      className="text-field"
                      variant="outlined"
                      size="small"
                      label="Số thẻ đoàn"
                      value={values.thongTinDoanVien?.soTheDoan || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ p: 1.5 }}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      className="text-field"
                    >
                      <InputLabel>Tình trạng sổ đoàn</InputLabel>
                      <Select
                        name="thongTinDoanVien.trangThaiSoDoan"
                        value={
                          values.thongTinDoanVien?.trangThaiSoDoan || 'CHUA_NOP'
                        }
                        label="Tình trạng sổ đoàn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {TRANG_THAI_SO_DOAN.map(status => (
                          <MenuItem key={status.value} value={status.value}>
                            {status.display}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
              <Grid item xs={12} sx={{ p: 1.5 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  className="button"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  sx={{ float: 'right' }}
                >
                  LƯU THAY ĐỔI
                </LoadingButton>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>
      )}
    </Formik>
  );
};

export default StudentInfoForm;
