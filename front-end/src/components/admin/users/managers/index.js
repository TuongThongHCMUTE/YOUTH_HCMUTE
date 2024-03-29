// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './index.module.scss';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// Constants =============================================================== //
import { DEFAULT_LIMIT } from 'helpers/constants/manager';
import { USER_ROLES } from 'helpers/constants/user';
// APIs ==================================================================== //
import { getAllFaculties } from 'apis/faculty';
import { getAllManagers, exportExcelAllManagers } from 'apis/manager';
// Material UI ============================================================= //
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Components ============================================================== //
import SearchBar from './components/SearchBar';
import ManagersTable from './components/ManagersTable';
import CreateManagerModal from './components/CreateManagerModal';

// ==========================|| USER MANAGEMENT ||========================== //
const ManagersManagement = () => {
    const defaultSearchValues = {
        faculty: 'all',
        email: '',
        status: 'all',
        role: USER_ROLES.DOAN_TRUONG,
    }

    const [faculties, setFaculties] = useState([]);
    const [searchValues, setSearchValues] = useState(defaultSearchValues);
    const [managers, setManagers] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const getManagers = async (args) => {
        setLoading(true);
        try {
            const res = await getAllManagers(args);

            if (res.data.status === 'success') {
                setManagers(res.data.data.managers);
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

    useEffect(() => {
        getManagers({ ...defaultSearchValues, limit: DEFAULT_LIMIT });
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchValues.faculty, searchValues.role, searchValues.status]);

    const handleChange = (field, value) => {
        setSearchValues(prev => ({
            ...prev,
            [field]: value
        }))
    };

    const handleSearch = () => {
        getManagers({ ...searchValues, limit: DEFAULT_LIMIT });
    };

    const exportExcel = async () => {
        try {
            setExporting(true);
            const res = await exportExcelAllManagers();   
            const outputFilename = `Danh sách sinh viên.xlsx`;
        
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
      <div className={styles.Managers}>
          <div className={styles.SearchBarWrapper}>
                <SearchBar 
                    className={styles.SearchBar}
                    faculties={faculties}
                    searchValues={searchValues}
                    onChange={(field, value) => handleChange(field, value)}
                    onSearch={() => handleSearch()}
                />
          </div>
          <Box className={styles.TableSection}>
                <Box className={styles.TableTitle}>
                    <div className={styles.Left}>
                        <h3 
                            className={clsx({
                                [styles.Title]: true,
                                [styles.ActivedTitle]: searchValues.role === USER_ROLES.DOAN_TRUONG
                            })}
                            onClick={() => setSearchValues(prev => ({...prev, role: USER_ROLES.DOAN_TRUONG}))}
                        >
                            Đoàn trường
                        </h3>
                        <h3 
                            className={clsx({
                                [styles.Title]: true,
                                [styles.ActivedTitle]: searchValues.role === USER_ROLES.DOAN_KHOA
                            })}
                            onClick={() => setSearchValues(prev => ({...prev, role: USER_ROLES.DOAN_KHOA}))}
                        >
                            Đoàn khoa
                        </h3>
                        <h3 
                            className={clsx({
                                [styles.Title]: true,
                                [styles.ActivedTitle]: searchValues.role === USER_ROLES.CONG_TAC_VIEN
                            })}
                            onClick={() => setSearchValues(prev => ({...prev, role: USER_ROLES.CONG_TAC_VIEN}))}
                        >
                            Cộng tác viên
                        </h3>
                        <p className={styles.TotalRecord}>Tổng số: { loading ? 0 : totalRecords }</p>
                    </div>
                    <div className={styles.ButtonWrapper}>
                        <LoadingButton 
                            className={styles.ExportButton}
                            variant='contained'
                            loading={exporting}
                            onClick={() => exportExcel()}                     
                        >
                            {!exporting && 
                                <>
                                    <img src={excelImage} />
                                    Xuất dữ liệu
                                </>
                            }
                        </LoadingButton>
                        <Button 
                            className='button'
                            variant='contained'
                            onClick={() => setOpenCreateModal(true)}
                        >
                            Thêm mới
                        </Button>
                    </div>
                </Box>
                <ManagersTable 
                    data={managers}
                    totalRecords={totalRecords}
                    loading={loading}
                    onRefetch={(args) => getManagers({ ...searchValues, ...args })} 
                />
            </Box>
            <CreateManagerModal
                open={openCreateModal}
                faculties={faculties}
                onClose={() => setOpenCreateModal(false)}
                onRefetch={(role) => {
                    if(role === searchValues.role) {
                        getManagers(searchValues)
                    }
                }}
            />
      </div>
    )
}

export default ManagersManagement