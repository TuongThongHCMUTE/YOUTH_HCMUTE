// Node Modules ============================================================ //
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
// Styles ================================================================== //
import styles from './CreateEventModal.module.scss';
import './CreateEventModal.css';
// Assets ================================================================== //
import uploadImg from 'assets/images/cloud-upload-regular-240.png';
// APIs ==================================================================== //
import { createOneEvent, updateOneEvent, getOneEventById } from 'apis/event';
import { uploadFile } from 'apis/file';
// Constants =============================================================== //
import merits from 'helpers/constants/merits';
import { url } from 'store/constant';
const initialValues = {
    tenHoatDong: '',
    moTa: '',
    ghiChu: '',
    quyMoToChuc: '',
    soLuongSinhVien: 0,
    linkTruyenThong: '',
    thoiGianDangKy: { 
        thoiGianBatDau: moment(),
        thoiGianKetThuc: moment(),
    },
    thoiGianToChuc: { 
        thoiGianBatDau: moment(),
        thoiGianKetThuc: moment(),
    },
    diaDiem: '',
    anhBia: '',
    quyenLoiThamGia: '',
    diemCong: 0,
    tieuChi: []
};
// Material UI ============================================================= //
import { 
  Grid,
  TextField, 
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LoadingButton, LocalizationProvider, DateTimePicker } from '@mui/lab';
// My components =========================================================== //
import BaseModal from 'components/common/modal/base/BaseModal';
import SnackBar from 'components/common/alert/Snackbar';
import CircularLoading from 'components/common/loading/CircularLoading';
import Tag from 'components/common/tag';

