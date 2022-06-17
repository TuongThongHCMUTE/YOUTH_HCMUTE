// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// APIs ==================================================================== //
import { getAllEvents, searchEvents } from 'apis/event';
// Material UI ============================================================= //
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// My Components =========================================================== //
import SearchBar from 'components/student/activities/seach/SearchBar';
import EventsTable from './components/EventsTable';

// ==========================|| EVENTS MANAGEMENT||========================= //
const EventsManagement = () => {
    const defaultSearchValues = {
        searchString: '',
        type: 'tat-ca',
        limit: 10,
    };

    const [mode, setMode] = useState('GET');
    const [events, setEvents] = useState([]);
    const [totalRecords, setTotalsRecords] = useState(0);
    const [searchValues, setSearchValues] = useState(defaultSearchValues);
    const [exporting, setExporting] = useState(false);
    const [loading, setLoading] = useState(false);

    const getEvents = async (params) => {
        try {
            setLoading(true);
            const res = await getAllEvents(params)
        
            if (res.data.status === 'success') {
                setEvents(res.data.data.events);
                setTotalsRecords(res.data.all);
                setMode('GET');
            }
        } catch (e) {
          console.log(e);
        } finally {
            setLoading(false);
        }
    };
    
    const search = async (params) => {
        try {
            setLoading(true);
            const res = await searchEvents(params);

            if (res.data.status === 'success') {
                setEvents(res.data.data.events);
                setTotalsRecords(res.data.all);
                setMode('SEARCH');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getEvents(searchValues);
    }, []);
    
    useEffect(() => {
        if (mode === 'SEARCH') {
            search(searchValues);
        } else {
            getEvents(searchValues);
        }
    }, [searchValues.type])

    const handleChange = (field, value) => {
        setSearchValues(prev => ({
            ...prev,
            [field]: value
        }))
    };
  
    const handleSearch = (searchValues) => {
        if(searchValues.searchString) {
            search(searchValues);
        } else {
            getEvents(searchValues);
        }
    };
    
    return (
        <div className={styles.EventsManagement}>
            <SearchBar 
                searchValues={searchValues}
                onChange={(field, value) => handleChange(field, value)}
                onSearch={() => handleSearch(searchValues)} 
            />
            <Box className={styles.TableSection}>
                <Box className={styles.TableTitle}>
                    <div className={styles.Left}>
                        <h3 className={styles.Title}>Danh sách hoạt động</h3>
                        <p className={styles.TotalRecord}>Tổng số: { totalRecords }</p>
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
                <EventsTable 
                    data={events}
                    totalRecords={totalRecords}
                    loading={loading}
                    onRefetch={(args) => handleSearch({ ...searchValues, ...args })} 
                />
            </Box>
        </div>
    )
}

export default EventsManagement