// Node Modules ============================================================ //
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// Styles ================================================================== //
import styles from './EventsList.module.scss';
// Components ============================================================== //
import EventItem from './EventItem';
import CircularLoading from 'components/common/loading/CircularLoading';

// =============================|| EVENT LIST ||============================ //
const EventsList = (props) => {
  const { events, onNext, totalRecords } = props;

  return (
    <InfiniteScroll className={styles.List}
      dataLength={events.length}
      next={onNext}
      hasMore={events.length < totalRecords}
      loader={<CircularLoading />}
    >
      {    
        events.map(i => (<EventItem event={i} key={i._id} />))
      }
    </InfiniteScroll>
  )
}

export default EventsList