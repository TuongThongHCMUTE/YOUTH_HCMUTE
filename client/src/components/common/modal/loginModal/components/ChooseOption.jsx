// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from '../LoginModal.module.scss';
// Helpers ================================================================= //
import { LOGIN_STEPS } from 'helpers/auth';
// Material UI ============================================================= //
import { Button } from '@mui/material';

// ===========================|| CHOOSE OPTION ||============================ //
const ChooseOption = props => {
  return (
    <div className={styles.BodyWrapper}>
      <h3>Đăng nhập</h3>
      <div className={styles.ButtonWrapper}>
        <Button
          className={clsx('button', styles.StudentLogin)}
          onClick={() => props.onMoveToStep(LOGIN_STEPS.STUDENT_LOGIN)}
        >
          Tôi là sinh viên
        </Button>
        <Button
          className={clsx('button', styles.AdminLogin)}
          onClick={() => props.onMoveToStep(LOGIN_STEPS.ADMIN_LOGIN)}
        >
          Tôi là quản trị viên
        </Button>
      </div>
    </div>
  );
};

export default ChooseOption;
