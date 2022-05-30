// Node Modules ============================================================ //
import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
// Material UI ============================================================= //
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
// Context ================================================================= //
import AppReducer from 'store/AppReducer';
import AppContext from 'store/AppContext';
// Routing ================================================================= //
import Routes from './routes';
// Default Theme =========================================================== //
import themes from './themes';
// Project Imports ========================================================= //
import NavigationScroll from './layout/NavigationScroll';
// APIs ==================================================================== //
import { getCurrentUser } from 'apis/auth';

// ===========================|| APP ||=========================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    const [state, dispatch] = useReducer(AppReducer, null);

    useEffect(async () => {
        try {    
            const response = await getCurrentUser();
    
            if(response.data.data.user) {
                const user = response.data.data.user;
                dispatch({type: "CURRENT_USER", payload: user});
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <AppContext.Provider value={{ state, dispatch }}>
                        <Routes />
                    </AppContext.Provider>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
