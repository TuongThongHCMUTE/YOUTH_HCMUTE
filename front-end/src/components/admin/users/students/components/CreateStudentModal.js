// Node Modules ============================================================ //
import React, { useState } from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from './CreateStudentModal.module.scss';
// APIs ==================================================================== //
import { createOneStudent } from 'apis/student';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/constants/user';
import { studentStatuses } from 'store/constant';
// Material UI ============================================================= //
import { 
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,  
  TextField, 
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// My components =========================================================== //
import BaseModal from 'components/common/modal/base/BaseModal';
import SnackBar from 'components/common/alert/Snackbar';

// =======================|| CREATE STUDENT MODAL ||======================== //
const CreateStudentModal = (props) => {
    const { open, faculties, classes, onClose, onRefetch } = props;
    const [creating, setCreating] = useState(false);
    const [alert, setAlert] = useState(null);

    const initialValues = {
      ho: '',
      ten: '',
      email: '',
      maSoSV: '',
      diaChi: '',
      donVi: { _id: 'none' },
      lopSV: { _id: 'none' },
      doanVien: false
    }

    const validateData = (values) => {
        const errors = {};

        if (!values.ho) {
          errors.ho = 'Họ không được để trống.'
        }

        if (!values.ten) {
            errors.ten = 'Tên không được để trống.'
        }

        if (!values.email) {
          errors.email = 'Email không được để trống.'
        } 

        if (!values.maSoSV) {
            errors.email = 'Mã số sinh viên không được để trống.'
          } 

        if (!values.donVi || values.donVi._id === 'none') {
            errors.donVi = 'Khoa không được để trống.'
        }

        if (!values.lopSV || values.lopSV._id === 'none') {
            errors.lopSV = 'Lớp không được để trống.'
        }

        return errors;
    };

    const handleCreateAccount = async (values, resetForm) => {
        try {
            setCreating(true);
          
            const res = await createOneStudent(values);
            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: 'Thêm tài khoản thành công!'
                });
                resetForm();
                onRefetch();
            }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại'
            });
        } finally {
          setCreating(false);
        }
    }

    return (
        <BaseModal
            visible={open}
            title="Thêm sinh viên"
            onClose={onClose}
        >
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validate={values => validateData(values)}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { resetForm }) => {
                    handleCreateAccount(values, resetForm);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form className={styles.Form} onSubmit={handleSubmit}>                 
                        <Grid
                            container
                            sx={{ display: 'flex', flexWrap: 'wrap', padding: '16px' }}
                        >
                            {/* THÔNG TIN CÁ NHÂN */}
                            <Grid item xs={12}>
                                <h3 className={styles.SectionTitle}>Thông tin cá nhân</h3>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='ho'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Họ *"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.ho || ''}
                                    error={errors.ho}
                                    helperText={errors.ho}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='ten'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Tên *"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.ten || ''}
                                    error={errors.ten}
                                    helperText={errors.ten}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='email'
                                    type='email'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Email *"
                                    value={values?.email || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='maSoSV'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Mã số sinh viên *"
                                    value={values?.maSoSV || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.maSoSV}
                                    helperText={errors.maSoSV}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <FormControl 
                                    fullWidth 
                                    variant='outlined' 
                                    className='text-field'
                                    error={errors.donVi}
                                >
                                    <InputLabel id="faculty-group">Khoa *</InputLabel>
                                    <Select
                                        name='donVi._id'
                                        labelId="faculty-group"
                                        id="input-faculty"
                                        value={values?.donVi?._id || 'none'}
                                        label="Khoa *"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {[
                                            { _id: 'none', tenDonVi: 'Chọn khoa'}, 
                                            ...faculties
                                        ].map((f) => (
                                            <MenuItem key={f._id} value={f._id}>{f.tenDonVi}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.donVi && <FormHelperText>{errors.donVi}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <FormControl 
                                    fullWidth 
                                    variant='outlined' 
                                    className='text-field'
                                    error={errors.lopSV}
                                >
                                    <InputLabel id="class-group">Lớp *</InputLabel>
                                    <Select
                                        name='lopSV._id'
                                        labelId="class-group"
                                        id="input-class"
                                        value={values?.lopSV?._id || 'none'}
                                        label="Lớp *"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {[
                                            { _id: 'none', tenLop: 'Chọn lớp'}, 
                                            ...classes
                                        ].map((f) => (
                                            <MenuItem key={f._id} value={f._id}>{f.tenLop}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.lopSV && <FormHelperText>{errors.lopSV}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            {/* THÔNG TIN TÀI KHOẢN */}
                            <Grid item xs={12} mt={2}>
                                <h3 className={styles.SectionTitle}>Thông tin đoàn viên</h3>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <FormControl fullWidth variant='outlined' className='text-field'>
                                    <InputLabel>Đoàn viên</InputLabel>
                                    <Select
                                        name='doanVien'
                                        value={values?.doanVien || false}
                                        label="Tình trạng"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {studentStatuses.map((status) => (
                                            <MenuItem key={status.value} value={status.value}>{status.displayName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2, p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <LoadingButton
                                    type='submit'
                                    variant='contained'
                                    className={clsx('button', styles.Button)}
                                    loading={creating}
                                >
                                    Tạo tài khoản
                                </LoadingButton>
                            </Grid>
                        </Grid>
                        {alert && 
                            <SnackBar 
                                message={alert.message}
                                severity={alert.severity}
                                duration={3000}
                                onClose={() => setAlert(null)}
                            />
                        }
                    </form>
                )}
            </Formik>
        </BaseModal>
    )
}

export default CreateStudentModal