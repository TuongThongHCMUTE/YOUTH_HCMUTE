// Node Modules ============================================================ //
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux =================================================================== //
import { useDispatch, useSelector } from 'react-redux';
import {
  avatarSelector,
  displayNameSelector,
  positionSelector
} from 'redux/selectors/auth-selectors';
import { defaultPathSelector } from 'redux/selectors/ui-selectors';
import { logout } from 'redux/actions/auth-actions';

// Material UI ============================================================= //
import { makeStyles, useTheme } from '@mui/styles';
import {
  Avatar,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Paper,
  Popper,
  Typography
} from '@mui/material';
// Project Imports ========================================================= //
import MainCard from 'components/common/cards/MainCard';
import Transitions from 'components/common/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
// Assets ================================================================== //
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
// Styles ================================================================== //
const useStyles = makeStyles(theme => ({
  navContainer: {
    width: '100%',
    maxWidth: '350px',
    minWidth: '300px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%'
    }
  },
  headerAvatar: {
    cursor: 'pointer',
    ...theme.typography.mediumAvatar,
    margin: '8px 0 8px 8px !important'
  },
  profileChip: {
    height: '48px',
    alignItems: 'center',
    borderRadius: '27px',
    transition: 'all .2s ease-in-out',
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.light,
    '&[aria-controls="menu-list-grow"], &:hover': {
      borderColor: theme.palette.primary.main,
      background: `${theme.palette.primary.main}!important`,
      color: theme.palette.primary.light,
      '& svg': {
        stroke: theme.palette.primary.light
      }
    }
  },
  profileLabel: {
    lineHeight: 0,
    padding: '12px'
  },
  listItem: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center'
  },
  cardContent: {
    padding: '16px !important'
  },
  card: {
    backgroundColor: theme.palette.primary.light,
    marginBottom: '16px',
    marginTop: '16px'
  },
  searchControl: {
    width: '100%',
    paddingRight: '8px',
    paddingLeft: '16px',
    marginBottom: '16px',
    marginTop: '16px'
  },
  startAdornment: {
    fontSize: '1rem',
    color: theme.palette.grey[500]
  },
  flex: {
    display: 'flex'
  },
  name: {
    marginLeft: '2px',
    fontWeight: 400
  },
  ScrollHeight: {
    height: '100%',
    maxHeight: 'calc(100vh - 250px)',
    overflowX: 'hidden'
  },
  badgeWarning: {
    backgroundColor: theme.palette.warning.dark,
    color: '#fff'
  },
  logOut: {
    '&:hover': {
      color: '#fff !important'
    }
  }
}));

// ===========================|| PROFILE MENU ||=========================== //

const ProfileSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customization = useSelector(state => state.customization);
  const userAvatar = useSelector(avatarSelector);
  const userDisplayName = useSelector(displayNameSelector);
  const userPosition = useSelector(positionSelector);
  const redirectTo = useSelector(defaultPathSelector);

  const [selectedIndex] = useState(1);
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(redirectTo);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Chip
        classes={{ label: classes.profileLabel }}
        className={classes.profileChip}
        icon={
          <Avatar
            src={userAvatar}
            className={classes.headerAvatar}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <SettingsIcon
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <CardContent className={classes.cardContent}>
                    <Grid container direction="column" spacing={0}>
                      <Grid item className={classes.flex}>
                        <Typography variant="h4">{userDisplayName}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">{userPosition}</Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                    <UpgradePlanCard />
                    <Divider />
                    <List component="nav" className={classes.navContainer}>
                      <ListItemButton
                        className={classes.listItem}
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <LogoutIcon stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography>Logout</Typography>}
                        />
                      </ListItemButton>
                    </List>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
