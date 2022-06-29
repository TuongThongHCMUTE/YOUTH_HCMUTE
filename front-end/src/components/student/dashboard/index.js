import React, { useEffect, useState, useContext } from 'react'
// Styles ================================================================== //
import styles from './index.module.scss';
// Context
import AppContext from 'store/AppContext';
// APIs ==================================================================== //
import { getDataForStudentDashboard } from 'apis/statistic';
import { Grid, Typography } from '@material-ui/core';
// My components =========================================================== //
import Welcome from './components/Welcome';
import Fee from './components/Fee';
import Sv5t from './components/Sv5t';
import Scores from './components/Score';

const StudentDashboard = () => {
    const { state } = useContext(AppContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
      try {
        setLoading(true);
        const res = await getDataForStudentDashboard();
        setData(res.data.data);
        console.log('data:', res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, [])

    return (
        <div className={styles.StudentDashboard}>
            <Welcome user={state?.user} /> 
            <Grid className={styles.Content} container>
              <Grid className={styles.Left} item xs={6.5}>
                <div className={styles.Fees}>
                  <Typography className={styles.Title} variant='h4' component='h4'>Đoàn phí và sổ đoàn</Typography>
                  <Fee loading={loading} dongDoanPhi={data?.dongDoanPhi} nopSoDoan={data?.nopSoDoan} />
                </div>
                <div className={styles.Sv5t}>
                  <Typography className={styles.Title} variant='h4' component='h4'>Sinh viên 5 tốt</Typography>
                  <Typography className={styles.Description} variant='p' component='p'>
                    Những hoạt động sau sẽ giúp bạn bổ sung các tiêu chí còn thiếu để bình xét danh hiệu “Sinh viên 5 tốt”
                  </Typography>
                  <Sv5t />
                </div>
              </Grid>
              <Grid className={styles.Right} item xs={5.5}>
                <Typography className={styles.Title} variant='h4' component='h4'>Điểm rèn luyện và CTXH</Typography>
                <Scores loading={loading} diemCTXH={data?.diemCTXH} diemRenLuyen={data?.diemRenLuyen} />
              </Grid>
            </Grid>
        </div>
    )
}

export default StudentDashboard