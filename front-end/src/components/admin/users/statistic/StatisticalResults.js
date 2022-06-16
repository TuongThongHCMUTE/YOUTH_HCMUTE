// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
// Styles ================================================================== //
import styles from './StatisticalResults.module.scss';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/constants/user';
// Material UI ============================================================= //
import { Grid, Avatar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Components ============================================================== //
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// ========================|| STATISTICAL RESULTS ||======================== //
const StatisticalResults = (props) => {
    const { loading, data } = props;

    const totalDoanTruong = data.filter(i => i._id === USER_ROLES.DOAN_TRUONG)[0];
    const totalDoanKhoa = data.filter(i => i._id === USER_ROLES.DOAN_KHOA)[0];
    const totalDoanVien = data.filter(i => i._id === USER_ROLES.DOAN_VIEN)[0];
    const totalCTV = data.filter(i => i._id === USER_ROLES.CONG_TAC_VIEN)[0]; 

    if (loading) {
        return (
            <Grid className={styles.Results} container>
                <Grid item xs={3}>
                    <SkeletonEarningCard />
                </Grid>
                <Grid item xs={3}>
                    <SkeletonEarningCard />
                </Grid>
                <Grid item xs={3}>
                    <SkeletonEarningCard />
                </Grid>
                <Grid item xs={3}>
                    <SkeletonEarningCard />
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid className={styles.Results} container>
            <Grid item xs={3}>
                <MainCard  border={false} className={clsx(styles.Card, styles.PurpleCard)} contentClass={styles.Content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Avatar variant="rounded" className={styles.Avatar}>
                                <AccountCircleIcon className={styles.CardIcon} />
                            </Avatar>
                        </Grid>
                        <Grid item className={styles.Total}>
                            { totalDoanVien && totalDoanVien.count
                                ? <NumberFormat 
                                value={totalDoanVien.count}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>0</Typography>
                            }
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={styles.subHeading}>Tài khoản sinh viên</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={3}>
                <MainCard  border={false} className={clsx(styles.Card, styles.BlueCard)} contentClass={styles.Content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Avatar variant="rounded" className={styles.Avatar}>
                                <AccountCircleIcon className={styles.CardIcon} />
                            </Avatar>
                        </Grid>
                        <Grid item className={styles.Total}>
                            { totalDoanKhoa && totalDoanKhoa.count
                                ? <NumberFormat 
                                value={totalDoanKhoa.count}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>0</Typography>
                            }
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={styles.subHeading}>Tài khoản Đoàn khoa</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={3}>
                <MainCard  border={false} className={clsx(styles.Card, styles.GreenCard)} contentClass={styles.Content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Avatar variant="rounded" className={styles.Avatar}>
                                <AccountCircleIcon className={styles.CardIcon} />
                            </Avatar>
                        </Grid>
                        <Grid item className={styles.Total}>
                            { totalCTV && totalCTV.count
                                ? <NumberFormat 
                                value={totalCTV.count}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>0</Typography>
                            }
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={styles.subHeading}>Tài khoản cộng tác viên</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={3}>
                <MainCard  border={false} className={clsx(styles.Card, styles.YellowCard)} contentClass={styles.Content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Avatar variant="rounded" className={styles.Avatar}>
                                <AccountCircleIcon className={styles.CardIcon} />
                            </Avatar>
                        </Grid>
                        <Grid item className={styles.Total}>
                            { totalDoanTruong && totalDoanTruong.count
                                ? <NumberFormat 
                                value={totalDoanTruong.count}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>0</Typography>
                            }
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={styles.subHeading}>Tài khoản Đoàn trường</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    )
}

export default StatisticalResults