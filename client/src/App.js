import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// Material UI ============================================================= //
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
  Backdrop,
  Typography,
} from '@mui/material';
// Redux =================================================================== //
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from 'redux/actions/auth-actions';
import { fetchFaculties } from 'redux/actions/faculty-actions';
import { fetchYears } from 'redux/actions/year-actions';
import { customizationSelector } from 'redux/selectors/customization-selectors';
import { accessTokenSelector } from 'redux/selectors/auth-selectors';
// APIs ==================================================================== //
import { getCurrentUserRequest } from 'apis/auth';
// Helpers ================================================================= //
import { HTTP_RESPONSE_STATUS } from 'helpers/http';
import { getTokenFromStorage } from 'helpers/storage';
import { ROUTE } from 'helpers/route';
import { USER_ROLES } from 'helpers/auth';
// Default Theme =========================================================== //
import themes from './themes';
// Routing ================================================================= //
import Routes from './routes';
// Project Imports ========================================================= //
import NavigationScroll from './layout/NavigationScroll';
import Snackbar from 'components/common/alert/Snackbar'
import Loader from 'components/common/Loader';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customization = useSelector(customizationSelector);
  const token = useSelector(accessTokenSelector);

  const [authenticating, setAuthenticating] = useState(false);

  const navigateToDashboard = (role) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        navigate(ROUTE.adminDashboard);
        break;
      case USER_ROLES.DOAN_TRUONG:
        navigate(ROUTE.adminDashboard);
        break;
      case USER_ROLES.SINH_VIEN:
        navigate(ROUTE.studentDashboard);
        break;
      default:
        navigate(ROUTE.home);
        break;
    }
  };

  useEffect(() => {
    const auth = async () => {
      setAuthenticating(true);
      try {
        const res = await getCurrentUserRequest();
        if (res.status === HTTP_RESPONSE_STATUS.ok) {
          const token = getTokenFromStorage();
          const user = res.data.data.user;
          dispatch(
            login({
              token: token,
              user: user,
            })
          );
          navigateToDashboard(user.role);
        }
      } catch (error) {
        dispatch(logout());
        navigateToDashboard(USER_ROLES.GUEST);
      } finally {
        setAuthenticating(false);
      }
    };

    auth();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchFaculties());
      dispatch(fetchYears());
    }
  }, [dispatch, token])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {/* Loading */}
          {authenticating && <Loader />}
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={authenticating}
          >
            <Typography variant='h4' color='#fff'>Authenticating...</Typography>
          </Backdrop>
          {/* Alert Message */}
          <Snackbar />
          {/* App Routes */}
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
