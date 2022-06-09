// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// Constants =============================================================== //
import { DEFAULT_LIMIT } from 'helpers/constants/student';
// APIs ==================================================================== //
import { getAllFaculties } from 'apis/faculty';
import { getAllClasses } from 'apis/class';
import { getAllStudents } from 'apis/student';
import SearchBar from './components/SearchBar';
// Material UI ============================================================= //
import { Box, Button } from '@mui/material';
// Components ============================================================== //
import StudentsTable from './components/StudentsTable';

// ========================|| STUDENTS MANAGEMENT ||======================== //
const StudentsManagement = () => {
    const defaultSearchValues = {
        faculty: 'all',
        studentClass: 'all',
        studentId: '',
    }

    const [faculties, setFaculties] = useState([]);
    const [searchValues, setSearchValues] = useState(defaultSearchValues);
    const [allClasses, setAllClasses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

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
            const res = await getAllClasses({});

            if (res.data.status === 'success') {
                setClasses(res.data.data.classes);
                setAllClasses(res.data.data.classes);
            }
        } catch (err) {
            alert(err);
        }
    }, []);

    useEffect(() => {
        setClasses(allClasses.filter(i => i.donVi._id === searchValues.faculty));
        setSearchValues(prev => ({ ...prev, studentClass: 'all' }));
    }, [searchValues.faculty])

    const getStudents = async (args) => {
        setLoading(true);
        try {
            const res = await getAllStudents(args);

            if (res.data.status === 'success') {
                setStudents(res.data.data.students);
                setTotalRecords(res.data.all);
                setLoading(false);
            } else {
                // Show error message
            }
        } catch(err) {
            alert(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        getStudents({ ...defaultSearchValues, limit: DEFAULT_LIMIT });
    }, []);

    useEffect(() => {
        console.log("faculty: ", searchValues.faculty)
    }, [searchValues.faculty]);

    useEffect(() => {
        handleSearch();
    }, [searchValues.faculty, searchValues.studentClass]);

    const handleChange = (field, value) => {
        setSearchValues(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSearch = () => {
        getStudents({ ...searchValues, limit: DEFAULT_LIMIT });
    }

    return (
        <div className={styles.Students}>
            <div className={styles.SearchBarWrapper}>
                <SearchBar 
                    className={styles.SearchBar}
                    faculties={faculties}
                    classes={classes}
                    searchValues={searchValues}
                    onChange={(field, value) => handleChange(field, value)}
                    onSearch={() => handleSearch()}
                />
            </div>
            <Box className={styles.TableSection}>
                <Box className={styles.TableTitle}>
                    <div className={styles.Left}>
                        <h3 className={styles.Title}>Danh sách sinh viên</h3>
                        <p className={styles.TotalRecord}>Tổng số: { totalRecords }</p>
                    </div>
                    <div className={styles.ButtonWrapper}>
                        <Button 
                            className={styles.ExportButton}
                            variant='contained'
                            onClick={(args) => exportExcel({ ...searchValues, ...args})}                     
                        >
                            <img src={excelImage} />
                            Xuất dữ liệu
                        </Button>
                        <Button 
                            className='button'
                            variant='contained'
                            onClick={() => setShowCreateModal(true)}
                        >
                            Thêm mới
                        </Button>
                    </div>
                </Box>
                <StudentsTable 
                    data={students}
                    totalRecords={totalRecords}
                    loading={loading}
                    onRefetch={(args) => getStudents({ ...searchValues, ...args })} 
                />
            </Box>
        </div>
    )
}

export default StudentsManagement