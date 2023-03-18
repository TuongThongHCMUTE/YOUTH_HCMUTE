// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Styles ================================================================== //
import styles from './YearManagementPage.module.scss';
// Redux Store ============================================================= //
import { uiActions } from 'redux/reducers/ui-reducer';
import { fetchYears } from 'redux/actions/year-actions';
// APIs ==================================================================== //
import {
  getYearsRequest,
  createYearRequest,
  updateYearRequest,
  deleteYearRequest
} from 'apis/year';
// Helpers ================================================================= //
import {
  HTTP_RESPONSE_STATUS,
  DEFAULT_ERROR_MESSAGE,
  handleErrorResponse
} from 'helpers/http';
import { ALERT_STATUS } from 'helpers/ui';
import { NAM_HOC_INIT_VALUES } from 'helpers/year';
// Material UI ============================================================= //
import { Box, Button, Stack } from '@mui/material';
// Components ============================================================== //
import TableYear from './TableYear';
import YearDetailModal from './YearDetailModal';
// Constants =============================================================== //
const DEFAULT_FILTERS = {
  limit: 10
};

// =======================|| YEAR MANAGEMENT PAGE ||======================= //
const YearManagementPage = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [saving, setSaving] = useState(false);
  const [years, setYears] = useState({
    loading: false,
    totalRecords: 0,
    data: []
  });
  const [modalConfig, setModalConfig] = useState({
    isDisplay: false,
    isUpdate: false,
    year: {}
  });

  useEffect(() => {
    handleSearch(DEFAULT_FILTERS);
  }, []);

  const setLoadingYears = loading => {
    setYears(prev => ({ ...prev, loading }));
  };

  const getYears = async args => {
    try {
      setLoadingYears(true);
      const res = await getYearsRequest(args);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setYears({
          loading: false,
          totalRecords: res.data.all,
          data: res.data.data.schoolYears
        });
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setLoadingYears(false);
    }
  };

  const handleUpdateYear = async data => {
    try {
      const res = await updateYearRequest(data);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        handleSearch(filters);
        dispatch(fetchYears());
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

  const handleDeleteYear = async id => {
    try {
      const res = await deleteYearRequest(id);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        handleSearch(filters);
        dispatch(fetchYears());
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

  const handleSaveYear = async (data, isUpdate, callback) => {
    try {
      setSaving(true);
      const res = isUpdate ? await updateYearRequest(data) : await createYearRequest(data);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        handleSearch(filters);
        dispatch(fetchYears());
      }
      dispatch(
        uiActions.showAlert({
          severity: ALERT_STATUS.success,
          message: 'Cập nhật thông tin thành công'
        })
      );
      callback();
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setSaving(false);
    }
  };

  const handleSearch = args => {
    getYears(args);
  };

  return (
    <Box className={styles.YearManagementPage}>
      <Stack
        className={styles.TitleSection}
        direction={{ md: 'row', xs: 'column' }}
      >
        <Box className={styles.Left}>
          <h3 className={styles.Title}>Danh sách năm học</h3>
        </Box>
        <Box className={styles.ButtonWrapper}>
          <Button 
            className="button" 
            variant="contained" 
            onClick={() => {
              setModalConfig({ isDisplay: true, isUpdate: false, year: NAM_HOC_INIT_VALUES })
            }}
          >
            Thêm mới
          </Button>
        </Box>
      </Stack>
      <TableYear
        data={years?.data}
        totalRecords={years?.totalRecords}
        loading={years?.loading}
        onRefetch={args => {
          setFilters({ ...filters, ...args });
          getYears({ ...filters, ...args });
        }}
        onUpdate={handleUpdateYear}
        onDelete={handleDeleteYear}
        onOpenCreateModal={setModalConfig}
      />
      <YearDetailModal 
        open={modalConfig.isDisplay}
        isUpdate={modalConfig.isUpdate}
        data={modalConfig.year}
        saving={saving}
        onSave={handleSaveYear}
        onClose={() => setModalConfig({ isDisplay: false, isUpdate: false, year: {}})}
      />
    </Box>
  );
};

export default YearManagementPage;
