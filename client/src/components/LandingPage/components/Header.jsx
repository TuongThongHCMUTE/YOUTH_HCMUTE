// Node Modules ============================================================ //
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Styles ================================================================== //
import styles from './Header.module.scss';
// Redux =================================================================== //
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/selectors/auth-selectors';
import { defaultPathSelector } from 'redux/selectors/ui-selectors';
// Material UI ============================================================= //
import { Button, Grid, IconButton } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import MenuIcon from '@mui/icons-material/Menu';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'helpers/auth';
import { LANDING_PAGE_SECTIONS } from 'helpers/landing';
// My Components =========================================================== //
import LogoSection from 'layout/MainLayout/LogoSection';

const activeSection = 'header';

// ==============================|| HEADER ||=============================== //
const Header = (props) => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const redirectTo = useSelector(defaultPathSelector);

  const [showMenu, setShowMenu] = useState(window.innerWidth > 1024);

  const hideMenuHandler = () => {
    if (window.innerWidth <= 1024) {
      setShowMenu(false);
    }
  };

  const toggleMenuHandler = () => {
    setShowMenu(prev => !prev);
  };

  return (
    <div id="header">
      <Grid container className={styles.Header}>
        <Grid item xl={10} xs={11} className={styles.Content}>
          <LogoSection />
          {showMenu && (
            <ul className={styles.Sections}>
              {LANDING_PAGE_SECTIONS.map(item => (
                <li key={item.id}>
                  <a
                    className={activeSection === item.id ? styles.ActiveLink : ''}
                    onClick={hideMenuHandler}
                    href={`#${item.id}`}
                  >
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.ButtonsWrapper}>
            <IconButton
              className={styles.MenuButton}
              onClick={toggleMenuHandler}
            >
              <MenuIcon />
            </IconButton>
            {user ? (
              <Button
                className="button"
                endIcon={<EastIcon />}
                onClick={() => navigate(redirectTo)}
              >
                Youth HCMUTE
              </Button>
            ) : (
              <Button
                className="button"
                onClick={() => props.onOpenLogin(LOGIN_STEPS.CHOOSE_OPTIONS)}
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </Grid>
        <div className={styles.HeaderDivider} />
      </Grid>
    </div>
  );
};

export default React.memo(Header);
