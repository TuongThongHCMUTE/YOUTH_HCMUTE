// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/vi';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from './YearManagementPage.module.scss';
// Helpers ================================================================= //
import {
  NAM_HOC_INIT_VALUES,
  NAM_HOC_HIEN_TAI_OPTIONS,
  TRANG_THAI_NAM_HOC_OPTIONS,
  validateInfoForm
} from 'helpers/year';
// Material UI ============================================================= //
import {
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// My components =========================================================== //
import { BaseModal } from 'components/common/modal';

// ========================|| YEAR DETAIL MODAL ||========================== //
const YearDetailModal = props => {
  const { open, data, isUpdate, saving, onClose, onSave } = props;
  
  const [formData, setFormData] = useState(NAM_HOC_INIT_VALUES);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  return (
    <BaseModal visible={open} title="Năm học" onClose={onClose}>
      <Formik
        initialValues={formData}
        enableReinitialize
        validate={values => validateInfoForm(values)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => {
          onSave(values, isUpdate, () => { !isUpdate && resetForm() });
        }}
      >
        {({
          values,
          errors,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
        }) => (
          <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
            <form className={styles.Form} onSubmit={handleSubmit}>
              <Grid
                container
                sx={{ display: 'flex', flexWrap: 'wrap', padding: '16px' }}
              >
                <Grid item xs={12}>
                  <h3 className={styles.SectionTitle}>Thông tin năm học</h3>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <TextField
                    name="maNamHoc"
                    className={styles.TextField}
                    variant="outlined"
                    label="Mã năm học"
                    disabled={isUpdate}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.maNamHoc || ''}
                    error={errors.maNamHoc}
                    helperText={errors.maNamHoc}
                  />
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <TextField
                    name="tenNamHoc"
                    className={styles.TextField}
                    variant="outlined"
                    label="Tên năm học"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.tenNamHoc || ''}
                    error={errors.tenNamHoc}
                    helperText={errors.tenNamHoc}
                  />
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <DatePicker
                    name="ngayBatDau"
                    views={['year', 'month', 'day']}
                    inputFormat="DD/MM/yyyy"
                    label="Ngày bắt đầu"
                    value={
                      values?.ngayBatDau
                        ? moment(values.ngayBatDau).format('YYYY-MM-DD')
                        : moment().format('YYYY-MM-DD')
                    }
                    onChange={value => setFieldValue('ngayBatDau', value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        className="text-field"
                        helperText={null}
                        variant="outlined"
                        type="date"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <DatePicker
                    name="ngayKetThuc"
                    views={['year', 'month', 'day']}
                    inputFormat="DD/MM/yyyy"
                    label="Ngày kết thúc"
                    value={
                      values?.ngayKetThuc
                        ? moment(values.ngayKetThuc).format('YYYY-MM-DD')
                        : moment().format('YYYY-MM-DD')
                    }
                    onChange={value => setFieldValue('ngayKetThuc', value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        className="text-field"
                        helperText={null}
                        variant="outlined"
                        type="date"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ p: 2 }}>
                  <TextField
                    name="chuDeNamHoc"
                    className={styles.TextField}
                    variant="outlined"
                    label="Chủ đề năm học"
                    value={values?.chuDeNamHoc || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.chuDeNamHoc}
                    helperText={errors.chuDeNamHoc}
                  />
                </Grid>
                <Grid item xs={12} sx={{ p: 2 }}>
                  <TextField
                    name="moTa"
                    className={styles.TextField}
                    variant="outlined"
                    label="Mô tả"
                    value={values?.moTa || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.chuDeNamHoc}
                    helperText={errors.chuDeNamHoc}
                  />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <h3 className={styles.SectionTitle}>Tùy chọn</h3>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className="text-field"
                  >
                    <InputLabel id="hienThi">Hiển thị</InputLabel>
                    <Select
                      name="hienThi"
                      labelId="hienThi-group"
                      id="input-hienThi"
                      value={values?.hienThi || false}
                      label="Hiển thị"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {TRANG_THAI_NAM_HOC_OPTIONS.map(i => (
                        <MenuItem key={i.value} value={i.value}>
                          {i.display}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className="text-field"
                  >
                    <InputLabel id="namHocHienTai">Năm học hiện tại</InputLabel>
                    <Select
                      name="namHocHienTai"
                      labelId="namHocHienTai-group"
                      id="input-namHocHienTai"
                      value={values?.namHocHienTai || false}
                      label="Năm học hiện tại"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {NAM_HOC_HIEN_TAI_OPTIONS.map(i => (
                        <MenuItem key={i.value} value={i.value}>
                          {i.display}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    mt: 2,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    className={clsx('button', styles.Button)}
                    loading={saving}
                  >
                    Lưu lại
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </LocalizationProvider>
        )}
      </Formik>
    </BaseModal>
  );
};

export default YearDetailModal;
