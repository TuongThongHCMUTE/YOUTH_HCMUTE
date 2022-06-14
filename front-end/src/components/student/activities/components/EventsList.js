// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './EventsList.module.scss';
// Components ============================================================== //
import EventItem from './EventItem';

// =============================|| EVENT LIST ||============================ //
const EventsList = (props) => {
  const { events } = props;

  return (
    <div className={styles.List}>
      {    
        events.map(i => (<EventItem event={i} />))
      }
    </div>
  )
}

export default EventsList