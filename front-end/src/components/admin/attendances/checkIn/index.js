// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// Styles ================================================================== //
import styles from './index.module.scss';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// Material UI ============================================================= //
import { Box } from '@mui/material'; 
import WestIcon from '@mui/icons-material/West';
import { LoadingButton } from '@mui/lab';
// APIs ==================================================================== //
import { getListAttendances, checkIn, checkOut, exportExcelAttendances } from 'apis/attendance';
import { getOneEventById } from 'apis/event';
// My components =========================================================== //
import AttendancesTable from './components/AttendancesTable';
import CheckInField from './components/CheckInField';
import CheckInStatus from './components/CheckInStatus';
import CircularLoading from 'components/common/loading/CircularLoading';

// ============================|| CLASS DETAIL ||=========================== //
const CheckIn = () => {
  const { id } = useParams();
  const [isCheckIn, setCheckIn] = useState(true);
  const [status, setStatus] = useState('ready');
  const [error, setError] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [event, setEvent] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [exporting, setExporting] = useState(false);

  const getAttendances = async () => {
    try {
      setLoading(true);
      const res = await getListAttendances(id);
      if (res.data.status === 'success') {
        setAttendances(res.data.data.attendances);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttendances();
  }, []);

  useEffect(() => {
    if (attendances) {
      setTotal({
        'tong': attendances.length,
        'dangKyThamGia': attendances.filter(i => i.dangKyThamGia).length,
        'diemDanhVao': attendances.filter(i => i.diemDanhVao).length,
        'diemDanhRa': attendances.filter(i => i.diemDanhRa).length,
        'hoanThanhHoatDong': attendances.filter(i => i.hoanThanhHoatDong).length,
      });
    } else {
      setTotal({
        'tong': 0,
        'dangKyThamGia': 0,
        'diemDanhVao': 0,
        'diemDanhRa': 0,
        'hoanThanhHoatDong': 0,
      });
    }
  }, [attendances])

  const getEvent = async (id) => {
    try {
      const res = await getOneEventById(id);
      if (res.data.status === 'success') {
        setEvent(res.data.data.event);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
        getEvent(id);
    }
  }, [id]);

  const handleCheckIn = async (studentId) => {
    if (status === 'checking' || !studentId) {
      return;
    }

    try {
      setStatus('checking');
      setError('');
      
      const res = isCheckIn ? await checkIn(id, studentId) : await checkOut(id, studentId);
      if (res.data.status === 'success') {
        const newAttendance = res.data.data.attendance;
        const filteredAttendances = attendances.filter(i => i._id !== newAttendance._id);
        setAttendances([
          newAttendance,
          ...filteredAttendances,
        ]);

        setStatus('ready');
        setStudentId('');
      }
    } catch (e) {
      setStatus('error');
      setError(e.response?.data?.message || 'Đã xảy ra lỗi');
      console.error(e);
    }
  };

  const exportExcel = async () => {
      try {
          setExporting(true);
          const res = await exportExcelAttendances(id);   
          const outputFilename = `Danh sách điểm danh.xlsx`;
      
          // Download file automatically using link attribute.
          const url = URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', outputFilename);
          document.body.appendChild(link);
          link.click();
      } catch(err) {
          alert(err);
      } finally {
          setExporting(false);
      }
  };

  return (
    <div className={styles.CheckIn}>
      <div className={styles.Link}>
        <Link to={{
          pathname: '/diem-danh'
        }}>
          <WestIcon className={styles.BackIcon} />
          Trở về trang danh sách
        </Link>
      </div>
      <div className={styles.Type}>
        <h3 
            className={clsx({
              [styles.Title]: true,
              [styles.ActivedTitle]: isCheckIn
            })}
            onClick={() => setCheckIn(true)}
        >
            Điểm danh vào
        </h3>
        <h3 
            className={clsx({
              [styles.Title]: true,
              [styles.ActivedTitle]: !isCheckIn
            })}
            onClick={() => setCheckIn(false)}
        >
            Điểm danh ra
        </h3>
      </div>
      {
        loading || !event ?
        <CircularLoading /> : 
        <>
          <div className={styles.CheckInField}>
            <CheckInField
              event={event}
              isCheckIn={isCheckIn}
              studentId={studentId}
              error={error}
              setStudentId={setStudentId}
              setStatus={setStatus}
              setError={setError}
              onCheckIn={handleCheckIn}
            />
          </div>
          <div className={styles.Status}>
            <CheckInStatus status={status} error={error} />
          </div>
          <div className={styles.AttendancesTable}>
            <Box className={styles.TableTitle}>
                <div className={styles.Left}>
                    <h3 className={styles.Title}>Tổng cộng: {total?.tong} </h3>
                    <p className={styles.TotalRecord}>Đã đăng ký: { total?.dangKyThamGia }</p>
                    <p className={styles.TotalRecord}>Điểm danh vào: { total?.diemDanhVao }</p>
                    <p className={styles.TotalRecord}>Điểm danh ra: { total?.diemDanhRa }</p>
                    <p className={styles.TotalRecord}>Hoàn thành: { total?.hoanThanhHoatDong }</p>
                </div>
                <div className={styles.ButtonWrapper}>
                    <LoadingButton 
                        className={styles.ExportButton}
                        variant='contained'
                        onClick={() => exportExcel()}
                        loading={exporting}        
                    >
                        {!exporting && 
                            <>
                                <img src={excelImage} />
                                Xuất dữ liệu
                            </>
                        }
                    </LoadingButton>
                </div>
            </Box>
            <AttendancesTable data={attendances} />
          </div>
        </>
      }
    </div>
  )
}

export default CheckIn