import React from 'react';
import { useSelector } from 'react-redux';
// Material UI ============================================================= //
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from '@mui/material';
// Default Theme =========================================================== //
import themes from './themes';
// Routing ================================================================= //
import Routes from './routes';
// Project Imports ========================================================= //
import NavigationScroll from './layout/NavigationScroll';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
