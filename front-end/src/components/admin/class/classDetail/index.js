// Node Modules ============================================================ //
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// Styles ================================================================== //
import styles from './index.module.scss';
// APIs ==================================================================== //
import { getAClassById } from 'apis/class';
import { getAllFaculties } from 'apis/faculty';
// Material UI ============================================================= //
import { Grid } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
// My components =========================================================== //
import { TitleCard } from 'components/common/card';
import SnackBar from 'components/common/alert/Snackbar';
import GeneralInformation from './components/GeneralInformation';
import ManagersInfomation from './components/ManagersInfomation';

// ============================|| CLASS DETAIL ||=========================== //
const ClassDetail = (props) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [errorMessage, setErrorMessange] = useState('');

  useEffect(() => {
    getClassData();
    getFaculties();
  }, [])

  const getClassData = async () => {
    try {
      setLoading(true);
      const res = await getAClassById(id);

      if (res.data.status === 'success') {
        setData(res.data.data.a_class);
      } else {
        // log error message
      }
    } catch (err) {
      console.error(err);
      setErrorMessange(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const getFaculties = async () => {
    try {
        const res = await getAllFaculties();

        if (res.data.status === 'success') {
            setFaculties(res.data.data.faculties);
        }
    } catch (err) {
      setErrorMessange(err.response.data.message);
    }
  }

  return ( 
    <div className={styles.ClassDetail}>
      <Grid container className={styles.Header}>
        <Grid item xs={4}><h1 className={styles.Title}>THÔNG TIN CHI ĐOÀN</h1></Grid>
      </Grid>
      <div className={styles.Link}>
        <Link to={{
          pathname: '/chi-doan'
        }}>
          <WestIcon className={styles.BackIcon} />
          Trở về trang danh sách
        </Link>
      </div>
      <Grid container className={styles.Body}>
        <Grid item xs={3.7} className={styles.Left}>
          <TitleCard
            padding="12px 24px"
            title="THÔNG TIN CHUNG"
          >
            <GeneralInformation 
              data={data}
              faculties={faculties}
              loading={loading}
            />
          </TitleCard>
        </Grid>
        <Grid item xs={8} className={styles.Right}>
          <TitleCard
            padding="12px 24px"
            title="BCH CHI ĐOÀN"
          >
            <ManagersInfomation 
              data={data} 
              loading={loading}
            />
          </TitleCard>
        </Grid>
      </Grid> 
      {errorMessage && <SnackBar severity="error" message={errorMessage} />}
    </div>
  )
}

export default ClassDetail