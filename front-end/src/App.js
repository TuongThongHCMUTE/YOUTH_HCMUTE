// Node Modules ============================================================ //
import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
// Material UI ============================================================= //
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, StyledEngineProvider } from "@material-ui/core";
// Context ================================================================= //
import AppReducer from "store/AppReducer";
import AppContext from "store/AppContext";
// Routing ================================================================= //
import Routes from "./routes";
// Default Theme =========================================================== //
import themes from "./themes";
// Project Imports ========================================================= //
import NavigationScroll from "./layout/NavigationScroll";
// APIs ==================================================================== //
import { getCurrentUser } from "apis/auth";
import { getAllClasses } from "apis/class";
import { getAllFaculties } from "apis/faculty";
import { getAllSchoolYears, getCurrentSchoolYear } from "apis/schoolYears";

// ===========================|| APP ||=========================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  const [state, dispatch] = useReducer(AppReducer, null);

  const getUser = async () => {
    try {
      const response = await getCurrentUser();

      if (response.data.data.user) {
        const user = response.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: user });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFaculties = async () => {
    try {
      const response = await getAllFaculties({ hienThi: true });

      if (response.data.data.faculties) {
        const faculties = response.data.data.faculties;
        dispatch({ type: "ACTIVE_FACULTIES", payload: faculties });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClasses = async () => {
    try {
      const response = await getAllClasses({ hienThi: true });

      if (response.data.data.classes) {
        const classes = response.data.data.classes;
        dispatch({ type: "ACTIVE_CLASSES", payload: classes });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getYears = async () => {
    try {
      const response = await getAllSchoolYears({ hienThi: true });

      if (response.data.data.schoolYears) {
        const schoolYears = response.data.data.schoolYears;
        dispatch({ type: "ACTIVE_YEARS", payload: schoolYears });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentYear = async () => {
    try {
      const response = await getCurrentSchoolYear();
      if (response.status === 200) {
        const schoolYear = response.data.data.schoolYear;
        dispatch({ type: "CURRENT_YEAR", payload: schoolYear });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getFaculties();
    getClasses();
    getYears();
    getCurrentYear();
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
