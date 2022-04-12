// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import moment from 'moment';
// APIs ==================================================================== //
import { getAllFaculties } from 'apis/faculty';
import { getBillStatistic } from 'apis/bill';
// Components ============================================================== //
import SearchBar from './components/SearchBar'
import StatisticalResults from './components/StatisticalResults';

// =========================|| BARCODE STATISTIC ||========================= //
const BarcodeStatistic = () => {
  const defaultSearchValues = {
    faculty: 'all',
    date: [moment().startOf('month'), moment().endOf('month')]
  }

  const [faculties, setFaculties] = useState([]);
  const [searchValues, setSearchValues] = useState(defaultSearchValues);
  const [statisticalResults, setStatisticalResults] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
        const res = await getAllFaculties();

        if (res.data.status === 'success') {
            setFaculties(res.data.data.faculties);
        }
    } catch (err) {
        alert(err);
    }
  }, []);

  useEffect(() => {
    handleSearch(defaultSearchValues);
  }, []);

  const handleChange = (field, value) => {
    setSearchValues(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = async (searchValues) => {
    setLoading(true);
    try {
      const res = await getBillStatistic(searchValues);
      
      if (res.data.status === 'success') {
        const results = res.data.data.kpiValues;
        console.log("results: ", results);
        setStatisticalResults(results);
        setLoading(false)
      } else {
        // Show error message
      }

    } catch(err) {
      alert(err);
      setLoading(false)
    }
  }

  return (
    <>
        <SearchBar 
          faculties={faculties} 
          searchValues={searchValues} 
          onChange={(field, value) => handleChange(field, value)}
          onSearch={(values) => handleSearch(values)}
        />
        <StatisticalResults data={statisticalResults} loading={loading} />
    </>
  )
}

export default BarcodeStatistic