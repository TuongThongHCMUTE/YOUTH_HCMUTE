// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
// Styles ================================================================== //
import styles from './StatisticalResults.module.scss';
// Material UI ============================================================= //
import { Grid, Avatar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Components ============================================================== //
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// ========================|| STATISTICAL RESULTS ||======================== //
const StatisticalResults = (props) => {
    const { loading, data } = props;

    // const total = data.filter(i => i.name === 'Tổng tiền đã thu')[0];
    // const unionFee = data.filter(i => i.name === 'Đoàn phí')[0];
    // const additionalFee = data.filter(i => i.name === 'Truy thu Đoàn phí')[0];
    // const book = data.filter(i => i.name === 'Sổ đoàn viên')[0];
    // const constructionFee = data.filter(i => i.name === 'Kinh phí đóng góp công trình thanh niên')[0];
    // const cardFee = data.filter(i => i.name === 'Kinh phí làm thẻ Hội viên hội sinh viên Việt Nam')[0];

    const total = 0;
    const unionFee = 0;
    const book = 0;

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
                            { total && total.total
                                ? <NumberFormat 
                                value={total.total}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=' VNĐ'
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>20.000</Typography>
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
                            { unionFee && unionFee.total
                                ? <NumberFormat 
                                value={unionFee.total}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=' VNĐ'
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>13</Typography>
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
                            { book && book.total
                                ? <NumberFormat 
                                value={book.total}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=' sổ'
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>10</Typography>
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
                            { book && book.total
                                ? <NumberFormat 
                                value={book.total}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=' sổ'
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                />
                                : <Typography className={styles.cardHeading}>3</Typography>
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