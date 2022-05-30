import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { Box, Drawer, useMediaQuery } from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import MenuCard from './MenuCard';
import { drawerWidth } from 'store/constant';

// import menuItem from 'menu-items';
import adminMenuItems from 'menu-items/admin';
import studentMenuItems from 'menu-items/student';

// constant
import { USER_ROLES } from 'store/constant';

// style constant
const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        },
        position: 'fixed'
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRight: 'none',
        [theme.breakpoints.up('md')]: {
            top: '80px'
        }
    },
    ScrollHeight: {
        height: 'calc(100vh - 80px)',
        paddingLeft: '16px',
        paddingRight: '16px',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)'
        }
    },
    boxContainer: {
        display: 'flex',
        padding: '16px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    line: {
        position: 'absolute',
        left: 'calc(100% - 2px)',
        height: '100%',
        width: '2px',
        background: '#c4c4c4'
    }
}));

// ===========================|| SIDEBAR DRAWER ||=========================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    // Match MenuItems
    const matchMenuItems = () => {
        const role = sessionStorage.getItem('role');

        switch (role) {
            case USER_ROLES.DOAN_TRUONG:
                return adminMenuItems;
            case USER_ROLES.SINH_VIEN:
                return studentMenuItems;
            default:
                return studentMenuItems;
        }
    }

    const menuItems = matchMenuItems();

    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <div className={classes.boxContainer}>
                    <LogoSection />
                </div>
            </Box>
            <BrowserView>
                <PerfectScrollbar component="div" className={classes.ScrollHeight}>
                    <MenuList menuItems={menuItems} />
                    <MenuCard />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList menuItems={menuItems} />
                    <MenuCard />
                </Box>
            </MobileView>
            <div className={classes.line} />
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                classes={{
                    paper: classes.drawerPaper
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </nav>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
