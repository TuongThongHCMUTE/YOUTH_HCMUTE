// Node Modules ============================================================ //
import React, { useState, useEffect, useContext } from 'react';
// Styles ================================================================== //
import styles from './index.module.css';
// Context ================================================================== //
import AppContext from 'store/AppContext';
// APIs ==================================================================== //
import { getOneStudentByStudentId, updateOneStudent } from 'apis/student';
import { getAllFaculties } from 'apis/faculty';
import { getAllClasses } from 'apis/class';
// Material UI ============================================================= //
import { Button, Grid, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// Components ============================================================== //
import InfoForm from './components/InfoForm';
import BillForm from './components/BillForm';
import BarcodeSection from './components/BarcodeSection';
import ReceiptModal from './components/ReceiptModal';
import SnackBar from 'components/common/alert/Snackbar';

// ==============================|| BARCODE ||============================== //
const BarcodePage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [student, setStudent] = useState(null);
    const [bill, setBill] = useState(null);
    const [newBill, setNewBill] = useState(true);
    const [faculties, setFaculties] = useState([]);
    const [classes, setClasses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [alert, setAlert] = useState(null);

    const { state } = useContext(AppContext);
    const user = state ? state.user : null;
    const currentYear = state ? state.currentYear : null;

    useEffect(async () => {
        try {
            const res = await getAllFaculties({ hienThi: true });

            if (res.data.status === 'success') {
                setFaculties(res.data.data.faculties);
            }
        } catch (err) {
            alert(err);
        }
    }, []);

    useEffect(async () => {
        try {
            const res = await getAllClasses({});

            if (res.data.status === 'success') {
                setClasses(res.data.data.classes);
            }
        } catch (err) {
            alert(err);
        }
    }, []);

    const searchStudent = async () => {
        if (!searchValue) {
            return;
        }
        
        try {
            const res = await getOneStudentByStudentId(searchValue, currentYear.maNamHoc);

            if (res.data.status === 'success') {
                setStudent(res.data.data.student);
                setBill(res.data.data.bill);
                setNewBill(res.data.data.hoaDonMoi)
                setSearchValue('');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const updateStudent = async (student) => {
        try {
            const res = await updateOneStudent(student);

            if (res.data.status === 'success') {
                setStudent(res.data.data.student);
                setAlert({
                    severity: 'success',
                    message: 'Cập nhật thông tin thành công'
                });
            }
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.'
            });
        }
    }

    const handleCheckOut = (bill) => {
        setBill(bill);
        setNewBill(false);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <>
        <Grid container className={styles.BarcodePage}>
            <Grid 
                xs={12} 
                item
                className={styles.TopSection}
            >
                <div><h1 className={styles.Title}>Tra cứu thông tin</h1></div>
                <div className={styles.Search}>
                    <Input 
                        className={styles.SearchTextField} 
                        placeholder='Nhập mã số sinh viên'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyPress={(e) => { 
                            if(e.key === "Enter") {
                                searchStudent();
                            }
                        }}
                    />
                    <Button 
                        variant="contained"
                        className={styles.SearchButton}
                        onClick={searchStudent}
                    >
                        <SearchIcon />
                    </Button>
                </div>
            </Grid>
            { student ? 
                <>
                    <Grid 
                        xs={12} 
                        item
                        className={styles.BarcodeSection}
                    >
                        <BarcodeSection data={student} />
                    </Grid>
                    <div className={styles.Line} />
                    <Grid 
                        xs={12} 
                        item
                        className={styles.FormSection}
                    >
                        <Grid
                            xs={6}
                            className={styles.InfoForm}
                        >
                            <InfoForm
                                student={student} 
                                faculties={faculties}
                                classes={classes} 
                                onSubmit={(student) => updateStudent(student)}
                            />
                        </Grid>
                        <Grid
                            xs={5}
                            className={styles.BillForm}
                        >
                            {   
                                bill 
                                ?   <BillForm 
                                        user={user} 
                                        newBill={newBill} 
                                        bill={bill} 
                                        onCheckOut={bill => handleCheckOut(bill)}
                                    /> 
                                : <p>Không có dữ liệu hóa đơn</p> 
                            }
                        </Grid>
                    </Grid>
                    <div className={styles.Line} />
                </> : 
                <Grid item xs={12} className={styles.NoData}>Không có dữ liệu</Grid>
            }
            <ReceiptModal 
                openModal={openModal}
                onClose={handleCloseModal} 
                onCheckOut={(bill, student) => {
                    handleCheckOut(bill)
                    updateStudent(student);
                }}
                student={student}
                bill={bill}
            />
        </Grid>
        {alert && 
            <SnackBar 
                message={alert.message}
                severity={alert.severity}
                onClose={() => setAlert(null)}
            />
        }
        </>
    );
};

export default BarcodePage;
