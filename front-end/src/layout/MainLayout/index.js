import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from '@material-ui/core';

// third-party
import clsx from 'clsx';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import adminNavigation from 'menu-items/admin';
import collaboratorNavigation from 'menu-items/collaborator';
import studentNavigation from 'menu-items/student';
import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';

// constant
import { USER_ROLES } from 'helpers/constants/user';

// assets
import { IconChevronRight } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
            padding: '16px',
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
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    React.useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
    }, [matchDownMd]);

    // Match Navigation
    const matchNavigation = () => {
        const role = sessionStorage.getItem('role');

        switch (role) {
            case USER_ROLES.DOAN_TRUONG:
                return adminNavigation;
            case USER_ROLES.CONG_TAC_VIEN:
                return collaboratorNavigation;
            case USER_ROLES.SINH_VIEN:
                return studentNavigation;
            default:
                return studentNavigation;
        }
    }

    const navigation = matchNavigation();

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
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

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
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                <Outlet />
            </main>
            <Customization />
        </div>
    );
};

export default MainLayout;
