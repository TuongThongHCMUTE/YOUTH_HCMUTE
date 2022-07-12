import React, { useEffect, useState } from 'react';
// APIs
import { statisticBills } from 'apis/statistic';
// material-ui
import { Grid } from '@material-ui/core';
import { Typography } from '@mui/material';
import styles from './index.module.scss';
// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import UserStatistic from '../users/statistic';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [billData, setBillData] = useState(null);
    
    useEffect(async () => {
        try {
            setLoading(true);
            const res = await statisticBills();
            setBillData(res.data.data);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <>
            <Typography variant='h3' component='h3' className={styles.SectionTitle}>THỐNG KÊ HÓA ĐƠN</Typography>
            <Grid container spacing={gridSpacing} sx={{ padding: '32px' }}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard isLoading={isLoading} data={billData?.staticBill[0]?.total} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <TotalOrderLineChartCard isLoading={isLoading} data={billData?.countData?.totalBills} />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeDarkCard isLoading={isLoading} data={billData?.countData?.totalPaid} />
                                </Grid>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard isLoading={isLoading} data={billData?.countData?.totalUnPaid} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12}>
                            <TotalGrowthBarChart total={billData?.staticBill[0]?.total} data={billData?.staticBillByFaculty} isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Typography variant='h3' component='h3' className={styles.SectionTitle}>THỐNG KÊ NGƯỜI DÙNG</Typography>
            <UserStatistic />
        </>
    );
};

export default Dashboard;
