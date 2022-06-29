// Node Modules ============================================================ //
import React, { useState, useEffect, useContext } from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// Context ================================================================= //
import AppContext from 'store/AppContext';
// APIs ==================================================================== //
import { getAllStudentBills, exportExcelStudentBills } from 'apis/studentBill';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// Material UI ============================================================= //
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Components ============================================================== //
import Filters from './components/Filters';
import BillsTable from './components/BillsTable';
import UploadModal from './components/UploadModal';

const FeeManagement = () => {
    const { state } = useContext(AppContext);

    const defaultSearchValues = {
        limit: 10,
        offset: 0,
        sortBy: 'maSoSV',
        isDescending: false,
        maSoSV: '',
        donVi: 'all',
        lopSV: 'all',
        doanPhi: 'all',
        soDoan: 'all',
    };

    const [searchValues, setSearchValues] = useState(defaultSearchValues);
    const [bills, setBills] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setTotalRecords(0);
            const res = await getAllStudentBills(searchValues);
            setBills(res.data.data.studentBills);
            setTotalRecords(res.data.all);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const exportExcel = async () => {
        try {
            setExporting(true);
            const res = await exportExcelStudentBills(searchValues);   
            const outputFilename = `Danh sách đóng đoàn phí và nộp sổ đoàn.xlsx`;
        
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

    useContext(() => {
        handleSearch();
    }, [])

    useEffect(() => {
        handleSearch();
    }, [
        searchValues.donVi, 
        searchValues.lopSV, 
        searchValues.doanPhi, 
        searchValues.soDoan, 
        searchValues.limit, 
        searchValues.offset, 
        searchValues.sortBy,
        searchValues.isDescending,
    ]);

    return (
        <div className={styles.FeeManagement}>
            <Filters
                faculties={state?.faculties}
                classes={state?.classes}
                searchValues={searchValues}
                setSearchValues={setSearchValues}
                onSearch={() => handleSearch()}
            />
            <Box className={styles.TableTitle}>
                <div className={styles.Left}>
                    <h3 className={styles.Title}>Danh sách sinh viên</h3>
                    <p className={styles.TotalRecord}>Tổng số: { totalRecords }</p>
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
                    <Button 
                        className='button'
                        variant='contained'
                        onClick={() => setShowModal(true)}
                    >
                        Tải file lên
                    </Button>
                </div>
            </Box>
            <BillsTable 
                data={bills}
                totalRecords={totalRecords}
                loading={loading}
                onRefetch={setSearchValues} 
            />
            <UploadModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onRefetch={() => handleSearch()}
            />
        </div>
    )
}

export default FeeManagement