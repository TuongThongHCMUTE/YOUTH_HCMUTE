// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './ManagersInformation.module.scss';
// APIs ==================================================================== //
import { getListStudentsByStudentId } from 'apis/student';
import { updateClass } from 'apis/class';
// Helpers ================================================================= //
import { addManager, removeManager } from 'helpers/class';
// Material UI ============================================================= //
import { 
    Box, 
    Button,
    Grid,
    IconButton,
    Input,
    LinearProgress,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
// My Components =========================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';
import SnackBar from 'components/common/alert/Snackbar';

const ManagersInfomation = (props) => {
    const { data } = props;

    const [searchValue, setSearchValue] = useState('');
    const [students, setStudents] = useState([]);
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(async() => {
        setManagers(data?.quanLy);
    }, [data]);

    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);

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

    const handleSubmit = async () => {
        setUpdating(true);

        try {
            const res = await updateClass({ _id: data?._id, quanLy: managers });

            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: 'Cập nhật thông tin thành công!'
                });
            }
        } catch (error) {
            console.error("error: ", error.response.data.message);
            setAlert({
                severity: 'error',
                message: error.response.data.message
            });
        } finally {
            setUpdating(false);
        }
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
                    <h6 className={styles.StudentId}>{manager.maSoSV}</h6>
                </div>
                <div className={styles.Contact}>
                    <div className={styles.Phone}>
                        <h5>Phone</h5>
                        <h6>{manager.sinhVien.soDienThoai}</h6>
                    </div>
                    <div className={styles.Email}>
                        <h5>Email</h5>
                        <h6>{manager.sinhVien.email}</h6>
                    </div>
                </div>
                <IconButton 
                    className={styles.RemoveButton} 
                    color='error'
                    onClick={() => setManagers(prev => removeManager(prev, manager.maSoSV))}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    };

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
                            onClick={() => setManagers(prev => addManager(prev, student, 'BI_THU'))}
                        >
                            Bí thư</div>
                        <div 
                            className={styles.DeputySecretary}
                            onClick={() => setManagers(prev => addManager(prev, student, 'PHO_BI_THU'))}
                        >
                            P. Bí thư
                        </div>
                    </div>
                </div>
                <div className={styles.Divider} />
            </div>
        )
    }

    return (
        <>
            <Grid container>
                <Grid item xs={5.5} className={styles.Left}>
                {   loading ?
                    <CircularLoading /> : 
                    <>
                        <div className={styles.Info}>
                            {   managers?.length ? 
                                managers.map(i => managerItem(i)) : 
                                <Typography variant='h3' component='div' className={styles.NoInfo}> 
                                    Chưa có dữ liệu
                                </Typography> }
                        </div>
                        <div className={styles.Actions}>
                            <LoadingButton
                                type='submit'
                                variant='contained'
                                className={clsx('button', styles.Button)}
                                loading={updating}
                                onClick={() => handleSubmit()}
                            >
                                Lưu lại
                            </LoadingButton>
                        </div>
                    </>
                }
                </Grid>
                <Grid item xs={6.5} className={styles.Right}>
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
                        {searching && <Box sx={{ width: '100%' }}>
                            <LinearProgress color='success' />
                        </Box>}
                        <div className={styles.ResultBody}>
                            {   
                                students && students.length > 0
                                ? students.map(i => searchedItem(i)) 
                                : <h3 className={styles.NoResults}>Không có kết quả để hiển thị</h3>
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
            {alert && 
                <SnackBar 
                    message={alert.message}
                    severity={alert.severity}
                    onClose={() => setAlert(null)}
                />
            }
        </>
    )
}

export default ManagersInfomation