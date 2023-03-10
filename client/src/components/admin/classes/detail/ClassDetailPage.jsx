// Node Modules ============================================================ //
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Styles ================================================================== //
import styles from './ClassDetailPage.module.scss';
// Redux Store ============================================================= //
import { activeFacultiesSelector } from 'redux/selectors/faculty-selectors';
import { uiActions } from 'redux/reducers/ui-reducer';
// APIs ==================================================================== //
import { getClassByIdRequest, updateClassRequest } from 'apis/class';
// Helpers ================================================================= //
import {
  HTTP_RESPONSE_STATUS,
  DEFAULT_ERROR_MESSAGE,
  handleErrorResponse
} from 'helpers/http';
import { ALERT_STATUS } from 'helpers/ui';
// Material UI ============================================================= //
import { Box, Grid, Stack } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
// My components =========================================================== //
import TitleCard from 'components/common/cards/TitleCard';
import GeneralInfo from './components/GeneralInfo';
import ManagerInfo from './components/ManagerInfo';

// =========================|| CLASS DETAIL PAGE ||========================= //
const ClassDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const faculties = useSelector(activeFacultiesSelector);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const getData = async id => {
    try {
      setLoading(true);
      const res = await getClassByIdRequest(id);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setData(res.data.data.a_class);
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateData = async (data) => {
    try {
      setUpdating(true);
      const res = await updateClassRequest(data);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setData(res.data.data.a_class);
        dispatch(
          uiActions.showAlert({
            severity: ALERT_STATUS.success,
            message: 'Cập nhật thông tin thành công'
          })
        );
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Box className={styles.ClassDetailPage}>
      <Stack
        direction={{ md: 'row', xs: 'col' }}
        alignItems={{ xs: 'center' }}
        justifyContent={{ xs: 'space-between' }}
        className={styles.Header}
      >
        <h1 className={styles.Title}>Thông tin chi đoàn</h1>
      </Stack>
      <Stack direction="row" className={styles.Link}>
        <Link
          to={{
            pathname: '/chi-doan'
          }}
        >
          <WestIcon className={styles.BackIcon} />
          Trở về trang danh sách
        </Link>
      </Stack>
      <Grid container className={styles.Body}>
        <Grid item lg={4} xs={12} className={styles.Left}>
          <TitleCard padding="16px 32px" headerPadding="16px 32px" title="Thông tin chung">
            <GeneralInfo 
              data={data} 
              faculties={faculties} 
              loading={loading} 
              updating={updating}
              onUpdate={handleUpdateData}
            />
          </TitleCard>
        </Grid>
        <Grid item lg={8} xs={12} className={styles.Right}>
          <TitleCard padding="0" headerPadding="16px 32px" title="BCH Chi đoàn">
            <ManagerInfo 
              data={data}
              loading={loading} 
              updating={updating}
              onUpdate={handleUpdateData}
            />
          </TitleCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassDetailPage;
