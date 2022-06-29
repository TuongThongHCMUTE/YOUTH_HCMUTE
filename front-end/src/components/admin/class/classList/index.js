// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// APIs ==================================================================== //
import { getAllFaculties } from 'apis/faculty';
import { getAllClasses, exportExcelAllClasses } from 'apis/class';
// Constants =============================================================== //
import { DEFAULT_LIMIT } from 'helpers/constants/class';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// Material UI ============================================================= //
import { Box, Button } from '@mui/material';
// Components ============================================================== //
import SearchBar from './components/SearchBar';
import ClassesTable from './components/ClassesTable';
import CreateClassWizard from '../createClassWizard';

// ===========================|| CLASSES LIST ||============================ //
const ClassList = () => {
    const defaultSearchValues = {
        faculty: 'all',
        className: '',
    }

    const [faculties, setFaculties] = useState([]);
    const [searchValues, setSearchValues] = useState(defaultSearchValues);
    const [classes, setClasses] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

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
        getClasses({ ...defaultSearchValues, limit: DEFAULT_LIMIT });
    }, []);

    const handleChange = (field, value) => {
        setSearchValues(prev => ({
        ...prev,
        [field]: value
        }))
    }

    const getClasses = async (args) => {
        setLoading(true);
        try {
            const res = await getAllClasses(args);

            if (res.data.status === 'success') {
                setClasses(res.data.data.classes);
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

    const exportExcel = async (args) => {
        try {
          const res = await exportExcelAllClasses(args);
            
          const outputFilename = `Danh sách chi đoàn.xlsx`;
    
          // Download file automatically using link attribute.
          const url = URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', outputFilename);
          document.body.appendChild(link);
          link.click();
        } catch(err) {
          alert(err);
        }
      }

    return (
        <>
            <SearchBar 
                faculties={faculties} 
                searchValues={searchValues} 
                onChange={(field, value) => handleChange(field, value)}
                onSearch={(values) => {
                    getClasses({ ...values, limit: DEFAULT_LIMIT });
                }}
            />
            <Box className={styles.TableSection}>
                <Box className={styles.TableTitle}>
                    <div className={styles.Left}>
                        <h3 className={styles.Title}>Danh sách chi đoàn</h3>
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
                <ClassesTable 
                    data={classes}
                    totalRecords={totalRecords}
                    loading={loading}
                    onRefetch={(args) => getClasses({ ...searchValues, ...args })} 
                />
            </Box>
            <CreateClassWizard
                faculties={faculties}
                visible={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onRefetch={(args) => getClasses({ ...searchValues, ...args })} 
            />
        </>
    )
}

export default ClassList