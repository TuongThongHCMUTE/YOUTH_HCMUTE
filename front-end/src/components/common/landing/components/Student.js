// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Student.module.scss';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'store/constant';
// Material UI ============================================================= //
import { Grid, Button } from '@mui/material';

// ================================|| STUDENT ||============================ //
const Student = (props) => {
  const { onOpenLogin } = props;

  const feature = [
    "Sinh viên tra cứu thông tin cá nhân",
    "Bí thư phê sổ đoàn trực tuyến cho đoàn viên trong chi đoàn",
    "Đoàn viên đăng ký rút sổ đoàn",
  ];

  return (
    <div id="student">
      <Grid container className={styles.Student}>
        <Grid item xs={10} className={styles.Content}>
          <Grid item xs={5} className={styles.Features}>
            {feature.map((item, index) => (
              <div className={styles.Item}>
                <div className={styles.Index}>{index + 1}</div>
                <div className={styles.Feature}>{item}</div>
              </div>
            ))}
          </Grid>
          <Grid item xs={7} className={styles.Login}>
            <h3>Bạn là sinh viên HCM UTE?</h3>
            <p>Đăng nhập để trải nghiệm các tính năng chỉ bằng 1 click chuột</p>
            <div className={styles.ButtonWrapper}>
              <Button 
                className={styles.Button}
                onClick={() => onOpenLogin(LOGIN_STEPS.STUDENT_LOGIN)}
              >
                Sinh viên đăng nhập
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Student