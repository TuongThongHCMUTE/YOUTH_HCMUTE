// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// Styles ================================================================== //
import styles from './StudentDetail.module.scss';
// APIs ==================================================================== //
import { getOneStudentById, updateOneStudent } from 'apis/student';
import { getAllFaculties } from 'apis/faculty';
import { getAllClasses } from 'apis/class';
// Material UI ============================================================= //
import { 
    Grid,
} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
// My components =========================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';
import BorderTopCard from 'ui-component/cards/BorderTopCard';
import SnackBar from 'components/common/alert/Snackbar';
import InfoForm from 'components/admin/barcodeSearch/components/InfoForm';

// ===========================|| STUDENT DETAIL||=========================== //
const StudentDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [faculties, setFaculties] = useState([]);
    const [classes, setClasses] = useState([]);
    const [alert, setAlert] = useState(null);

    const getManagerData = async () => {
        try {
          setLoading(true);
          const res = await getOneStudentById(id);
    
          if (res.data.status === 'success') {
            setData(res.data.data.student);
          } else {
            // log error message
          }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response.data.message
            });
        } finally {
          setLoading(false);
        }
    };

    const getFaculties = async () => {
        try {
            const res = await getAllFaculties({ hienThi: true });
    
            if (res.data.status === 'success') {
                setFaculties(res.data.data.faculties);
            }
        } catch (err) {
            setAlert({
                severity: 'error',
                message: e.response.data.message
            });
        }
    };

    useEffect(async () => {
        try {
            const res = await getAllClasses({});

            if (res.data.status === 'success') {
                setClasses(res.data.data.classes);
            }
        } catch (err) {
            setAlert({
                severity: 'error',
                message: e.response.data.message
            });
        }
    }, []);

    useEffect(() => {
        getManagerData();
        getFaculties();
    }, []);

    const handleUpdateStudent = async (student) => {
        try {
            const res = await updateOneStudent(student);

            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: 'Cập nhật thông tin sinh viên thành công!'
                });
            }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại!'
            });
        }
    };

    return (
        <div className={styles.DetailPage}>
            <Grid container className={styles.Header}>
                <Grid item xs={4}><h1 className={styles.Title}>THÔNG TIN QUẢN TRỊ VIÊN</h1></Grid>
            </Grid>
            <div className={styles.Link}>
                <Link to={{
                    pathname: '/users/sinh-vien'
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
                        { !loading && faculties && classes ?
                            <div className={styles.InfoForm}>
                                <InfoForm 
                                    student={data} 
                                    faculties={faculties}
                                    classes={classes}
                                    onSubmit={(student) => handleUpdateStudent(student)}
                                />
                            </div>: 
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
    )
}

export default StudentDetail