// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
// Styles ================================================================== //
import styles from './Admin.module.scss';
// APIs ==================================================================== //
import { getHomePageRequest } from 'apis/home';
// Assets ================================================================== //
import logo from 'assets/images/union-logo.png';
import image from 'assets/images/work-2.jpg';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'helpers/auth';
import { ADMIN_FEATURES } from 'helpers/landing';
// Helpers ================================================================= //
import { transformHomePageData } from 'helpers/landing';
// Material UI ============================================================= //
import { Button, Grid } from '@mui/material';

// ===============================|| ADMIN ||=============================== //
const Admin = props => {
  const [statisTicData, setStatisTicData] = useState(
    transformHomePageData(null)
  );

  useEffect(() => {
    const fetchStatisticData = async () => {
      try {
        const res = await getHomePageRequest();
        if (res.data.status === 'success') {
          setStatisTicData(transformHomePageData({ ...res.data.data }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatisticData();
  }, []);

  const openLoginHandler = () => {
    props.onOpenLogin(LOGIN_STEPS.ADMIN_LOGIN);
  };

  const statisticComp = (
    <div className={styles.Statistic}>
      <h3 className={styles.Title}>
        Hỗ trợ công tác quản lý từ Đoàn trường đến các cơ sở Đoàn
      </h3>
      <ul className={styles.Results}>
        {statisTicData.map(item => {
          return (
            <li key={item.id} className={styles.ResultItem}>
              <NumberFormat
                value={item.value}
                className={styles.Number}
                displayType={'text'}
                thousandSeparator={true}
                renderText={(value, props) => <h3 {...props}>{value}</h3>}
              />
              <p className={styles.Description}>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const adminFeaturesComp = (
    <Grid container className={styles.FeatureList}>
      {ADMIN_FEATURES.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Grid key={index} item sm={6} xs={12} className={styles.FeatureItem}>
            <Icon className={styles.Icon} />
            {feature.name}
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <div id="admin">
      <Grid container className={styles.StatisticSection}>
        <Grid item xs={10} className={styles.Content}>
          {statisticComp}
          <div className={styles.ImageContainer}>
            <img alt="union-logo" src={logo} />
          </div>
        </Grid>
      </Grid>
      <Grid container className={styles.FeaturesSection}>
        <Grid item xs={10} className={styles.Content}>
          <div className={styles.Features}>
            <h3 className={styles.Title}>
              Số hóa hồ sơ, tiết kiệm thời gian và công sức cho người quản trị
            </h3>
            {adminFeaturesComp}
            <div className={styles.ButtonContainer}>
              <Button
                className={clsx('button', styles.Button)}
                onClick={openLoginHandler}
              >
                Quản trị viên đăng nhập
              </Button>
            </div>
          </div>
          <div className={styles.ImageContainer}>
            <img alt="admin" src={image} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Admin);
