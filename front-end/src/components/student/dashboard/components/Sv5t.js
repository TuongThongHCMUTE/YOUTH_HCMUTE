import React, { useState, useEffect } from 'react';
import styles from './Sv5t.module.scss';
import { getMissingEventsForSv5t } from 'apis/event';
import EventItem from './EventItem';
import CircularLoading from 'components/common/loading/CircularLoading';
import EventDetailsModal from 'components/student/activities/components/EventDetailsModal';

const Sv5t = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const getMissingEvents = async () => {
        try {
            setLoading(true);
            const res = await getMissingEventsForSv5t();
            setEvents(res.data.data.events);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMissingEvents();
    }, [])

    return (
        <div className={styles.Events}>
            { loading ? <CircularLoading /> :
                events.length > 0 ?
                    events.map(event => 
                    <EventItem 
                        event={event} 
                        onClick={() => {
                            setSelected(event._id)
                            setOpen(true);
                        }}
                    />
                    ) :
                    <p>Hiện tại không có hoạt động phù hợp để hiển thị</p>
            }
            <EventDetailsModal
                open={open}
                onClose={() => {
                setOpen(false);
                setSelected(null);
                }}
                id={selected}
            />
        </div>
    )
}

export default Sv5t