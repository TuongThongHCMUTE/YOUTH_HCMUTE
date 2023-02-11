// Node Modules ============================================================ //
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
// Material UI ============================================================= //
import { makeStyles, useTheme } from '@mui/styles';
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
// Components ============================================================== //
import Breadcrumbs from 'components/common/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
// Helpers ================================================================= //
import { drawerWidth } from 'helpers/theme';
import { getMenu } from 'helpers/menu-items';
// Redux Store ============================================================= //
import { SET_MENU } from 'redux/actions/customization-actions';
import { roleSelector } from 'redux/selectors/auth-selectors';
// Assets ================================================================== //
import { IconChevronRight } from '@tabler/icons';
// Style Constant ========================================================== //
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    backgroundColor: theme.palette.background.default
  },
  appBarWidth: {
    transition: theme.transitions.create('width'),
    backgroundColor: theme.palette.background.default
  },
  content: {
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      // marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
      // marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px'
      // marginRight: '10px'
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: '260px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px'
    }
  }
}));

// ===========================|| MAIN LAYOUT ||=========================== //

const MainLayout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const role = useSelector(roleSelector);
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  // Handle left drawer
  const leftDrawerOpened = useSelector(state => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  React.useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
  }, [matchDownMd]);

  const navigation = getMenu(role);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}
      >
        <Toolbar sx={{ p: '8px 24px' }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/* main content */}
      <main
        className={clsx([
          classes.content,
          {
            [classes.contentShift]: leftDrawerOpened
          }
        ])}
      >
        {/* breadcrumb */}
        <Breadcrumbs
          separator={IconChevronRight}
          navigation={navigation}
          icon
          title
          rightAlign
        />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;