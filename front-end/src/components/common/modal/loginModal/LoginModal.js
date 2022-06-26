// Node Modules ============================================================ //
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { GoogleLogin } from 'react-google-login';
import clsx from 'clsx';
// Context ================================================================= //
import AppContext from 'store/AppContext';
// APIs ==================================================================== //
import { login, googleLogin } from 'apis/auth';
// Styles ================================================================== //
import styles from './LoginModal.module.scss';
// Assets ================================================================== //
import logo from 'assets/images/logo-hcmute-small.png';
// Constants =============================================================== //
import { LOGIN_STEPS, GOOGLE_CLIENT_ID } from 'store/constant';
import { USER_ROLES } from 'helpers/constants/user';
// Material UI ============================================================= //
import {
    Box, 
    Button,
    IconButton,
    Modal,
    TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
// My components =========================================================== //
import SnackBar from 'components/common/alert/Snackbar';

// ===========================|| LOGIN MODAL ||============================= //
const LoginModal = (props) => {
    const [open, setOpen] = useState(props.visible);
    const [step, setStep] = useState(LOGIN_STEPS.CHOOSE_OPTIONS);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const { dispatch } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        setOpen(props.visible);
        setStep(props.step);
    }, [props.visible, props.step]);

    const handleClose = () => {
        props.onClose();
    };

    const validateData = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email không được để trống';
        }
        if (!values.password) {
            errors.password = 'Mật khẩu không được để trống';
        }

        return errors;
    }

    const handleAdminLogin = async (data) => {
        setLoading(true);

        try {
            const res = await login(data);

            if (res.data.status === 'success') {
                const token = res.data.data.token;
                const user = res.data.data.user

                sessionStorage.setItem('token', token);
                sessionStorage.setItem('role', user.role);
                dispatch({type: "CURRENT_USER", payload: user});

                switch(user.role) {
                    case USER_ROLES.DOAN_TRUONG:
                        navigate('/admin/dashboard');
                        break;
                    case USER_ROLES.CONG_TAC_VIEN:
                        navigate('/cong-tac-vien/dashboard');
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            console.error("error: ", error.response.data.message);
            setAlert({
                severity: 'error',
                message: error.response.data.message
            });
        } finally {
            setLoading(false);
        }
    }

    const onGoogleLoginSuccess = async ({ tokenId }) => {
        setLoading(true);

        try {
            const res = await googleLogin({ token: tokenId });

            const token = res.data.data.token;
            const user = res.data.data.user

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', user.role);
            dispatch({type: "CURRENT_USER", payload: user});
            
            navigate('/tim-kiem');
        } catch (error) {
            setAlert({
                severity: 'error',
                message: error.response.data.message
            });
        } finally {
            setLoading(false);
        }
    };

    const onGoogleLoginFailure = (res) => {
        setAlert({
            severity: 'error',
            message: res.error
        });
    };
    
    return (
        <Modal
            open={open}
            disableAutoFocus={true}
        >
            <Box className={styles.Modal}>
                <div className={styles.Header}>
                    <IconButton className={styles.Close} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={styles.Logo}>
                        <img src={logo} alt="logo-hcmute" />
                    </div>
                    <div className={styles.Name}>
                        <h3>TRƯỜNG ĐẠI HỌC</h3>
                        <h2><u>SƯ PHẠM KỸ THUẬT TP. HỒ CHÍ MINH</u></h2>
                        <h5>HCMC University of Technology and Education</h5>
                    </div>
                </div>
                <div className={styles.Divider} />
                <div className={styles.Body}>
                    {(step === LOGIN_STEPS.CHOOSE_OPTIONS) &&
                        <div className={styles.BodyWrapper}>
                            <h3>Đăng nhập</h3>
                            <div className={styles.ButtonWrapper}>
                                <Button 
                                    className={clsx("button", styles.StudentLogin)}
                                    onClick={() => setStep(LOGIN_STEPS.STUDENT_LOGIN)}
                                >
                                    Tôi là sinh viên
                                </Button>
                                <Button 
                                    className={clsx("button", styles.AdminLogin)}
                                    onClick={() => setStep(LOGIN_STEPS.ADMIN_LOGIN)}
                                >
                                    Tôi là quản trị viên
                                </Button> 
                            </div>
                        </div>
                    }
                    {(step === LOGIN_STEPS.STUDENT_LOGIN) && 
                        <div className={clsx(styles.BodyWrapper, styles.StudentLoginWrapper)}>
                            <h3>Sinh viên đăng nhập</h3>
                            <p>Sử dụng email sinh viên để đăng nhập vào hệ thống</p>
                            <div className={styles.ButtonWrapper}>
                                <GoogleLogin 
                                    clientId={GOOGLE_CLIENT_ID}
                                    render={renderProps => (
                                        <LoadingButton 
                                            className={clsx("button", styles.GoogleLogin)}
                                            onClick={renderProps.onClick}
                                            loading={loading}
                                        >
                                            Đăng nhập với Google
                                        </LoadingButton>
                                    )}
                                    onSuccess={onGoogleLoginSuccess}
                                    onFailure={onGoogleLoginFailure}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={false}
                                />
                            </div>
                            <div className={styles.ButtonDivider} />
                            <a 
                                className={styles.AdminLoginLink}
                                onClick={e => {
                                    e.preventDefault();
                                    setStep(LOGIN_STEPS.ADMIN_LOGIN)
                                }}
                            >
                                Bạn là quản trị viên?
                            </a>
                        </div>
                    }
                    {(step === LOGIN_STEPS.ADMIN_LOGIN) && 
                        <div className={clsx(styles.BodyWrapper, styles.AdminLoginWrapper)}>
                            <h3>Quản trị viên đăng nhập</h3>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                enableReinitialize
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={values => validateData(values)}
                                onSubmit={(values) => { 
                                    handleAdminLogin(values);
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    setFieldValue,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <form className={styles.Form} onSubmit={handleSubmit}>
                                        <TextField
                                            type='email' 
                                            name='email'
                                            className={clsx('text-field', styles.TextField)}
                                            variant="filled"
                                            label="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email || ''}
                                            error={errors.email}
                                            helperText={errors.email}
                                        />
                                        <TextField 
                                            type="password"
                                            name='password'
                                            className={clsx('text-field', styles.TextField)}
                                            variant="filled"
                                            label="Mật khẩu"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password || ''}
                                            error={errors.password}
                                            helperText={errors.password}
                                        />
                                        <a className={styles.ForgotPasswordLink}>Quên mật khẩu</a>
                                        <div className={styles.ButtonWrapper}>
                                            <LoadingButton 
                                                type='submit'
                                                className={clsx("button", styles.AminLogin)}
                                                loading={loading}
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
                                    setStep(LOGIN_STEPS.STUDENT_LOGIN)
                                }}
                            >
                                Bạn là sinh viên?
                            </a>
                        </div>
                    }
                </div>
                {alert && <SnackBar 
                    severity={alert.severity} 
                    message={alert.message} 
                    onClose={() => setAlert(null)}
                />}
            </Box>
        </Modal>
    )
}

export default LoginModal;