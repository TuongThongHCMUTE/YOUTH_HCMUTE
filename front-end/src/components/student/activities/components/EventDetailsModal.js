// Node Modules ============================================================ //
import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import moment from 'moment';
// Styles ================================================================== //
import styles from './EventDetailsModal.module.scss';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';
// Context ================================================================= //
import AppContext from 'store/AppContext';
// Constants =============================================================== //
const dateFormat = 'DD/MM/YYYY';
const dateTimeFormat = 'HH:mm DD/MM/YYYY';
// APIs ==================================================================== //
import { getOneEventById } from 'apis/event';
import { register, cancelRegister } from 'apis/attendance';
// Material UI ============================================================= //
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// Components ============================================================== //
import BaseModal from 'components/common/modal/base/BaseModal';
import CircularLoading from 'components/common/loading/CircularLoading';
import Comments from 'components/common/comments';
import LinearProgressBarWithLabel from 'components/common/progress/LinearProgressBarWithLabel';
import SnackBar from 'components/common/alert/Snackbar';
import Tag from 'components/common/tag';
import AddToCalendar from 'components/common/addToCalendar/AddToCalendar';

// =============================|| EVENT LIST ||============================ //
const EventDetailsModal = (props) => {
    const { id, open, onClose } = props;

    const { state } = useContext(AppContext);

    const [event, setEvent] = useState(null);
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [alert, setAlert] = useState(null);
    const [src, setSrc] = useState(fallbackSrc);
    const [imgError, setImgError] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const getEvent = async () => {
        try {
            setLoading(true);
            const res = await getOneEventById(id);
            if (res.data.status === 'success') {
                setEvent(res.data.data.event);
                setAttendance(res.data.data.attendance);
            }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại'
            })
        } finally {
            setLoading(false);
        }
    };
  
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

    const handleCloseModal = () => {
        setShowComments(false);
        onClose();
    };

    const handleRegister = async () => {
        try {
            setUpdating(true);
            const res = await register(event._id, state.user.maSoSV);
            if (res.data.status === 'success') {
                setAttendance(res.data.data.attendance);
                setAlert({
                    severity: 'success',
                    message: 'Đăng ký thành công'
                });
            }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.'
            });
        } finally {
            setUpdating(false);
        }
    };

    const handleCancelRegister = async () => {
        try {
            setUpdating(true);
            const res = await cancelRegister(event._id, state.user.maSoSV);
            if (res.data.status === 'success') {
                setAttendance(null);
                setAlert({
                    severity: 'success',
                    message: 'Đã hủy đăng ký'
                });
            }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.'
            });
        } finally {
            setUpdating(false);
        }
    };

    const calendarItems = [{ apple: 'Apple Calendar' }, { google: 'Google' }];

    const calendarEvent = {
        name: event?.tenHoatDong,
        details: event?.moTa,
        location: event?.diaDiem,
        startsAt: moment(event?.thoiGianToChuc?.thoiGianBatDau).format(),
        endsAt: moment(event?.thoiGianToChuc?.thoiGianKetThuc).format(),
    };

    return (
        <BaseModal
            visible={open}
            title="Chi tiết sự kiện"
            onClose={handleCloseModal}
        >
            { loading || !event ?
                <div className={styles.LoadingWrapper}>
                    <CircularLoading /> 
                </div> :
                <Box className={styles.Content} id="infinite-scroll-target">
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
                                {
                                    !attendance ?
                                        <LoadingButton 
                                            className={clsx('button', styles.SignUpBtn)}
                                            loading={updating}
                                            onClick={() => handleRegister()}
                                        >
                                            Đăng ký tham gia
                                        </LoadingButton> :
                                        <LoadingButton 
                                            className={clsx('button', styles.CancelBtn)}
                                            loading={updating}
                                            onClick={() => handleCancelRegister()}
                                        >
                                            Hủy đăng ký
                                        </LoadingButton>
                                }
                                <AddToCalendar
                                    className={styles.AddToCalendarBtn}
                                    event={calendarEvent}
                                    items={calendarItems}
                                    label="Thêm vào lịch"
                                    icon={{ 'calendar-o': 'left' }}
                                />
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
                                    {`${moment(event.thoiGianDangKy?.thoiGianBatDau).format(dateTimeFormat)}`}
                                </div>
                                <div>
                                    <b>Đóng đăng ký: </b>{}
                                    {`${moment(event.thoiGianDangKy?.thoiGianKetThuc).format(dateTimeFormat)}`}
                                </div>
                            </Box>
                            <Box className={styles.Record}>
                                <div>
                                    <b>Thời gian bắt đầu: </b> 
                                    {`${moment(event.thoiGianToChuc?.thoiGianBatDau).format(dateTimeFormat)}`}
                                </div>
                                <div>
                                    <b>Thời gian kết thúc: </b>{}
                                    {`${moment(event.thoiGianToChuc?.thoiGianKetThuc).format(dateTimeFormat)}`}
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
                                {event.tieuChi?.length > 0 && event.tieuChi.map(i => (
                                    <Tag 
                                        className={styles.Tag}
                                        key={i.maTieuChi} 
                                        tag={{ id: i.maTieuChi, description: i.tenTieuChi }} 
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={styles.Comments}>
                        <div className={styles.ShowComment}>
                            <div className={styles.Wrapper} onClick={() => setShowComments(!showComments)}>
                                {
                                    showComments ? (
                                        <>
                                            <KeyboardArrowUpIcon />
                                            <p>Ẩn bình luận</p>
                                        </>) : (
                                        <>
                                            <p>Xem bình luận</p>
                                            <KeyboardArrowDownIcon />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        { showComments && <Comments eventId={id} />}
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