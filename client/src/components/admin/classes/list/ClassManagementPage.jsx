// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Styles ================================================================== //
import styles from './ClassManagementPage.module.scss';
// Redux Store ============================================================= //
import { activeFacultiesSelector } from 'redux/selectors/faculty-selectors';
import { uiActions } from 'redux/reducers/ui-reducer';
// APIs ==================================================================== //
import {
  getClassesRequest,
  updateClassRequest,
  deleteClassRequest
} from 'apis/class';
// Helpers ================================================================= //
import {
  HTTP_RESPONSE_STATUS,
  DEFAULT_ERROR_MESSAGE,
  handleErrorResponse
} from 'helpers/http';
import { ALERT_STATUS } from 'helpers/ui';
// Assets ================================================================== //
import excelImage from 'assets/images/icons/excel.png';
// Material UI ============================================================= //
import { Box, Button, Stack } from '@mui/material';
// Components ============================================================== //
import Filters from './components/Filters';
import TableClass from './components/TableClass';
// Constants =============================================================== //
const DEFAULT_FILTERS = {
  faculty: 'all',
  className: '',
  limit: 10
};

// =======================|| CLASS MANAGEMENT PAGE ||======================= //
const ClassManagementPage = () => {
  const dispatch = useDispatch();
  const faculties = useSelector(activeFacultiesSelector);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [classes, setClasses] = useState({
    loading: false,
    totalRecords: 0,
    data: []
  });

  useEffect(() => {
    handleSearch(DEFAULT_FILTERS);
  }, []);

  const handleChangeFilters = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const setLoadingClasses = loading => {
    setClasses(prev => ({ ...prev, loading }));
  };

  const getClasses = async args => {
    try {
      setLoadingClasses(true);
      const res = await getClassesRequest(args);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setClasses({
          loading: false,
          totalRecords: res.data.all,
          data: res.data.data.classes
        });
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setLoadingClasses(false);
    }
  };

  const handleUpdateClass = async data => {
    try {
      const res = await updateClassRequest(data);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        handleSearch(filters);
      }
      dispatch(
        uiActions.showAlert({
          severity: ALERT_STATUS.success,
          message: 'Cập nhật thông tin thành công'
        })
      );
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    }
  };

  const handleDeleteClass = async id => {
    try {
      const res = await deleteClassRequest(id);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        handleSearch(filters);
      }
      dispatch(
        uiActions.showAlert({
          severity: ALERT_STATUS.success,
          message: 'Xóa thành công'
        })
      );
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    }
  };

  const handleSearch = args => {
    getClasses(args);
  };

  return (
    <Box className={styles.ClassManagementPage}>
      <Filters
        faculties={faculties}
        filters={filters}
        onChange={(field, value) => handleChangeFilters(field, value)}
        onSearch={args => handleSearch(args)}
      />
      <Box className={styles.TableSection}>
        <Box className={styles.TableTitle}>
          <Stack direction={{ sm: 'row', xs: 'column' }} alignItems="center">
            <h3 className={styles.Title}>Danh sách chi đoàn</h3>
            <p className={styles.TotalRecord}>
              Tổng số: {classes?.totalRecords || 0}
            </p>
          </Stack>
          <Stack direction={{ sm: 'row', xs: 'column' }} className={styles.ButtonWrapper}>
            <Button
              className={styles.ExportButton}
              variant="contained"
              // onClick={() => exportExcel(filters)}
            >
              <img alt="export" src={excelImage} />
              Xuất dữ liệu
            </Button>
            <Button
              className="button"
              variant="contained"
              // onClick={() => setShowCreateModal(true)}
            >
              Thêm mới
            </Button>
          </Stack>
        </Box>
        <TableClass 
          data={classes?.data}
          totalRecords={classes?.totalRecords}
          loading={classes?.loading}
          onRefetch={args => {
            setFilters({ ...filters, ...args });
            getClasses({ ...filters, ...args });
          }}
          onUpdate={handleUpdateClass}
          onDelete={handleDeleteClass}
        />
      </Box>
    </Box>
  );
};

export default ClassManagementPage;
