import React from 'react';
// Material UI ============================================================= //
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from '@mui/material';
// Redux =================================================================== //
import { useSelector } from 'react-redux';
import { customizationSelector } from 'redux/selectors/customization-selectors';
// Default Theme =========================================================== //
import themes from './themes';
// Routing ================================================================= //
import Routes from './routes';
// Project Imports ========================================================= //
import NavigationScroll from './layout/NavigationScroll';
import Snackbar from 'components/common/alert/Snackbar'

const App = () => {
  const customization = useSelector(customizationSelector);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Snackbar />
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
