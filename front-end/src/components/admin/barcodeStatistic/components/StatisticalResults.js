// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
// Styles ================================================================== //
import styles from './StatisticalResults.module.scss';
// Material UI ============================================================= //
import { Grid, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// Components ============================================================== //
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// ========================|| STATISTICAL RESULTS ||======================== //
const StatisticalResults = (props) => {
    const { loading, data } = props;

    const total = data.filter(i => i.name === 'Tổng tiền đã thu')[0];
    const unionFee = data.filter(i => i.name === 'Đoàn phí')[0];
    const additionalFee = data.filter(i => i.name === 'Truy thu Đoàn phí')[0];
    const book = data.filter(i => i.name === 'Sổ đoàn viên')[0];
    const constructionFee = data.filter(i => i.name === 'Kinh phí đóng góp công trình thanh niên')[0];
    const cardFee = data.filter(i => i.name === 'Kinh phí làm thẻ Hội viên hội sinh viên Việt Nam')[0];

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
                                <MonetizationOnIcon className={styles.CardIcon} />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <NumberFormat 
                                value={total ? total.total : 'N/A'}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=' VNĐ'
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                            /> 
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={styles.subHeading}>Tổng tiền đã thu</Typography>
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
                        <Grid item>
                            <NumberFormat 
                                value={unionFee ? unionFee.total : 'N/A'}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=' VNĐ'
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                            /> 
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={styles.subHeading}>Đoàn phí</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={3}>
                <MainCard  border={false} className={clsx(styles.Card, styles.GreenCard)} contentClass={styles.Content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Avatar variant="rounded" className={styles.Avatar}>
                                <LibraryBooksIcon className={styles.CardIcon} />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <NumberFormat 
                                value={book ? book.total : 'N/A'}
                                className={styles.cardHeading}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=' sổ'
                                renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                            />
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={styles.subHeading}>Sổ đoàn</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={3}>
                <div className={styles.ColItems}>
                    <MainCard sx={{ mb: '4px' }} className={styles.SmallCard} contentClass={styles.SmallContent}>
                        <List className={styles.Padding}>
                            <ListItem alignItems="center" disableGutters className={styles.Padding}>
                                <ListItemAvatar>
                                    <Avatar variant="rounded" className={styles.Avatar}>
                                        <LocalAtmIcon className={styles.CardIcon} fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    className={styles.Padding}
                                    primary={
                                        <NumberFormat 
                                            value={additionalFee ? additionalFee.total : 'N/A'}
                                            variant="h4"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix=' VNĐ'
                                            renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                        />
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" className={styles.Secondary}>
                                            Truy thu đoàn phí
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </MainCard>
                    <MainCard sx={{ mt: '4px', mb: '4px' }} className={styles.SmallCard} contentClass={styles.SmallContent}>
                        <List className={styles.Padding}>
                            <ListItem alignItems="center" disableGutters className={styles.Padding}>
                                <ListItemAvatar>
                                    <Avatar variant="rounded" className={styles.Avatar}>
                                        <LocalAtmIcon className={styles.CardIcon} fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    className={styles.Padding}
                                    primary={
                                        <NumberFormat 
                                            value={constructionFee ? constructionFee.total : 'N/A'}
                                            variant="h4"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix=' VNĐ'
                                            renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                        />
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" className={styles.Secondary}>
                                            Công trình thanh niên
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </MainCard>
                    <MainCard sx={{ mt: '4px' }} className={styles.SmallCard} contentClass={styles.SmallContent}>
                        <List className={styles.Padding}>
                            <ListItem alignItems="center" disableGutters className={styles.Padding}>
                                <ListItemAvatar>
                                    <Avatar variant="rounded" className={styles.Avatar}>
                                        <LocalAtmIcon className={styles.CardIcon} fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    className={styles.Padding}
                                    primary={
                                        <NumberFormat 
                                            value={cardFee ? cardFee.total : 'N/A'}
                                            variant="h4"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix=' VNĐ'
                                            renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                        />
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" className={styles.Secondary}>
                                            Phí làm thẻ hội viên
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </MainCard>
                </div>
            </Grid>
        </Grid>
    )
}

export default StatisticalResults