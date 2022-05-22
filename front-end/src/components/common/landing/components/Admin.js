// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './Admin.module.scss';
// APIs ==================================================================== //
import { getHomePageStatistic } from 'apis/home';
// Assets ================================================================== //
import logo from 'assets/images/union-logo.png';
import image from 'assets/images/work-2.jpg';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'store/constant';
// Material UI ============================================================= //
import { Button, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// ===============================|| ADMIN ||=============================== //
const Admin = (props) => {
  const { onOpenLogin } = props;

  const [numbers, setNumbers] = useState(null);

  useEffect(async () => {
    try {
      const res = await getHomePageStatistic();

      if (res.data.status === 'success') {
        setNumbers({ ...res.data.data })
      }
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div id="admin">
      <Grid container className={styles.StatisticSection}>
        <Grid item xs={10} className={styles.Content}>
          <div className={styles.Statistic}>
            <h3 className={styles.Title}>Hỗ trợ công tác quản lý từ Đoàn trường đến các cơ sở Đoàn</h3>
            <div className={styles.Results}>
              <div className={styles.ResultItem}>
                <h3 className={styles.Number}>{`${numbers?.totalStudents}`}</h3>
                <p className={styles.Description}>Sinh viên đang học tập</p>
              </div>
              <div className={styles.ResultItem}>
                <h3 className={styles.Number}>{`${numbers?.totalUnionsMembers}`}</h3>
                <p className={styles.Description}>Đoàn viên đang sinh hoạt</p>
              </div>
              <div className={styles.ResultItem}>
                <h3 className={styles.Number}>{`${numbers?.totalFaculties}`}</h3>
                <p className={styles.Description}>Cơ sở đoàn trực thuộc</p>
              </div>
            </div>
          </div>
          <div className={styles.ImageContainer}>
            <img alt="union-logo" src={logo} />
          </div>
        </Grid>
      </Grid>
      <Grid container className={styles.FeaturesSection}>
        <Grid item xs={10} className={styles.Content}>
          <div className={styles.Features}>
            <h3 className={styles.Title}>Số hóa hồ sơ, tiết kiệm thời gian và công sức cho người quản trị</h3>
            <Grid container className={styles.FeatureList}>
              <Grid item xs={6} className={styles.FeatureItem}>
                <CheckCircleIcon className={styles.Icon} />
                Tra cứu thông tin nhanh chóng
              </Grid>
              <Grid item xs={6} className={styles.FeatureItem}>
                <CheckCircleIcon className={styles.Icon} />
                Đồng bộ hồ sơ, hạn chế sai sót
              </Grid>
              <Grid item xs={6} className={styles.FeatureItem}>
                <CheckCircleIcon className={styles.Icon} />
                Thao tác nghiệp vụ dễ dàng
              </Grid>
              <Grid item xs={6} className={styles.FeatureItem}>
                <CheckCircleIcon className={styles.Icon} />
                Đơn giản hóa các thủ tục trước đây
              </Grid>
              <Grid item xs={6} className={styles.FeatureItem}>
                <CheckCircleIcon className={styles.Icon} />
                Xem thống kê một cách trực quan
              </Grid>
              <Grid item xs={6} className={styles.FeatureItem}>
                <CheckCircleIcon className={styles.Icon} />
                Truy cập bất kỳ đâu
              </Grid>
            </Grid>
            <div className={styles.ButtonContainer}>
              <Button 
                className={clsx("button", styles.Button)}
                onClick={() => onOpenLogin(LOGIN_STEPS.ADMIN_LOGIN)}
              >
                Quản trị viên đăng nhập
              </Button>
            </div>
          </div>
          <div className={styles.ImageContainer}>
            <img alt="image" src={image} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Admin