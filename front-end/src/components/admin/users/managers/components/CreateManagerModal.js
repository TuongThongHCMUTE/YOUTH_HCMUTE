// Node Modules ============================================================ //
import React, { useState } from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from './CreateManagerModal.module.scss';
// APIs ==================================================================== //
import { createOneManager } from 'apis/manager';
// Constants =============================================================== //
import { MANAGER_TYPES } from 'helpers/constants/manager';
import { USER_ROLES } from 'helpers/constants/user';
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

// =======================|| CREATE MANAGER MODAL ||======================== //
const CreateManagerModal = (props) => {
    const { open, faculties, onClose, onRefetch } = props;
    const [creating, setCreating] = useState(false);
    const [alert, setAlert] = useState(null);

    const initialValues = {
      tenHienThi: '',
      email: '',
      soDienThoai: '',
      diaChi: '',
      donVi: { _id: 'none' },
      chucVu: '',
      role: USER_ROLES.CONG_TAC_VIEN,
      trangThai: true
    }

    const validateData = (values) => {
        const errors = {};

        if (!values.tenHienThi) {
          errors.tenHienThi = 'Tên hiển thị không được để trống.'
        }

        if (!values.email) {
          errors.email = 'Email không được để trống.'
        } 

        if (!values.donVi?._id || values.donVi?._id === 'none') {
            errors.donVi = 'Đơn vị không được để trống.'
          }

        return errors;
    };

    const handleCreateAccount = async (values, resetForm) => {
        try {
            setCreating(true);
          
            const res = await createOneManager(values);
            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: 'Thêm tài khoản thành công!'
                });
                resetForm();
                onRefetch(values.role);
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
            title="Thêm tài khoản"
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
                                    name='tenHienThi'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Tên hiển thị"
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.tenHienThi || ''}
                                    error={errors.tenHienThi}
                                    helperText={errors.tenHienThi}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <FormControl 
                                    fullWidth 
                                    variant='outlined' 
                                    className='text-field'
                                    error={errors.donVi}
                                >
                                    <InputLabel id="faculty-group">Đơn vị *</InputLabel>
                                    <Select
                                        name='donVi._id'
                                        labelId="faculty-group"
                                        id="input-faculty"
                                        value={values?.donVi?._id || 'none'}
                                        label="Đơn vị *"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.donVi}
                                        helperText={errors.donVi}
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
                                <TextField 
                                    name='email'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Email"
                                    required
                                    value={values?.email || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='soDienThoai'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Số điện thoại"
                                    value={values?.soDienThoai || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.soDienThoai}
                                    helperText={errors.soDienThoai}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ p: 2 }}>
                                <TextField 
                                    name='diaChi'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Địa chỉ"
                                    value={values?.diaChi || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.diaChi}
                                    helperText={errors.diaChi}
                                />
                            </Grid>
                            {/* THÔNG TIN TÀI KHOẢN */}
                            <Grid item xs={12} mt={2}>
                                <h3 className={styles.SectionTitle}>Thông tin tài khoản</h3>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <FormControl fullWidth variant='outlined' className='text-field'>
                                    <InputLabel id="role-group">Phân quyền</InputLabel>
                                    <Select
                                        name='role'
                                        labelId="role-group"
                                        id="input-role"
                                        value={values?.role || USER_ROLES.CONG_TAC_VIEN}
                                        label="Phân quyền"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {MANAGER_TYPES.map((i) => (
                                            <MenuItem key={i.value} value={i.value}>{i.display}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='chucVu'
                                    className={styles.TextField}
                                    variant="outlined"
                                    label="Chức vụ"
                                    value={values?.chucVu || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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
                                onClose={() => setAlert(null)}
                            />
                        }
                    </form>
                )}
            </Formik>
        </BaseModal>
    )
}

export default CreateManagerModal