// Node Modules ============================================================ //
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// Styles ================================================================== //
import styles from './EventsList.module.scss';
// Material UI ============================================================= //
import { Grid } from '@mui/material';
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
        <Grid container className={styles.Items}>
          {    
            events.map(event => (
              <Grid item lg={6} xs={12} className={styles.Item}>            
                <EventItem 
                  event={event} 
                  key={event._id}
                  onClick={() => {
                    
                  }}
                />
              </Grid>
            ))
          }
        </Grid>
      </InfiniteScroll>
  )
}

export default EventsList