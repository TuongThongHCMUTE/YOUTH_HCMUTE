// Node Modules ============================================================ //
import React, { useState, useEffect} from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// APIs ==================================================================== //
import { countUsersByRole } from 'apis/statistic';
// Material UI ============================================================= //
import { Box, Grid } from '@mui/material';
// Components ============================================================== //
import StatisticalResults from './StatisticalResults';
import UsersDistributedColumnChart from 'components/common/charts/StudentsDistributedColumnChart';

// ==========================|| USERS STATISTIC ||========================== //
const UserStatistic = () => {
    const [usersByRole, setUserByRole] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(async () => {
        try {
            setLoading(true);

            const res = await countUsersByRole();
            if (res.data.status === 'success') {
                setUserByRole(res.data.data);
            } 
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, [])
    
    return (
        <Grid container>
            <Grid item xs={12}>
                <StatisticalResults loading={loading} data={usersByRole} />
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