// =======================|| CREATE STUDENT MODAL ||======================== //
const CreateEventModal = (props) => {
    const { open, type, event, onClose, onRefetch } = props;
    const [creating, setCreating] = useState(false);
    const [alert, setAlert] = useState(null);
    const [errors, setErrors] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [src, setSrc] = useState(values.anhBia);
    const [imgError, setImgError] = useState(false);
    const [loading, setLoading] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(async () => {
        if (type === 'update') {
            if (open && event) {
                try {
                    setLoading(true);
                    const res = await getOneEventById(event);
                    if (res.data.status === 'success') {
                        setValues(res.data.data.event);
                    }
                } catch (e) {
                    setValues(initialValues)
                } finally {
                    setLoading(false);
                }
            } else {
                setValues(initialValues);
            }
        }
    }, [open])

    const validateData = (values) => {
        const errors = {};

        if (!values.tenHoatDong) {
          errors.ho = 'Tên hoạt động không được để trống.'
        }

        return errors;
    };

    const handleCreateAccount = async (values) => {
        try {
            setCreating(true);
          
            const res = type === 'create' ? await createOneEvent(values) : await updateOneEvent(values);
            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: type === 'create' ? 'Thêm hoạt động thành công!' : 'Chỉnh sửa hoạt động thành công!'
                });
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
    };

    const handleChange = (field, value) => {
        if ([
            'BAT_DAU_DANG_KY', 
            'KET_THUC_DANG_KY', 
            'BAT_DAU_TO_CHUC', 
            'KET_THUC_TO_CHUC'
            ].findIndex(i => i === field) !== -1
        ) {
            let thoiGianDangKy = values.thoiGianDangKy;
            let thoiGianToChuc = values.thoiGianToChuc;

            switch(field) {
                case 'BAT_DAU_DANG_KY':
                    thoiGianDangKy.thoiGianBatDau = value;
                    break;
                case 'KET_THUC_DANG_KY':
                    thoiGianDangKy.thoiGianKetThuc = value;
                    break;
                case 'BAT_DAU_TO_CHUC':
                    thoiGianToChuc.thoiGianBatDau = value;
                    break;
                case 'KET_THUC_TO_CHUC':
                    thoiGianToChuc.thoiGianKetThuc = value;
                    break;
                default: 
                    break;
            };

            setValues(prev => ({
                ...prev,
                thoiGianDangKy,
                thoiGianToChuc
            }));
        }

        setValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleMeritClick = (merit) => {
        let merits = values.tieuChi;
        const index = merits.findIndex(i => i.maTieuChi.toLowerCase() === merit.id.toLowerCase());
        
        if (index === -1) {
            merits.push({
                maTieuChi: merit.id.toLowerCase(),
                tenTieuChi: merit.content
            })
        } else {
            merits = merits.filter(i => i.maTieuChi.toLowerCase() !== merit.id.toLowerCase());
        }

        setValues(prev => ({
            ...prev,
            tieuChi: merits
        }))
    };

    useEffect(() => {
        setImgError(false);
        setSrc(values.anhBia);
    }, [values.anhBia])
  
    const onError = () => {
        if (!imgError) {
            setImgError(true);
            setSrc(null);
        }
    };

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = async (e) => {
        const newFile = e.target.files[0];

        try {
            setUploading(true);
            const res = await uploadFile(newFile, 'events');

            if (res.data.status === 'success') {
                setValues(prev => ({
                    ...prev,
                    anhBia: url + "/files?key=" + res.data.data.imageKey
                }))
            }

        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi'
            })
        } finally {
            setUploading(false);
        }

    };

    return (
        <BaseModal
            visible={open}
            title={type === 'create' ? "Thêm hoạt động" : "Chỉnh sửa hoạt động"}
            onClose={() => {
                setValues(initialValues);
                setErrors(null);
                onClose();
            }}
        >
            <Grid container className={styles.ContentWrapper}>
                {   loading ?
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularLoading />
                    </Grid> :
                    <>
                        <Grid item xs={7} className={styles.Left}>
                            <Grid container sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {
                                    uploading ? (
                                        <div className="drop-file-input">
                                            <CircularLoading />
                                        </div> ) : (
                                            <div
                                                ref={wrapperRef}
                                                className="drop-file-input"
                                                onDragEnter={onDragEnter}
                                                onDragLeave={onDragLeave}
                                                onDrop={onDrop}
                                            >
                                                {
                                                    src ? (
                                                        <img 
                                                            className={styles.Cover}
                                                            src={src}
                                                            onError={onError}
                                                        />
                                                    ) : (
                                                        <div className="drop-file-input__label">
                                                            <img src={uploadImg} alt="" />
                                                            <p>
                                                                Kéo thả file vào đây, hoặc click để chọn file
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                                <input 
                                                    type="file" 
                                                    value="" 
                                                    onChange={onFileDrop}
                                                />
                                            </div>

                                        )
                                    }
                            </Grid>
                            <form className={styles.Form}>
                                <LocalizationProvider locale='vi' dateAdapter={DateAdapter}>
                                    <Grid
                                        container
                                        sx={{ display: 'flex', flexWrap: 'wrap', padding: '16px' }}
                                    >
                                        {/* THÔNG TIN CHUNG */}
                                        <Grid item xs={12}>
                                            <h3 className={styles.SectionTitle}>Thông tin chung</h3>
                                        </Grid>
                                        <Grid item xs={12} sx={{ p: 2 }}>
                                            <TextField 
                                                name='tenHoatDong'
                                                className={styles.TextField}
                                                variant="filled"
                                                label="Tên hoạt động"
                                                required
                                                onChange={e => handleChange('tenHoatDong', e.target.value)}
                                                value={values?.tenHoatDong || ''}
                                                error={errors?.tenHoatDong}
                                                helperText={errors?.tenHoatDong}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ p: 2 }}>
                                            <TextField 
                                                name='moTa'
                                                className={styles.TextField}
                                                variant="filled"
                                                multiline
                                                rows={5}
                                                label="Mô tả"
                                                onChange={e => handleChange('moTa', e.target.value)}
                                                value={values?.moTa || ''}
                                                error={errors?.moTa}
                                                helperText={errors?.moTa}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ p: 2 }}>
                                            <TextField 
                                                name='ghiChu'
                                                className={styles.TextField}
                                                variant="filled"
                                                label="Ghi chú"
                                                onChange={e => handleChange('ghiChu', e.target.value)}
                                                value={values?.ghiChu || ''}
                                                error={errors?.ghiChu}
                                                helperText={errors?.ghiChu}
                                            />
                                        </Grid>
                                        <Grid item xs={8} sx={{ p: 2 }}>
                                            <TextField 
                                                name='quyMoToChuc'
                                                className={styles.TextField}
                                                variant="filled"
                                                label="Quy mô tổ chức"
                                                onChange={e => handleChange('quyMoToChuc', e.target.value)}
                                                value={values?.quyMoToChuc || ''}
                                                error={errors?.quyMoToChuc}
                                                helperText={errors?.quyMoToChuc}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={{ p: 2 }}>
                                            <TextField 
                                                name='soLuongSinhVien'
                                                className={styles.TextField}
                                                variant="filled"
                                                type='number'
                                                InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
                                                label="Số lượng sinh viên"
                                                onChange={e => handleChange('soLuongSinhVien', e.target.value)}
                                                value={values?.soLuongSinhVien}
                                                error={errors?.soLuongSinhVien}
                                                helperText={errors?.soLuongSinhVien}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ p: 2 }}>
                                            <TextField 
                                                name='linkTruyenThong'
                                                className={styles.TextField}
                                                variant="filled"
                                                label="Link truyền thông"
                                                onChange={e => handleChange('linkTruyenThong', e.target.value)}
                                                value={values?.linkTruyenThong || ''}
                                                error={errors?.linkTruyenThong}
                                                helperText={errors?.linkTruyenThong}
                                            />
                                        </Grid>
                                        {/* THỜI GIAN & ĐỊA ĐIỂM */}
                                        <Grid item xs={12} mt={2}>
                                            <h3 className={styles.SectionTitle}>Thời gian & địa điểm</h3>
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <DateTimePicker
                                                name='thoiGianDangKy.thoiGianBatDau'
                                                label="Bắt đầu đăng ký"
                                                onChange={(value) => handleChange('BAT_DAU_DANG_KY', value)}
                                                value={values?.thoiGianDangKy?.thoiGianBatDau || moment()}
                                                renderInput={(props) => <TextField {...props} className={styles.TextField} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <DateTimePicker
                                                name='thoiGianDangKy.thoiGianKetThuc'
                                                label="Kết thúc đăng ký"
                                                onChange={(value) => handleChange('KET_THUC_DANG_KY', value)}
                                                value={values?.thoiGianDangKy?.thoiGianKetThuc || moment()}
                                                renderInput={(props) => <TextField {...props} className={styles.TextField} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <DateTimePicker
                                                name='thoiGianToChuc.thoiGianBatDau'
                                                label="Bắt đầu tổ chức"
                                                onChange={(value) => handleChange('BAT_DAU_TO_CHUC', value)}
                                                value={values?.thoiGianToChuc?.thoiGianBatDau || moment()}
                                                renderInput={(props) => <TextField {...props} className={styles.TextField} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <DateTimePicker
                                                name='thoiGianToChuc.thoiGianKetThuc'
                                                label="Kết thúc tổ chức"
                                                onChange={(value) => handleChange('KET_THUC_TO_CHUC', value)}
                                                value={values?.thoiGianToChuc?.thoiGianKetThuc || moment()}
                                                renderInput={(props) => <TextField {...props} className={styles.TextField} />}
                                            />
                                        </Grid>
                                    </Grid>
                                </LocalizationProvider>                 
                                {alert && 
                                    <SnackBar 
                                        message={alert.message}
                                        severity={alert.severity}
                                        duration={3000}
                                        onClose={() => setAlert(null)}
                                    />
                                }
                            </form>
                        </Grid>
                        <Grid item xs={5} className={styles.Right}>
                            <h3 className={styles.SectionTitle}>Quyền lợi</h3>
                            <Grid
                                container
                                sx={{ display: 'flex', flexWrap: 'wrap' }}
                            >
                                <Grid item xs={7} sx={{ p: 2 }}>
                                    <TextField 
                                        name='quenLoiThamGia'
                                        className={styles.TextField}
                                        variant="outlined"
                                        label="Quyền lợi tham gia"
                                        onChange={e => handleChange('quenLoiThamGia', e.target.value)}
                                        value={values?.quenLoiThamGia || ''}
                                        error={errors?.quenLoiThamGia}
                                        helperText={errors?.quenLoiThamGia}
                                    />
                                </Grid>
                                <Grid item xs={5} sx={{ p: 2 }}>
                                    <TextField 
                                        name='diemCong'
                                        className={styles.TextField}
                                        variant="outlined"
                                        type='number'
                                        InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
                                        label="Điểm cộng"
                                        onChange={e => handleChange('diemCong', e.target.value)}
                                        value={values?.diemCong}
                                        error={errors?.diemCong}
                                        helperText={errors?.diemCong}
                                    />
                                </Grid>
                            </Grid>
                            <div className={styles.Divider} />
                            <h3 className={styles.SectionTitle}>Tiêu chí sinh viên 5 tốt</h3>
                            <div className={styles.Merits}>                    
                                {merits.map(merit => (
                                    <div className={styles.Merit} key={merit.id}>
                                        <h5 className={styles.MeritName}>{merit.display}</h5>
                                        {merit.categories.map(category => (
                                            <div className={styles.Category} key={category.id}>
                                                {
                                                    category.items.map(item => (
                                                        <div 
                                                            className={styles.Tag} 
                                                            key={item.id}
                                                            onClick={() => handleMeritClick(item)}
                                                        >
                                                            <Tag 
                                                                actived={values.tieuChi.findIndex(i => i.maTieuChi === item.id) !== -1}
                                                                tag={{ id: item.id, description: item.content }} 
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        <Grid 
                            item 
                            xs={12} 
                            className={styles.Footer}
                        >
                            <div className={styles.Divider} />
                            <LoadingButton
                                variant='contained'
                                className={clsx('button', styles.Button)}
                                loading={creating}
                                onClick={() => handleCreateAccount(values)}
                            >
                                { type === 'create' ? 'Tạo hoạt động' : 'Cập nhật' }
                            </LoadingButton>
                        </Grid>
                    </>
                }
            </Grid>
        </BaseModal>
    )
}

export default CreateEventModal