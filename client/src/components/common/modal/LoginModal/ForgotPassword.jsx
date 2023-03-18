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
import { LOGIN_STEPS, validateResetPasswordValues } from 'helpers/auth';
// Material UI ============================================================= //
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ==========================|| FORGOT PASSWORD ||========================== //
const ForgotPassword = props => {
  return (
    <div className={clsx(styles.BodyWrapper, styles.AdminLoginWrapper)}>
      <h3>Nhập email của bạn</h3>
      <Formik
        initialValues={{ email: '' }}
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={false}
        validate={values => validateResetPasswordValues(values)}
        onSubmit={values => {
          props.onResetPassword(values);
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
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email || ''}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            <div className={styles.ButtonWrapper}>
              <LoadingButton
                type="submit"
                className={clsx('button', styles.AminLogin)}
                loading={props.loading}
              >
                Lấy lại mật khẩu
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
          props.onMoveToStep(LOGIN_STEPS.ADMIN_LOGIN);
        }}
      >
        Trở về trang đăng nhập
      </a>
    </div>
  );
};

export default ForgotPassword;
