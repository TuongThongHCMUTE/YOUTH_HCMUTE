import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { fetchClasses } from 'redux/actions/class-actions';
import { fetchFaculties } from 'redux/actions/faculty-actions';
import { fetchYears } from 'redux/actions/year-actions';
import { customizationSelector } from 'redux/selectors/customization-selectors';
import { accessTokenSelector } from 'redux/selectors/auth-selectors';
// APIs ==================================================================== //
import { getCurrentUserRequest } from 'apis/auth';
// Helpers ================================================================= //
import { HTTP_RESPONSE_STATUS, handleErrorResponse } from 'helpers/http';
import { getTokenFromStorage } from 'helpers/storage';
import { ROUTE } from 'helpers/route';
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
  const customization = useSelector(customizationSelector);
  const token = useSelector(accessTokenSelector);
  const navigate = useNavigate();

  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    const auth = async () => {
      const token = getTokenFromStorage();

      if (!token) {
        dispatch(logout());
        navigate(ROUTE.home);
        return;
      }
    
      setAuthenticating(true);
      try {
        const res = await getCurrentUserRequest();
        if (res.status === HTTP_RESPONSE_STATUS.ok) {
          const user = res.data.data.user;
          dispatch(
            login({
              token: token,
              user: user,
            })
          );
        }
      } catch (error) {
        handleErrorResponse(error, 'Session time out. Please login again!', dispatch);
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
      dispatch(fetchClasses());
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
