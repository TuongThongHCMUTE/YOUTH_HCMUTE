// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { uiActions } from 'redux/reducers/ui-reducer';
// APIs ==================================================================== //
import {
  loginRequest,
  googleLoginRequest,
  resetPasswordRequest
} from 'apis/auth';
// Helpers =============================================================== //
import { LOGIN_STEPS, USER_ROLES } from 'helpers/auth';
import { ALERT_STATUS } from 'helpers/ui';
// Styles ================================================================== //
import styles from './LoginModal.module.scss';
// Material UI ============================================================= //
import { Box, Modal } from '@mui/material';
// Components ============================================================== //
import LoginModalHeader from './components/LoginModalHeader';
import ChooseOption from './components/ChooseOption';
import StudentLogin from './components/StudentLogin';
import AdminLogin from './components/AdminLogin';
import ForgotPassword from './components/ForgotPassword';

// ===========================|| LOGIN MODAL ||============================= //
const LoginModal = props => {
  const [open, setOpen] = useState(props.visible);
  const [step, setStep] = useState(LOGIN_STEPS.CHOOSE_OPTIONS);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.visible);
    setStep(props.step);
  }, [props.visible, props.step]);

  const modalCloseHandler = () => {
    props.onClose();
  };

  const moveToStepHandler = step => {
    setStep(step);
  };

  const showAlert = (message, severity) => {
    dispatch(
      uiActions.showAlert({
        message: message,
        severity: severity
      })
    );
  };

  const adminLoginHandler = async data => {
    try {
      setLoading(true);
      const res = await loginRequest(data);

      if (res.data.status === 'success') {
        const token = res.data.data.token;
        const user = res.data.data.user;

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', user.role);
        // dispatch({ type: "CURRENT_USER", payload: user });

        switch (user.role) {
          case USER_ROLES.DOAN_TRUONG:
            // navigate('/admin/dashboard');
            break;
          default:
            break;
        }
      }
    } catch (error) {
      showAlert(error.response.data.message, ALERT_STATUS.error);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLoginSuccess = async ({ tokenId }) => {
    try {
      setLoading(true);
      const res = await googleLoginRequest({ token: tokenId });

      const token = res.data.data.token;
      const user = res.data.data.user;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', user.role);
      // dispatch({ type: "CURRENT_USER", payload: user });

      navigate('/sinh-vien/dashboard');
    } catch (error) {
      showAlert(error.response.data.message, ALERT_STATUS.error);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLoginFailure = res => {
    showAlert(res.error, ALERT_STATUS.error);
  };

  const resetPasswordHandler = async data => {
    try {
      setLoading(true);
      const res = await resetPasswordRequest(data);

      if (res.data.status === 'success') {
        showAlert(res.data.message, ALERT_STATUS.success);
      }
    } catch (error) {
      showAlert(error.response.data.message, ALERT_STATUS.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} disableAutoFocus={true}>
      <Box className={styles.Modal}>
        <LoginModalHeader onClose={modalCloseHandler} />
        <div className={styles.Body}>
          {step === LOGIN_STEPS.CHOOSE_OPTIONS && (
            <ChooseOption onMoveToStep={moveToStepHandler} />
          )}
          {step === LOGIN_STEPS.STUDENT_LOGIN && (
            <StudentLogin
              loading={loading}
              onMoveToStep={moveToStepHandler}
              onLoginSuccess={onGoogleLoginSuccess}
              onLoginFailure={onGoogleLoginFailure}
            />
          )}
          {step === LOGIN_STEPS.ADMIN_LOGIN && (
            <AdminLogin
              loading={loading}
              onMoveToStep={moveToStepHandler}
              onLogin={adminLoginHandler}
            />
          )}
          {step === LOGIN_STEPS.FORGOT_PASSWORD && (
            <ForgotPassword
              loading={loading}
              onMoveToStep={moveToStepHandler}
              onResetPassword={resetPasswordHandler}
            />
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;
