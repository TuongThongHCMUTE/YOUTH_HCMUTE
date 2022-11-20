// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Student.module.scss';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'helpers/auth';
import { STUDENT_FEATURES } from 'helpers/landing';
// Material UI ============================================================= //
import { Grid, Button } from '@mui/material';

// ================================|| STUDENT ||============================ //
const Student = props => {
  const loginHandler = () => {
    props.onOpenLogin(LOGIN_STEPS.STUDENT_LOGIN);
  };

  const featuresComp = (
    <ul>
      {STUDENT_FEATURES.map((feature, index) => {
        return (
          <li className={styles.Item} key={index}>
            <div className={styles.Index}>{index + 1}</div>
            <div className={styles.Feature}>{feature}</div>
          </li>
        );
      })}
    </ul>
  );

  const loginComp = (
    <React.Fragment>
      <h3>Bạn là sinh viên HCM UTE?</h3>
      <p>Đăng nhập để trải nghiệm các tính năng chỉ bằng 1 click chuột</p>
      <div className={styles.ButtonWrapper}>
        <Button
          className={styles.Button}
          onClick={loginHandler}
        >
          Sinh viên đăng nhập
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <div id="student">
      <Grid container className={styles.Student}>
        <Grid item xs={10} className={styles.Content}>
          <Grid item xl={5} xs={12} className={styles.Features}>
            {featuresComp}
          </Grid>
          <Grid item xl={5} xs={12} className={styles.Login}>
            {loginComp}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Student);
