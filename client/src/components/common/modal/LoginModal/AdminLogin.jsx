/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from './index.module.scss';
// Helpers ================================================================= //
import { LOGIN_STEPS, validateLoginValues } from 'helpers/auth';
// Material UI ============================================================= //
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ============================|| ADMIN LOGIN ||============================ //
const AdminLogin = props => {
  return (
    <div className={clsx(styles.BodyWrapper, styles.AdminLoginWrapper)}>
      <h3>Quản trị viên đăng nhập</h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={false}
        validate={values => validateLoginValues(values)}
        onSubmit={values => {
          props.onLogin(values);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <form className={styles.Form} onSubmit={handleSubmit}>
            <TextField
              type="email"
              name="email"
              className={clsx('text-field', styles.TextField)}
              variant="filled"
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email || ''}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            <TextField
              type="password"
              name="password"
              className={clsx('text-field', styles.TextField)}
              variant="filled"
              label="Mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password || ''}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
            <a
              className={styles.ForgotPasswordLink}
              onClick={e => {
                e.preventDefault();
                props.onMoveToStep(LOGIN_STEPS.FORGOT_PASSWORD);
              }}
            >
              Quên mật khẩu
            </a>
            <div className={styles.ButtonWrapper}>
              <LoadingButton
                type="submit"
                className={clsx('button', styles.AminLogin)}
                loading={props.loading}
              >
                Đăng nhập
              </LoadingButton>
            </div>
          </form>
        )}
      </Formik>
      <div className={styles.ButtonDivider} />
      <a
        className={styles.StudentLoginLink}
        onClick={e => {
          e.preventDefault();
          props.onMoveToStep(LOGIN_STEPS.STUDENT_LOGIN);
        }}
      >
        Bạn là sinh viên?
      </a>
    </div>
  );
};

export default AdminLogin;
