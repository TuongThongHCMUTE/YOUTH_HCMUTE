// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// APIs ==================================================================== //
import { getAttendanceForSV5T } from 'apis/event';
// Material UI ============================================================= //
import { Box } from '@mui/material';
// My Components =========================================================== //
import EventTable from './components/EventsTable';

const MyActivities = () => {
    const defaultParams = {
        limit: 10,
        offset: 0,
    };

    const [events, setEvents] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState(defaultParams);

    const getEvents = async (params) => {
        try {
            const res = await getAttendanceForSV5T(params);

            if (res.data.status === 'success') {
                setEvents(res.data.data.attendanceEvents);
                setTotalRecords(res.data.all);
            };
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getEvents(params);
    }, []);

    return (
        <div className={styles.MyActivities}>
            <EventTable 
                data={events}
                totalRecords={totalRecords}
                loading={loading}
                onRefetch={(args) => getEvents({ ...params, ...args })}
            />
        </div>
    )
}

export default MyActivities