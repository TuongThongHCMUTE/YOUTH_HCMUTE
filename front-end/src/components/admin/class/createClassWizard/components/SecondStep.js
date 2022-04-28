// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from '../index.module.scss';
// APIs ==================================================================== //
import { getListStudentsByStudentId } from 'apis/student';
// Material UI ============================================================= //
import { 
    Box, 
    Button,
    IconButton,
    Input,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EastIcon from '@mui/icons-material/East';
import SearchIcon from '@mui/icons-material/Search';

// ===========================|| SECOND STEP ||============================= //
const SecondStep = (props) => {
    const { studentClass, setStudentClass, setStep } = props;

    const [searchValue, setSearchValue] = useState('');
    const [students, setStudents] = useState([]);
    const [managers, setManagers] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        setManagers(studentClass.managers)
    }, []);

    const searchStudents = async () => {
        setSearching(true);
        
        try {
            const res = await getListStudentsByStudentId(searchValue);

            if (res.data.status === 'success') {
                setStudents(res.data.data.students);
                setSearching(false);
                setSearchValue('');
            } else {
                // Show error message
                setSearching(false);
            }
        } catch (err) {
            setSearching(false);
            alert(err);
        }
    }

    const addManager = (student, position) => {
        let newManagers = managers;
        const index = managers.findIndex(i => i.chucVu === position);

        if (index !== -1) {
            newManagers[index] = {
                chucVu: position,
                maSoSV: student.maSoSV,
                hoTen: student.ho + ' ' + student.ten,
                sinhVien: student
            }
        } else {
            newManagers = [
                ...newManagers,
                {
                    chucVu: position,
                    maSoSV: student.maSoSV,
                    hoTen: student.ho + ' ' + student.ten,
                    sinhVien: student
                }
            ]
        }

        setManagers([...newManagers]);
    };

    const handleBack = () => {
        setStudentClass(prev => ({
            ...prev,
            managers
        }));
        setStep(0);
    };

    const handleNext = () => {
        setStudentClass(prev => ({
            ...prev,
            managers
        }));
        setStep(2);
    }

    const searchedItem = (student) => {
        const fullName = student.ho + ' ' + student.ten;
    
        return (
            <div className={styles.Item}>
                <div className={styles.Content}>
                    <div className={styles.Info}>
                        <h5 className={styles.Name}>{fullName}</h5>
                        <h6 className={styles.StudentId}>{student.maSoSV}</h6>
                    </div>
                    <div className={styles.Positions}>
                        <div 
                            className={styles.Secretary}
                            onClick={() => addManager(student, 'BI_THU')}
                        >
                            Bí thư</div>
                        <div 
                            className={styles.DeputySecretary}
                            onClick={() => addManager(student, 'PHO_BI_THU')}
                        >
                            P. Bí thư
                        </div>
                    </div>
                </div>
                <div className={styles.Divider} />
            </div>
        )
    }

    const managerItem = (manager) => {
        return (
            <div className={styles.Card}>
                <div className={styles.Name}>
                    <div className={styles.StudentName}>
                        <h5>{manager.hoTen}</h5>
                        {manager.chucVu === 'BI_THU' ?
                            <div className={styles.Secretary}>Bí thư</div> :
                            <div className={styles.DeputySecretary}>P. Bí thư</div>
                        }
                    </div>
                    <h6 className={styles.StudentId}>21100000</h6>
                </div>
                <div className={styles.Contact}>
                    <div className={styles.Phone}>
                        <h5>Phone</h5>
                        <h6>0123456789</h6>
                    </div>
                    <div className={styles.Email}>
                        <h5>Email</h5>
                        <h6>2110000@student.hcmute.edu.vn</h6>
                    </div>
                </div>
                <IconButton className={styles.RemoveButton} color='error'><DeleteIcon /></IconButton>
            </div>
        )
    }

    return (
        <div className={styles.SecondStep}>
            <Box className={styles.Left}>
                <div className={styles.Info}>
                    <h3 className={styles.Step}>Bước 2: BCH Chi đoàn</h3>
                    {   managers.length ? 
                        managers.map(i => managerItem(i)) : 
                        <Typography variant='h3' component='div' className={styles.NoInfo}> 
                            Chưa có dữ liệu
                        </Typography> }
                </div>
                <div className={styles.Actions}>
                    <Button
                        type='submit'
                        variant='text'
                        className={styles.Button}
                        sx={{ mr: 2 }}
                        onClick={() => handleBack()}
                    >
                        Trở lại
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        className={clsx('button', styles.Button)}
                        endIcon={<EastIcon />}
                        onClick={() => handleNext()}
                    >
                        Tạo
                    </Button>
                </div>
            </Box>
            <Box className={styles.Right}>
                <div className={styles.Search}>
                    <Input 
                        className={styles.SearchTextField} 
                        placeholder='Nhập MSSV'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyPress={(e) => { 
                            if(e.key === "Enter") {
                                searchStudents();
                            }
                        }}
                    />
                    <Button 
                        variant="contained"
                        className={styles.SearchButton}
                        onClick={searchStudents}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <div className={styles.SearchResults}>
                    <div className={styles.ResultHeader}>
                        <div className={styles.TopBorder} />
                        <h4>Kết quả tìm kiếm</h4>
                        <div className={styles.Divider} />
                    </div>
                    <div className={styles.ResultBody}>
                        { students.map(i => searchedItem(i)) }
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default SecondStep