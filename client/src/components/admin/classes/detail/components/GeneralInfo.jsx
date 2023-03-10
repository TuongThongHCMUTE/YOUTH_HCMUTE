// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from '../ClassDetailPage.module.scss';
// Helpers ================================================================= //
import { TRANG_THAI_CHI_DOAN, validateGeneralInfoForm } from 'helpers/class';
// Material UI ============================================================= //
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// My Components =========================================================== //
import CircularLoading from 'components/common/CircularLoading';

// =========================|| GENERAL INFORMATION ||======================= //
const GeneralInfo = props => {
  const { data, loading, updating, faculties, onUpdate } = props;

  const initialValues = {
    name: data?.tenLop,
    major: data?.nganhHoc,
    faculty: data?.donVi,
    status: data?.hienThi,
    id: data?._id
  };

  const handleSubmit = values => {
    const data = {
      _id: values.id,
      tenLop: values.name,
      nganhHoc: values.major,
      donVi: values.faculty,
      hienThi: values.status
    };
    onUpdate(data);
  };

  if (loading) {
    return <CircularLoading />;
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={values => validateGeneralInfoForm(values)}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={values => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <form className={styles.Form} onSubmit={handleSubmit}>
          <TextField
            name="name"
            className={clsx('text-field', styles.TextField)}
            label="Tên chi đoàn"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name || ''}
            error={errors.name}
            helperText={errors.name}
          />
          <FormControl
            fullWidth
            className={clsx('text-field', styles.TextField)}
            error={errors.faculty}
          >
            <InputLabel id="faculty-group">Khoa</InputLabel>
            <Select
              name="faculty._id"
              labelId="faculty-group"
              id="input-faculty"
              value={values?.faculty?._id || undefined}
              label="Khoa"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {[{ _id: undefined, tenDonVi: 'Chọn khoa' }, ...faculties].map(
                f => (
                  <MenuItem key={f._id || 'undefined'} value={f._id}>
                    {f.tenDonVi}
                  </MenuItem>
                )
              )}
            </Select>
            {errors.faculty && (
              <FormHelperText>{errors.faculty}</FormHelperText>
            )}
          </FormControl>
          <TextField
            name="major"
            className={clsx('text-field', styles.TextField)}
            label="Ngành học"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.major || ''}
            error={errors.major}
            helperText={errors.major}
          />
          <FormControl
            fullWidth
            className={clsx('text-field', styles.TextField)}
            error={errors.status}
          >
            <InputLabel id="status-group">Trạng thái</InputLabel>
            <Select
              name="status"
              labelId="status-group"
              id="input-status"
              value={values?.status || false}
              label="Trạng thái"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {TRANG_THAI_CHI_DOAN.map(i => (
                <MenuItem key={i.value} value={i.value}>
                  {i.display}
                </MenuItem>
              ))}
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
          <div className={styles.Actions}>
            <LoadingButton
              type="submit"
              variant="contained"
              className={clsx('button', styles.Button)}
              loading={updating}
            >
              Lưu lại
            </LoadingButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default GeneralInfo;
