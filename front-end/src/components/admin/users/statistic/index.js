
// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// Material UI ============================================================= //
import { Box, Grid } from '@mui/material';
// Components ============================================================== //
import StatisticalResults from './StatisticalResults';
import UsersDistributedColumnChart from 'components/common/charts/StudentsDistributedColumnChart';

// ==========================|| USERS STATISTIC ||========================== //
const UserStatistic = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <StatisticalResults />
            </Grid>
            <Grid container className={styles.Charts}>
                <Grid item xs={12} className={styles.Chart}>
                    <h3 className={styles.ChartLegend}>Số lượng sinh viên theo khoa</h3>
                    <Box className={styles.ChartContent}>
                        <UsersDistributedColumnChart />
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserStatistic