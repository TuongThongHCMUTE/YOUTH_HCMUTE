// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// Styles ================================================================== //
import styles from './index.module.scss';
// Material UI ============================================================= //
import WestIcon from '@mui/icons-material/West';
// APIs ==================================================================== //
import { getListAttendances, checkIn, checkOut } from 'apis/attendance';
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
            <AttendancesTable data={attendances} />
          </div>
        </>
      }
    </div>
  )
}

export default CheckIn