// Node Modules ============================================================ //
import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './index.module.scss';
// Context ================================================================= //
import AppContext from 'store/AppContext';
// Constants =============================================================== //
const DEFAULT_LIMIT = 10;
// APIs ==================================================================== //
import { getAllEvents, searchEvents } from 'apis/event';
// Material UI ============================================================= //
import { Box } from '@mui/material';
// My Components =========================================================== //
import SearchBar from '../search/SearchBar';
import Events from './components/Events';

const MyActivities = () => {
    const { state } = useContext(AppContext);
    
    const defaultSearchValues = {
        searchString: '',
        type: 'tat-ca',
        limit: DEFAULT_LIMIT,
    };

    const [mode, setMode] = useState('GET');
    const [events, setEvents] = useState([]);
    const [totalRecords, setTotalsRecords] = useState(0);
    const [searchValues, setSearchValues] = useState(defaultSearchValues);
    const [group, setGroup] = useState('DA_DANG_KY');
    const [fiteredEvents, setFilteredEvents] = useState([]);

    const getEvents = async (params) => {
        try {
          const res = await getAllEvents(params)
    
          if (res.data.status === 'success') {
            setEvents(res.data.data.events);
            setTotalsRecords(res.data.all);
            setMode('GET');
          }
        } catch (e) {
          console.log(e);
        }
    };

    const search = async (params) => {
        try {
          const res = await searchEvents(params);
    
          if (res.data.status === 'success') {
            setEvents(res.data.data.events);
            setTotalsRecords(res.data.all);
            setMode('SEARCH');
          }
        } catch (e) {
          console.log(e);
        }
    };

    useEffect(() => {
        if (state && state.user) {
            setSearchValues(prev => ({
                ...prev,
                sinhVien: {
                    maSoSV: state.user.maSoSV
                }
            }))
        }
    }, [state])
    
    useEffect(() => {
        if (!searchValues.sinhVien) {
            return;
        }
        
        if (mode === 'SEARCH') {
          search(searchValues);
        } else {
          getEvents(searchValues);
        }
    }, [searchValues.limit, searchValues.type, searchValues.sinhVien]);

    useEffect(() => {
        if (group === 'DA_DANG_KY') {

        } else if (group === 'DA_THAM_GIA') {

        } else if (group === 'TRE_HAN') {

        } else {
            setFilteredEvents([]);
        }
    }, [events, group])

    const handleChange = (field, value) => {
        setSearchValues(prev => ({
            ...prev,
            [field]: value
        }))
    };
  
    const handleSearch = () => {
      if(searchValues.searchString) {
        search(searchValues);
      } else {
        getEvents(searchValues);
      }
    };
  
    const handleLoadMore = () => {
      setSearchValues(prev => ({ ...prev, limit: prev.limit + DEFAULT_LIMIT }));
    };

    return (
        <div className={styles.MyActivities}>
            <div className={styles.SearchBarWrapper}>
                <SearchBar
                    className={styles.SearchBar}
                    searchValues={searchValues}
                    onChange={(field, value) => handleChange(field, value)}
                    onSearch={() => handleSearch()} 
                />
            </div>
            {/* <Box className={styles.ActivitiesSection}>
                <Box className={styles.GroupTitle}>
                    <div className={styles.Left}>
                        <h3 
                            className={clsx({
                                [styles.Title]: true,
                                [styles.ActivedTitle]: group === 'DA_DANG_KY'
                            })}
                            onClick={() => setGroup('DA_DANG_KY')}
                        >
                            Đã đăng ký
                        </h3>
                        <h3 
                            className={clsx({
                                [styles.Title]: true,
                                [styles.ActivedTitle]: group === 'DA_THAM_GIA'
                            })}
                            onClick={() => setGroup('DA_THAM_GIA')}
                        >
                            Đã tham gia
                        </h3>
                        <h3 
                            className={clsx({
                                [styles.Title]: true,
                                [styles.ActivedTitle]: group === 'TRE_HAN'
                            })}
                            onClick={() => setGroup('TRE_HAN')}
                        >
                            Trễ hạn
                        </h3>
                    </div>
                </Box>
            </Box> */}
            <Events 
                events={events} 
                onNext={handleLoadMore} 
                totalRecords={totalRecords} 
            />
        </div>
    )
}

export default MyActivities