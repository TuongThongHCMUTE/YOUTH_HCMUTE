// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
// Styles ================================================================== //
import styles from './EventDetailsModal.module.scss';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';
// Constants =============================================================== //
const dateFormat = 'DD/MM/YYYY';
const dateTimeFormat = 'HH:mm DD/MM/YYYY';
// APIs ==================================================================== //
import { getOneEventById } from 'apis/event';
// Material UI ============================================================= //
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Components ============================================================== //
import BaseModal from 'components/common/modal/base/BaseModal';
import CircularLoading from 'components/common/loading/CircularLoading';
import LinearProgressBarWithLabel from 'components/common/progress/LinearProgressBarWithLabel';
import Tag from 'components/common/tag';

// =============================|| EVENT LIST ||============================ //
const EventDetailsModal = (props) => {
    const { id, open, onClose } = props;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [src, setSrc] = useState(fallbackSrc);
    const [imgError, setImgError] = useState(false);

    const getEvent = async () => {
        try {
            setLoading(true);
            const res = await getOneEventById(id);
            if (res.data.status === 'success') {
                setEvent(res.data.data.event);
            }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại'
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (open) {
            getEvent();
        }
    }, [id, open]);

    useEffect(() => {
        if (event && event.anhBia && !imgError) {
            setSrc(event?.anhBia);
        }
    }, [event]);

    const onError = () => {
        if (!imgError) {
            setImgError(true);
            setSrc(fallbackSrc);
        }
    };

    return (
        <BaseModal
            visible={open}
            title="Chi tiết sự kiện"
            onClose={onClose}
        >
            { loading || !event ?
                <div className={styles.LoadingWrapper}>
                    <CircularLoading /> 
                </div> :
                <Box className={styles.Content}>
                    <Box className={styles.Header}>
                        <Box className={styles.ImageWrapper}>
                            <img
                                className={styles.Image}
                                src={src}
                                onError={onError}
                            />
                        </Box>
                        <Box className={styles.MainInfo}>
                            <Box className={styles.Title}>
                                <Typography variant='h3' component='h3'>{event?.tenHoatDong}</Typography>
                            </Box>
                            <Box className={styles.PlaceAndTime}>
                                <Box className={styles.Record}>
                                    <b>Đăng ký: </b> 
                                    {`${moment(event?.thoiGianDangKy?.thoiGianBatDau).format(dateFormat)}
                                    - 
                                    ${moment(event?.thoiGianDangKy?.thoiGianKetThuc).format(dateFormat)}`}
                                </Box>
                                <Box className={styles.Record}>
                                    <b>Diễn ra: </b>
                                    {`${moment(event?.thoiGianToChuc?.thoiGianBatDau).format(dateFormat)}
                                    - 
                                    ${moment(event?.thoiGianToChuc?.thoiGianKetThuc).format(dateFormat)}`}
                                </Box>
                                <Box className={styles.Record}>
                                    <div>
                                        <b>Địa điểm: </b>{event.diaDiem}
                                    </div>
                                </Box>
                            </Box>
                            <Box className={styles.SignUp}>
                                <LoadingButton 
                                    className={clsx('button', styles.SignUpBtn)}
                                >
                                    Đăng ký tham gia
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={styles.Body}>
                        <Box className={styles.Description}>
                            <Typography variant='h5' component='h5'>MÔ TẢ</Typography>
                            <Box className={styles.Record}>
                                {event.moTa}
                            </Box>
                        </Box>
                        <Box className={styles.Details}>
                            <Box className={styles.Record}>
                                <div>
                                    <b>Mở đăng ký: </b> 
                                    {`${moment(event.thoiGianDangKy.thoiGianBatDau).format(dateTimeFormat)}`}
                                </div>
                                <div>
                                    <b>Đóng đăng ký: </b>{}
                                    {`${moment(event.thoiGianDangKy.thoiGianKetThuc).format(dateTimeFormat)}`}
                                </div>
                            </Box>
                            <Box className={styles.Record}>
                                <div>
                                    <b>Thời gian bắt đầu: </b> 
                                    {`${moment(event.thoiGianToChuc.thoiGianBatDau).format(dateTimeFormat)}`}
                                </div>
                                <div>
                                    <b>Thời gian kết thúc: </b>{}
                                    {`${moment(event.thoiGianToChuc.thoiGianKetThuc).format(dateTimeFormat)}`}
                                </div>
                            </Box>
                            <Box className={styles.Record}>
                                <div>
                                    <b>Quyền lợi tham gia: </b>{" " + `${event.diemCong} ${event.quenLoiThamGia}`}
                                </div>
                            </Box>
                            <Box className={styles.Record}>
                                <div>
                                    <b>Quy mô tổ chức: </b>{event.quyMoToChuc}
                                </div>
                            </Box>
                            <Box className={styles.Record}>
                                <div>
                                    <b>Giới hạn số lượng: </b>{event.soLuongSinhVien}
                                </div>
                            </Box>
                        </Box>
                        <Box className={styles.Progress}>
                            <Typography variant='h5' component='h5'>SINH VIÊN ĐĂNG KÝ</Typography>
                            <Box sx={{ mt: 1 }}>
                                <LinearProgressBarWithLabel 
                                    value={event.soLuongSinhVienDangKy} 
                                    maxValue={event.soLuongSinhVien} 
                                />
                            </Box>
                        </Box>
                        <Box className={styles.Merits}>
                            <Typography variant='h5' component='h5'>TIÊU CHÍ SINH VIÊN 5 TỐT</Typography>
                            <Box className={styles.Tags}>
                                {event.tieuChi.length > 0 && event.tieuChi.map(i => (
                                    <Tag className={styles.Tag} tag={{ id: i.maTieuChi, description: i.tenTieuChi }} />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={styles.Comments}>
                        
                    </Box>
                    { alert && 
                        <SnackBar 
                            message={alert.message}
                            severity={alert.severity}
                            onClose={() => setAlert(null)}
                        />
                    }
                </Box>
            }
        </BaseModal>
    )
}

export default EventDetailsModal