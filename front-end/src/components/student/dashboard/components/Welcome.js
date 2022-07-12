import React from 'react'
import styles from './Welcome.module.scss';
// Helpers ================================================================= //
import { stringAvatar } from 'helpers/avatar';
import { Avatar, Typography } from '@mui/material';

const Welcome = ({ user }) => {
    return (
        <div className={styles.Welcome}>
            <Avatar className={styles.Avatar} src={user?.image} {...stringAvatar(user?.ho + ' ' + user?.ten)} />
            { user && <Typography className={styles.Message} variant='h3' component='h3'>{`Xin chào ${user.ho} ${user.ten}!`}</Typography> }
        </div>
    )
}

export default Welcome