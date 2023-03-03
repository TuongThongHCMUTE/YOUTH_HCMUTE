/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import { GoogleLogin } from 'react-google-login';
import { LoadingButton } from '@mui/lab';
// Styles ================================================================== //
import styles from '../LoginModal.module.scss';
// Helpers ================================================================= //
import { LOGIN_STEPS, GOOGLE_CLIENT_ID } from 'helpers/auth';

// ===========================|| STUDENT LOGIN ||=========================== //
const StudentLogin = props => {
  return (
    <div className={clsx(styles.BodyWrapper, styles.StudentLoginWrapper)}>
      <h3>Sinh viên đăng nhập</h3>
      <p>Sử dụng email sinh viên để đăng nhập vào hệ thống</p>
      <div className={styles.ButtonWrapper}>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={renderProps => (
            <LoadingButton
              className={clsx('button', styles.GoogleLogin)}
              onClick={renderProps.onClick}
              loading={props.loading}
            >
              Đăng nhập với Google
            </LoadingButton>
          )}
          onSuccess={props.onLoginSuccess}
          onFailure={props.onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
      </div>
      <div className={styles.ButtonDivider} />
      <a
        className={styles.AdminLoginLink}
        onClick={e => {
          e.preventDefault();
          props.onMoveToStep(LOGIN_STEPS.ADMIN_LOGIN);
        }}
      >
        Bạn là quản trị viên?
      </a>
    </div>
  );
};

export default StudentLogin;
