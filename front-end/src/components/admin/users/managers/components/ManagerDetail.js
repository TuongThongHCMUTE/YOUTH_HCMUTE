// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from './ManagerDetail.module.scss';
// APIs ==================================================================== //
import { getOneManagerById, updateOneManager } from 'apis/manager';
import { getAllFaculties } from 'apis/faculty';
// Constants =============================================================== //
import { MANAGER_TYPES } from 'helpers/constants/manager';
import { USER_STATUSES } from 'helpers/constants/user';
// Material UI ============================================================= //
import { 
    Grid,
    InputLabel,
    FormControl,
    MenuItem,
    Select,  
    TextField, 
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import WestIcon from '@mui/icons-material/West';
// My components =========================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';
import BorderTopCard from 'ui-component/cards/BorderTopCard';
import SnackBar from 'components/common/alert/Snackbar';

// ===========================|| MANAGER DETAIL||=========================== //
const FormComponent = ({ data, faculties, onSubmit, updating }) => {
    const validateData = (values) => {
        const errors = {};
        return errors;
    };

    return (
        <Formik
            className={styles.InfoForm}
            initialValues={data}
            enableReinitialize
            validate={values => validateData(values)}
            onSubmit={(values) => {
                onSubmit(values);
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
                <form onSubmit={handleSubmit}>                 
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
                                variant="filled"
                                label="Tên hiển thị"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.tenHienThi || ''}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ p: 2 }}>
                            <FormControl fullWidth variant='filled' className='text-field'>
                                <InputLabel id="faculty-group">Đơn vị</InputLabel>
                                <Select
                                    name='donVi._id'
                                    labelId="faculty-group"
                                    id="input-faculty"
                                    value={values?.donVi?._id || undefined}
                                    label="Đơn vị"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {[
                                        { _id: undefined, tenDonVi: 'Chọn khoa'}, 
                                        ...faculties
                                    ].map((f) => (
                                        <MenuItem key={f._id} value={f._id}>{f.tenDonVi}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ p: 2 }}>
                            <TextField 
                                name='email'
                                className={styles.TextField}
                                variant="filled"
                                label="Email"
                                value={values?.email || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ p: 2 }}>
                            <TextField 
                                name='soDienThoai'
                                className={styles.TextField}
                                variant="filled"
                                label="Số điện thoại"
                                value={values?.soDienThoai || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ p: 2 }}>
                            <TextField 
                                name='diaChi'
                                className={styles.TextField}
                                variant="filled"
                                label="Địa chỉ"
                                value={values?.diaChi || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        {/* THÔNG TIN TÀI KHOẢN */}
                        <Grid item xs={12} mt={2}>
                            <h3 className={styles.SectionTitle}>Thông tin tài khoản</h3>
                        </Grid>
                        <Grid item xs={4} sx={{ p: 2 }}>
                            <FormControl fullWidth variant='filled' className='text-field'>
                                <InputLabel id="role-group">Phân quyền</InputLabel>
                                <Select
                                    name='role'
                                    labelId="role-group"
                                    id="input-role"
                                    value={values?.role || undefined}
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
                        <Grid item xs={4} sx={{ p: 2 }}>
                            <TextField 
                                name='chucVu'
                                className={styles.TextField}
                                variant="filled"
                                label="Chức vụ"
                                value={values?.chucVu || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ p: 2 }}>
                            <FormControl fullWidth variant='filled' className='text-field'>
                                <InputLabel id="status-group">Trạng thái</InputLabel>
                                <Select
                                    name='trangThai'
                                    labelId="status-group"
                                    id="input-status"
                                    value={values?.trangThai || false}
                                    label="Trạng thái"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {USER_STATUSES.map((i) => (
                                        <MenuItem key={i.value} value={i.value}>{i.display}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ p: 2 }}>
                            <LoadingButton
                                type='submit'
                                variant='contained'
                                className={clsx('button', styles.Button)}
                                loading={updating}
                            >
                                LƯU THAY ĐỔI
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    )
};

const ManagerDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [faculties, setFaculties] = useState([]);
    const [alert, setAlert] = useState(null);

    const getManagerData = async () => {
        try {
          setLoading(true);
          const res = await getOneManagerById(id);
    
          if (res.data.status === 'success') {
            setData(res.data.data.manager);
          } else {
            // log error message
          }
        } catch (err) {
          console.error(err);
        //   setErrorMessange(err.response.data.message);
        } finally {
          setLoading(false);
        }
    };

    const getFaculties = async () => {
        try {
            const res = await getAllFaculties();
    
            if (res.data.status === 'success') {
                setFaculties(res.data.data.faculties);
            }
        } catch (err) {
            // setErrorMessange(err.response.data.message);
        }
    };

    useEffect(() => {
        getManagerData();
        getFaculties();
      }, [])

    const handleSubmit = async (values) => {
        setUpdating(true);

        try {
            const res = await updateOneManager(values);

            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: 'Cập nhật thông tin thành công!'
                });
            }
        } catch (error) {
            console.error("error: ", error.response.data.message);
            setAlert({
                severity: 'error',
                message: error.response.data.message
            });
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className={styles.DetailPage}>
            <Grid container className={styles.Header}>
                <Grid item xs={4}><h1 className={styles.Title}>THÔNG TIN QUẢN TRỊ VIÊN</h1></Grid>
            </Grid>
            <div className={styles.Link}>
                <Link to={{
                    pathname: '/users/quan-tri-vien'
                }}>
                    <WestIcon className={styles.BackIcon} />
                    Trở về trang danh sách
                </Link>
            </div>
            <Grid container className={styles.Body}>
                <Grid item xs={8} className={styles.Left}>
                    <BorderTopCard
                        borderColor="var(--color-grey-300"
                        topColor="var(--color-primary-400)"
                    >
                        { !loading && faculties ?
                            <FormComponent 
                                data={data} 
                                faculties={faculties} 
                                updating={updating}
                                onSubmit={handleSubmit} 
                            /> : 
                            <CircularLoading />
                        }
                    </BorderTopCard>
                </Grid>
            </Grid>
            {alert && 
                <SnackBar 
                    message={alert.message}
                    severity={alert.severity}
                    onClose={() => setAlert(null)}
                />
            }
        </div>
    );
};

export default ManagerDetail;