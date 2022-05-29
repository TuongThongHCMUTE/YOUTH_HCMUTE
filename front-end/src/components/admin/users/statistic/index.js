
// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './index.module.scss';
// Material UI ============================================================= //
import { Box, Grid } from '@mui/material';
// Components ============================================================== //
import StatisticalResults from './StatisticalResults';
import DistributedColumnChart from './DistributedColumnChart';
import DistributedDonutChart from './DistributedDonutChart';

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
                        <DistributedColumnChart />
                    </Box>
                </Grid>
                {/* <Grid item xs={4.5} className={styles.Chart}>
                    <Box className={clsx(styles.ChartContent, styles.NoBorder)}>
                        <DistributedDonutChart />
                    </Box>
                </Grid> */}
            </Grid>
        </Grid>
    )
}

export default UserStatistic