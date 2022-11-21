import React, { useState, useEffect } from 'react';
// Material UI ============================================================= //
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from '@mui/material';
// Redux =================================================================== //
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from 'redux/reducers/auth-reducer';
import { customizationSelector } from 'redux/selectors/customization-selectors';
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

const App = () => {
  const dispatch = useDispatch();
  const customization = useSelector(customizationSelector);

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
            authActions.login({
              token: token,
              user: user,
            })
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAuthenticating(false);
      }
    };

    auth();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {authenticating && <h1>Authenticating</h1>}
          <Snackbar />
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
