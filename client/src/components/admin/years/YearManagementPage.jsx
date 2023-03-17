// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Styles ================================================================== //
import styles from './YearManagementPage.module.scss';
// Redux Store ============================================================= //
import { uiActions } from 'redux/reducers/ui-reducer';
// APIs ==================================================================== //
import {
  getYearsRequest,
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
// Material UI ============================================================= //
import { Box, Button, Stack } from '@mui/material';
// Components ============================================================== //
import TableYear from './TableYear';
// Constants =============================================================== //
const DEFAULT_FILTERS = {
  limit: 10
};

// =======================|| YEAR MANAGEMENT PAGE ||======================= //
const YearManagementPage = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [years, setYears] = useState({
    loading: false,
    totalRecords: 0,
    data: []
  });
  const [openCreateModal, setOpenCreateModal] = useState({
    isDisplay: false,
    isUpdate: false,
    schoolYear: {}
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
    getYears(args);
  };

  return (
    <Box>
      <Box className={styles.YearManagementPage}>
        <Stack
          className={styles.TitleSection}
          direction={{ md: 'row', xs: 'column' }}
        >
          <Box className={styles.Left}>
            <h3 className={styles.Title}>Danh sách năm học</h3>
          </Box>
          <Box className={styles.ButtonWrapper}>
            <Button className="button" variant="contained" onClick={() => {}}>
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
          onOpenCreateModal={setOpenCreateModal}
        />
      </Box>
    </Box>
  );
};

export default YearManagementPage;
