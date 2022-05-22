// Node Modules ============================================================ //
import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import 'moment/locale/vi';

// Styles ================================================================== //
import styles from './InfoForm.module.css';

// Material UI ============================================================= //
import { 
    Button, 
    Grid, 
    InputLabel,
    FormControl,
    MenuItem,
    Select,  
    TextField, 
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider, DatePicker} from '@mui/lab';

// Constants =============================================================== //
import { bookStatuses, studentStatuses } from 'store/constant';

// =============================|| INFO FORM ||============================= //
const InfoForm = (props) => {
    const { student, faculties, classes, onSubmit } = props;

    const validateData = (values) => {
        const errors = {};
        return errors;
    }

    return (
        <Formik 
            className={styles.InfoForm}
            initialValues={student}
            enableReinitialize
            validate={values => validateData(values)}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                onSubmit(values).then(() => {
                    alert('Cập nhật thông tin thành công!')
                    setSubmitting(false);
                });
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
                    <LocalizationProvider locale='vi' dateAdapter={DateAdapter}>                        
                        <Grid
                            container
                            sx={{ display: 'flex', flexWrap: 'wrap' }}
                        >
                            {/* THÔNG TIN CHUNG */}
                            <Grid item xs={12}>
                                <h3 className={styles.SectionTitle}>Thông tin chung</h3>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='ho'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Họ và tên đệm"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ho || ''}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='ten'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Tên"
                                    value={values.ten || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <DatePicker
                                    name='ngaySinh'
                                    views={['year', 'month', 'day']}
                                    inputFormat="DD/MM/yyyy"
                                    label="Ngày sinh"
                                    value={values.ngaySinh ? moment(values.ngaySinh).format('YYYY-MM-DD') : moment('1990-01-01').format('YYY-MM-DD')}
                                    onChange={value => setFieldValue('ngaySinh', value)}
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params}
                                            className='text-field' 
                                            helperText={null} 
                                            variant="filled"
                                            type='date'
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='gioiTinh'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Giới tính"
                                    value={values.gioiTinh || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='danToc'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Dân tộc"
                                    value={values.danToc || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='tonGiao'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Tôn giáo"
                                    value={values.tonGiao || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='khoaHoc'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Khóa"
                                    value={values.khoaHoc || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='nganhHoc'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Ngành học"
                                    value={values.nganhHoc || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <FormControl fullWidth variant='filled' className='text-field'>
                                    <InputLabel id="faculty-group">Khoa</InputLabel>
                                    <Select
                                        name='donVi._id'
                                        labelId="faculty-group"
                                        id="input-faculty"
                                        value={values?.donVi?._id || undefined}
                                        label="Khoa"
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
                                <FormControl fullWidth variant='filled' className='text-field'>
                                    <InputLabel id="class-group">Lớp</InputLabel>
                                    <Select
                                        name='lopSV._id'
                                        labelId="class-group"
                                        id="input-class"
                                        value={values?.lopSV?._id || undefined}
                                        label="Lớp"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {[
                                            { _id: undefined, tenLop: 'Chọn lớp'}, 
                                            ...classes?.filter(i => i.donVi._id === values?.donVi?._id)
                                        ].map((c) => (
                                            <MenuItem key={c._id} value={c._id}>{c.tenLop}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <FormControl fullWidth variant='filled' className='text-field'>
                                    <InputLabel>Đoàn viên</InputLabel>
                                    <Select
                                        name='role'
                                        value={values.role || 'SINH_VIEN'}
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
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='chucVu'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Chức vụ"
                                    value={values.chucVu || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>

                            {/* THÔNG TIN LIÊN HỆ */}
                            <Grid item xs={12}>
                                <h3 className={styles.SectionTitle}>Thông tin liên hệ</h3>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='email'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Email"
                                    value={values.email || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ p: 2 }}>
                                <TextField 
                                    name='soDienThoai'
                                    className={styles.TextField}
                                    variant="filled"
                                    label="Số điện thoại"
                                    value={values.soDienThoai || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ p: 2 }}>
                                <TextField 
                                    name='diaChi'
                                    className={styles.TextField || ''}
                                    variant="filled"
                                    label="Địa chỉ"
                                    value={values.diaChi}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>

                            {/* ĐOÀN VIÊN */}
                            {
                                values.role === 'DOAN_VIEN' && (
                                    <>
                                        <Grid item xs={12}>
                                            <h3 className={styles.SectionTitle}>Đoàn viên</h3>
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <DatePicker
                                                name='thongTinDoanVien.ngayVaoDoan'
                                                views={['year', 'month', 'day']}
                                                inputFormat="DD/MM/yyyy"
                                                label="Ngày vào Đoàn"
                                                value={values.thongTinDoanVien?.ngayVaoDoan ? moment(values.thongTinDoanVien?.ngayVaoDoan).format('YYYY-MM-DD') : moment('1990-01-01').format('YYYY-MM-DD')}
                                                onChange={value => setFieldValue('thongTinDoanVien.ngayVaoDoan', value)}
                                                renderInput={(params) => 
                                                    <TextField 
                                                        {...params}
                                                        className='text-field' 
                                                        helperText={null} 
                                                        variant="filled"
                                                        type='date'
                                                    />
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <TextField 
                                                name='thongTinDoanVien.noiVaoDoan'
                                                className={styles.TextField}
                                                variant="filled"
                                                label="Nơi vào Đoàn"
                                                value={values.thongTinDoanVien?.noiVaoDoan || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <TextField 
                                                name='thongTinDoanVien.soTheDoan'
                                                className={styles.TextField}
                                                variant="filled"
                                                label="Số thẻ đoàn"
                                                value={values.thongTinDoanVien?.soTheDoan || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <FormControl fullWidth variant='filled' className='text-field' disabled>
                                                <InputLabel>Tình trạng sổ đoàn</InputLabel>
                                                <Select
                                                    name='thongTinDoanVien.soDoan.trangThaiSoDoan'
                                                    value={values.thongTinDoanVien?.soDoan?.trangThaiSoDoan || 'CHUA_NOP'}
                                                    label="Tình trạng sổ đoàn"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    {bookStatuses.map((status) => (
                                                        <MenuItem key={status.value} value={status.value}>{status.displayName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </>
                                )
                            }
                            <Grid item xs={12} sx={{ p: 2 }}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    className={styles.Button}
                                    disabled={isSubmitting}
                                >
                                    LƯU THAY ĐỔI
                                </Button>
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </form>
            )}
        </Formik>
    )
}

export default InfoForm;
