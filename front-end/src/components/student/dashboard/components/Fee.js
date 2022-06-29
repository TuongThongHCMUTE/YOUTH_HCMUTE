import React from 'react';
import styles from './Fee.module.scss';
import { Typography, Grid } from '@material-ui/core';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

const Fee = (props) => {
    const { dongDoanPhi, nopSoDoan, loading } = props;
    return (
        <div className={styles.Fee}>
            { loading ? 
                <Grid className={styles.LoadingList} container>
                    <Grid item xs={6} p={1}>
                        <SkeletonEarningCard />
                    </Grid>
                    <Grid item xs={6} p={1}>
                        <SkeletonEarningCard />
                    </Grid>
                </Grid> :
                <>
                    <div className={styles.Left}>
                        <div className={styles.Status}>
                            <Typography className={styles.Title} variant='h6' component='h6'>Tình trạng sổ đoàn</Typography>
                            <Typography className={styles.Value} variant='h3' component='h3'>{nopSoDoan ? 'Đã nộp' : 'Chưa nộp'}</Typography>
                        </div>
                        {nopSoDoan ? <CheckCircleTwoToneIcon className={styles.Icon} /> : <CancelTwoToneIcon className={styles.Icon} />}
                    </div>
                    <div className={styles.Right}>
                        <div className={styles.Status}>
                            <Typography className={styles.Title} variant='h6' component='h6'>Tình trạng đoàn phí</Typography>
                            <Typography className={styles.Value} variant='h3' component='h3'>{dongDoanPhi ? 'Đã đóng' : 'Chưa đóng'}</Typography>
                        </div>
                        {dongDoanPhi ? <CheckCircleTwoToneIcon className={styles.Icon} /> : <CancelTwoToneIcon className={styles.Icon} />}
                    </div>
                </>
            }
        </div>
    )
}

export default Fee