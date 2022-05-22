// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Header.module.scss';
// Material UI ============================================================= //
import {
    Button,
    Grid
} from '@mui/material';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'store/constant';
// My Components =========================================================== //
import LogoSection from 'layout/MainLayout/LogoSection';

// ==============================|| HEADER ||=============================== //
const Header = (props) => {
    const { onOpenLogin } = props;
    const activedSection = 'header';

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
                    <Button 
                        className="button"
                        onClick={() => onOpenLogin(LOGIN_STEPS.CHOOSE_OPTIONS)}
                    >
                        Đăng nhập
                    </Button>
                </Grid>
                <div className={styles.HeaderDivider} />
            </Grid>
        </div>
    )
}

export default Header;