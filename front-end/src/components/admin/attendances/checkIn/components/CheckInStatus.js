// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './CheckInStatus.module.scss';
// Material UI ============================================================= //
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const CheckInStatus = (props) => {
  const { status, error } = props;

  return (
    <div className={styles.CheckInStatus}>
      {
        status === 'ready' && 
            <div className={clsx(styles.StatusBox, styles.Ready)}>
                <CheckIcon className={styles.Icon} color='success' />
                <p className={styles.Message}>Sẵn sàng điểm danh</p> 
            </div>
      }
      {
        status === 'checking' &&
            <div className={clsx(styles.StatusBox, styles.Waiting)}>
                <MoreHorizIcon className={styles.Icon} color='primary' />
                <p className={styles.Message}>Đang điểm danh</p> 
            </div>
      }
      {
        status === 'error' && 
            <div className={clsx(styles.StatusBox, styles.Error)}>
                <CloseIcon className={styles.Icon} color='error' />
                <p className={styles.Message}>{error}</p> 
            </div>
      }
    </div>
  )
}

export default CheckInStatus