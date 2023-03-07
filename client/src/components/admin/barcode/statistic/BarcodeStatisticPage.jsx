// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// Styles ================================================================== //
import styles from './BarcodeStatisticPage.module.scss';
// Redux Store ============================================================= //
import { activeFacultiesSelector } from 'redux/selectors/faculty-selectors';
// APIs ==================================================================== //
import {
  getBillOverviewRequest,
  getBillsRequest,
  exportExcelBillsRequest
} from 'apis/bill';
// Helpers ================================================================= //
import {
  HTTP_RESPONSE_STATUS,
  DEFAULT_ERROR_MESSAGE,
  handleErrorResponse
} from 'helpers/http';
// Material UI ============================================================= //
import { Box, Button, Stack } from '@mui/material';
// Components ============================================================== //
import Filters from './components/Filters';
import Overview from './components/Overview';
import TableBill from './components/TableBill';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// Constants =============================================================== //
const DEFAULT_FILTERS = {
  faculty: 'all',
  status: 'true',
  studentId: '',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  limit: 10
};

// =========================|| BARCODE STATISTIC ||========================= //
const BarcodeStatisticPage = () => {
  const dispatch = useDispatch();
  const faculties = useSelector(activeFacultiesSelector);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [overview, setOverview] = useState({
    loading: false,
    data: []
  });
  const [bills, setBills] = useState({
    loading: false,
    totalRecords: 0,
    data: []
  });

  useEffect(() => {
    handleSearch(DEFAULT_FILTERS);
  }, [])

  const handleChangeFilters = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const setLoadingOverview = loading => {
    setOverview(prev => ({ ...prev, loading }));
  };

  const setLoadingBills = loading => {
    setBills(prev => ({ ...prev, loading }));
  };

  const getOverview = async args => {
    try {
      setLoadingOverview(true);
      const res = await getBillOverviewRequest(args);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setOverview({
          loading: false,
          data: res.data.data.kpiValues
        });
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setLoadingOverview(false);
    }
  };

  const getBills = async args => {
    try {
      setLoadingBills(true);
      const res = await getBillsRequest(args);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setBills({
          loading: false,
          totalRecords: res.data.all,
          data: res.data.data.bills
        });
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setLoadingBills(false);
    }
  };

  const exportExcel = async args => {
    try {
      const outputFilename = 'Danh sách hóa đơn.xlsx';
      const res = await exportExcelBillsRequest(args);
      const url = URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', outputFilename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    }
  };

  const handleSearch = args => {
    getOverview(args);
    getBills(args);
  };

  return (
    <Box className={styles.BarcodeStatisticPage}>
      <Filters
        faculties={faculties}
        filters={filters}
        onChange={(field, value) => handleChangeFilters(field, value)}
        onSearch={args => handleSearch(args)}
      />
      <Overview loading={overview.loading} data={overview.data} />
      <Box className={styles.TableSection}>
        <Box className={styles.TableTitle}>
          <Stack direction={'row'} alignItems="center">
            <h3 className={styles.Title}>Danh sách hóa đơn</h3>
            <p className={styles.TotalRecord}>Tổng số: { bills?.totalRecords || 0 }</p>
          </Stack>
          <Button
            className={styles.ExportButton}
            variant="contained"
            onClick={() => exportExcel(filters)}
          >
            <img alt="export" src={excelImage} />
            Xuất dữ liệu
          </Button>
        </Box>
        <TableBill 
          data={bills.data}
          totalRecords={bills.totalRecords}
          loading={bills.loading}
          onRefetch={args => {
            setFilters({ ...filters, ...args })
            getBills({ ...filters, ...args })
          }}
        />
      </Box>
    </Box>
  );
};

export default BarcodeStatisticPage;
