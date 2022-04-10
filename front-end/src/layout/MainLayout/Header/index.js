import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase } from '@material-ui/core';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets 
import MenuIcon from '@mui/icons-material/Menu';

// style constant
const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative'
    },
    line: {
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: '-24px',
        width: '100vw',
        height: '3px',
        background: 'linear-gradient(90deg, #ec1f25, #2c3192)'
    },
    grow: {
        flexGrow: 1
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        borderRadius: '0px',
        transition: 'all .2s ease-in-out',
        background: 'var(--color-white)',
        color: 'var(--color-primary-400)',
        '&:hover': {
            background: 'var(--color-primary-200)'
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    }
}));

// ===========================|| MAIN NAVBAR / HEADER ||=========================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
                        <MenuIcon stroke={2} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>

            {/* header search */}
            {/* <SearchSection theme="light" /> */}
            <div className={classes.grow} />
            <div className={classes.grow} />

            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />
            <div className={classes.line} />
        </div>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
