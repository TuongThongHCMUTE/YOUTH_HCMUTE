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
    type: 'tat-ca',
    limit: DEFAULT_LIMIT,
  }

  const [mode, setMode] = useState('GET');
  const [events, setEvents] = useState([]);
  const [totalRecords, setTotalsRecords] = useState(0);
  const [searchValues, setSearchValues] = useState(defaultSearchValues);

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
    getEvents(searchValues);
  }, []);

  useEffect(() => {
    if (mode === 'SEARCH') {
      search(searchValues);
    } else {
      getEvents(searchValues);
    }
  }, [searchValues.limit, searchValues.type])
  
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
    setSearchValues(prev => ({ ...prev, limit: prev.limit + DEFAULT_LIMIT }))
  };

  return (
    <div className={styles.SearchActivities}>
      <div className={styles.SearchBarWrapper}>
        <SearchBar
          className={styles.SearchBar}
          faculties={[]}
          classes={[]}
          searchValues={searchValues}
          onChange={(field, value) => handleChange(field, value)}
          onSearch={() => handleSearch()} 
        />
      </div>
      <EventsList events={events} onNext={handleLoadMore} totalRecords={totalRecords} />
    </div>
  )
}

export default SearchActivities