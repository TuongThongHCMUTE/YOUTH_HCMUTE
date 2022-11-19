// Node Modules ============================================================ //
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Styles ================================================================== //
import styles from './Header.module.scss';
// Material UI ============================================================= //
import { Button, Grid, IconButton } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import MenuIcon from '@mui/icons-material/Menu';
// Constants =============================================================== //
import { LOGIN_STEPS, USER_ROLES } from 'helpers/auth';
import config from 'config';
// My Components =========================================================== //
// import LogoSection from "layout/MainLayout/LogoSection";

// ==============================|| HEADER ||=============================== //
const Header = props => {
  const activeSection = 'header';
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(window.innerWidth > 1024);

  const state = {
    user: false
  };

  const sections = [
    {
      id: 'header',
      display: 'Home'
    },
    {
      id: 'introduction',
      display: 'Giới thiệu'
    },
    {
      id: 'feature',
      display: 'Chức năng'
    },
    {
      id: 'student',
      display: 'Sinh viên'
    },
    {
      id: 'admin',
      display: 'Quản trị viên'
    },
    {
      id: 'contact',
      display: 'Liên hệ'
    }
  ];

  const role = USER_ROLES.DOAN_TRUONG;
  let redirectTo = config.defaultPath;

  switch (role) {
    case USER_ROLES.DOAN_TRUONG:
      redirectTo = '/admin/dashboard/';
      break;
    case USER_ROLES.CONG_TAC_VIEN:
      redirectTo = '/cong-tac-vien/dashboard';
      break;
    case USER_ROLES.DOAN_VIEN:
      redirectTo = '/sinh-vien/dashboard/';
      break;
    default:
      break;
  }

  return (
    <div id="header">
      <Grid container className={styles.Header}>
        <Grid item xl={10} xs={11} className={styles.Content}>
          {/* <LogoSection /> */}
          {showMenu && (
            <ul className={styles.Sections}>
              {sections.map(item => (
                <li
                  key={item.id}
                >
                  <a
                    className={activeSection === item.id && styles.ActiveLink}
                    onClick={() => {
                      if (window.innerWidth <= 1024) {
                        setShowMenu(false);
                      }
                    }}
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
              onClick={() => setShowMenu(prev => !prev)}
            >
              <MenuIcon />
            </IconButton>
            {state?.user ? (
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

export default Header;
