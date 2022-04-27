// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import moment from 'moment';
// Styles ================================================================== //
import styles from './index.module.scss';
// APIs ==================================================================== //
import { getAllFaculties } from 'apis/faculty';
import { getAllBills, getBillStatistic } from 'apis/bill';
// Material UI ============================================================= //
import { Box, Button } from '@mui/material';
// Components ============================================================== //
import SearchBar from './components/SearchBar'
import StatisticalResults from './components/StatisticalResults';
import BillsTable from './components/BillsTable';

import excelImage from 'assets/images/icons/excel.png'

// =========================|| BARCODE STATISTIC ||========================= //
const BarcodeStatistic = () => {
  const defaultSearchValues = {
    faculty: 'all',
    status: 'true',
    studentId: '',
    date: [moment().startOf('month'), moment().endOf('month')]
  }

  const [faculties, setFaculties] = useState([]);
  const [searchValues, setSearchValues] = useState(defaultSearchValues);
  const [statisticalResults, setStatisticalResults] = useState([]);
  const [bills, setBills] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingBills, setLoadingBills] = useState(false);

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
    getBills({ ...defaultSearchValues, limit: 10 });
  }, []);

  const handleChange = (field, value) => {
    setSearchValues(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getBills = async (args) => {
    setLoadingBills(true);
    try {
      const res = await getAllBills(args);

      if (res.data.status === 'success') {
        setBills(res.data.data.bills);
        setTotalRecords(res.data.all);
        setLoadingBills(false);
      } else {
        // Show error message
      }
    } catch(err) {
      alert(err);
      setLoadingBills(false);
    }
  }

  const handleSearch = async (searchValues) => {
    setLoading(true);
    try {
      const res = await getBillStatistic(searchValues);
      
      if (res.data.status === 'success') {
        const results = res.data.data.kpiValues;
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
          onSearch={(values) => {
            handleSearch(values);
            getBills({ ...values, limit: 10 });
          }}
        />
        <StatisticalResults data={statisticalResults} loading={loading} />
        <Box className={styles.TableSection}>
          <Box className={styles.TableTitle}>
            <h3 className={styles.Title}>Danh sách hóa đơn</h3>
            <Button 
              className={styles.ExportButton}
              variant='contained'
              
            >
              <img src={excelImage} />
              Xuất dữ liệu
            </Button>
          </Box>
          <BillsTable 
            data={bills}
            totalRecords={totalRecords}
            loading={loadingBills}
            onRefetch={(args) => getBills({ ...searchValues, ...args})} 
          />
        </Box>
    </>
  )
}

export default BarcodeStatistic