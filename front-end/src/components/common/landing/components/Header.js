// Node Modules ============================================================ //
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Styles ================================================================== //
import styles from './Header.module.scss';
// Material UI ============================================================= //
import {
    Button,
    Grid
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
// Constants =============================================================== //
import { USER_ROLES, LOGIN_STEPS } from 'store/constant';
import config from 'config';
// Context ================================================================= //
import AppContext from 'store/AppContext';
// My Components =========================================================== //
import LogoSection from 'layout/MainLayout/LogoSection';

// ==============================|| HEADER ||=============================== //
const Header = (props) => {
    const { onOpenLogin } = props;
    const activedSection = 'header';
    const { state } = useContext(AppContext);
    const navigate = useNavigate();

    const sections = [
        {
            id: 'header',
            display: 'Home',
        },
        {
            id: 'introduction',
            display: 'Giới thiệu',
        },
        {
            id: 'feature',
            display: 'Chức năng',
        },
        {
            id: 'student',
            display: 'Sinh viên',
        },
        {
            id: 'admin',
            display: 'Quản trị viên',
        },
        {
            id: 'contact',
            display: 'Liên hệ',
        },
    ]

    const role = state?.user?.role;
    let redirectTo = config.defaultPath;

    switch(role) {
        case USER_ROLES.DOAN_TRUONG:
            redirectTo = '/admin/dashboard/default';
            break;
        case USER_ROLES.SINH_VIEN:
            redirectTo = '/student/dashboard/default';
            break;
        default:
            redirectTo = config.defaultPath;
            break;
    }

    return (
        <div id="header">
            <Grid container className={styles.Header}>
                <Grid item xs={10} className={styles.Content}>
                    <LogoSection />
                    <ul className={styles.Sections}>
                        {sections.map(item => 
                            <li>
                                <a 
                                    className={activedSection === item.id && styles.ActivedLink} 
                                    href={`#${item.id}`}
                                >
                                    {item.display}
                                </a>
                            </li>)}
                    </ul>
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
                            onClick={() => onOpenLogin(LOGIN_STEPS.CHOOSE_OPTIONS)}
                        >
                            Đăng nhập
                        </Button>
                    )}

                </Grid>
                <div className={styles.HeaderDivider} />
            </Grid>
        </div>
    )
}

export default Header;