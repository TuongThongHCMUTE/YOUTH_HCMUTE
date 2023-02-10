import React, { useState, useEffect } from 'react';
// Material UI ============================================================= //
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from '@mui/material';
// Redux =================================================================== //
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from 'redux/actions/auth-actions';
import { fetchFaculties } from 'redux/actions/faculty-actions';
import { customizationSelector } from 'redux/selectors/customization-selectors';
import { accessTokenSelector } from 'redux/selectors/auth-selectors';
// APIs ==================================================================== //
import { getCurrentUserRequest } from 'apis/auth';
// Helpers ================================================================= //
import { HTTP_RESPONSE_STATUS } from 'helpers/http';
import { getTokenFromStorage } from 'helpers/storage';
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

  const [authenticating, setAuthenticating] = useState(false);

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
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setAuthenticating(false);
      }
    };

    auth();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchFaculties());
    }
  }, [dispatch, token])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {authenticating && <Loader />}
          <Snackbar />
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
