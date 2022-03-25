// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';

// Styles ================================================================== //
import styles from './index.module.css';

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

// ==============================|| BARCODE ||============================== //
const BarcodePage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [student, setStudent] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(async () => {
        try {
            const res = await getAllFaculties();

            if (res.data.status === 'success') {
                setFaculties(res.data.data.faculties);
            }
        } catch (err) {
            alert(err);
        }
    }, []);

    useEffect(async () => {
        try {
            const res = await getAllClasses();

            if (res.data.status === 'success') {
                setClasses(res.data.data.classes);
            }
        } catch (err) {
            alert(err);
        }
    }, []);

    const searchStudent = async () => {
        try {
            const res = await getOneStudentByStudentId(searchValue);

            if (res.data.status === 'success') {
                setStudent(res.data.data.student);
            }
        } catch (err) {
            alert(err);
        }
    }

    const updateStudent = async (student) => {
        try {
            const res = await updateOneStudent(student);

            if (res.data.status === 'success') {
                setStudent(res.data.data.student);
            }
        } catch (err) {
            alert(err)
        }
    }

    return (
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
                            <BillForm />
                        </Grid>
                    </Grid>
                    <div className={styles.Line} />
                </> : 
                <Grid item xs={12} className={styles.NoData}>Không có dữ liệu</Grid>
            }
        </Grid>
    );
};

export default BarcodePage;
