// Node Modules ============================================================ //
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// Styles ================================================================== //
import styles from './Events.module.scss';
// Components ============================================================== //
import EventItem from '../../components/EventItem';
import CircularLoading from 'components/common/loading/CircularLoading';
import EventDetailsModal from '../../components/EventDetailsModal';

// =============================|| EVENT LIST ||============================ //
const Events = (props) => {
  const { events, onNext, totalRecords } = props;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <InfiniteScroll className={styles.List}
        dataLength={events.length}
        next={onNext}
        hasMore={events.length < totalRecords}
        loader={<CircularLoading />}
      >
        {    
          events.map(event => (
            <EventItem 
              event={event} 
              key={event._id}
              onClick={() => {
                setOpen(true);
                setSelected(event._id);
              }}
            />
          ))
        }
      </InfiniteScroll>
      <EventDetailsModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        id={selected}
      />
    </>
  )
}

export default Events