// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// Constants =============================================================== //
import { DEFAULT_LIMIT } from 'helpers/constants/event';
// APIs ==================================================================== //
import { getAllEvents, searchEvents } from 'apis/event';
// My Components =========================================================== //
import SearchBar from './SearchBar';
import EventsList from '../components/EventsList';

// ==========================|| SEARCH ACTIVITIES||========================= //
const SearchActivities = () => {
  const defaultSearchValues = {
    searchString: '',
    limit: DEFAULT_LIMIT,
    offset: 0
  }

  const [events, setEvents] = useState([]);
  const [searchValues, setSearchValues] = useState(defaultSearchValues);

  const getEvents = async (params) => {
    try {
      const res = await getAllEvents(params)

      if (res.data.status === 'success') {
        setEvents(res.data.data.events);
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEvents(searchValues);
  }, []);
  
  const handleChange = (field, value) => {
      setSearchValues(prev => ({
          ...prev,
          [field]: value
      }))
  };

  const handleSearch = () => {
      search({ ...searchValues, limit: DEFAULT_LIMIT });
  };

  return (
    <div className={styles.SearchActivities}>
      <div className={styles.SearchBarWrapper}>
        <SearchBar
          className={styles.SearchBar}
          faculties={[]}
          classes={[]}
          searchValues={null}
          onChange={(field, value) => handleChange(field, value)}
          onSearch={() => handleSearch()} 
        />
      </div>
      <EventsList events={events} />
    </div>
  )
}

export default SearchActivities