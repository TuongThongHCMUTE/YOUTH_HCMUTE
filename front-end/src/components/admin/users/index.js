// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './index.module.scss';
// Material UI ============================================================= //
import { Grid } from '@mui/material';
// Components ============================================================== //
import UserStatistic from './statistic';
import StudentsManagement from './students';
import ManagersManagement from './managers';

// ==========================|| USER MANAGEMENT ||========================== //
const UsersManagement = () => {
    const [tabIndex, setTabIndex] = useState(0);
    
    const tabComponents = [
        <UserStatistic />,
        <ManagersManagement />,
        <StudentsManagement />
    ]

    return (
        <Grid container className={styles.UsersPage}>
            <Grid 
                xs={12} 
                item
                className={styles.Tabs}
            >
                <div><h1 
                    className={clsx(styles.TabItem, (tabIndex === 0) && styles.TabItemActive)}
                    onClick={() => setTabIndex(0)}
                >
                    THỐNG KÊ
                </h1></div>
                <div><h1 
                    className={clsx(styles.TabItem, (tabIndex === 1) && styles.TabItemActive)}
                    onClick={() => setTabIndex(1)}
                >
                    QUẢN TRỊ VIÊN
                </h1></div>
                <div><h1 
                    className={clsx(styles.TabItem, (tabIndex === 2) && styles.TabItemActive)}
                    onClick={() => setTabIndex(2)}
                >
                    SINH VIÊN
                </h1></div>
            </Grid>
            <Grid
                item
                xs={12}
                className={styles.Body}
            >
                { tabComponents[tabIndex] }
            </Grid>
        </Grid>
    )
}

export default UsersManagement