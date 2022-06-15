// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import TimeAgo from 'react-timeago';
import vietnameseStrings from 'react-timeago/lib/language-strings/vi';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
// Styles ================================================================== //
import styles from './Comment.module.scss';
// Helpers ================================================================= //
import { stringAvatar } from 'helpers/avatar';
// Material UI ============================================================= //
import { Avatar, Typography } from '@mui/material';

// ==============================|| COMMENTS ||============================= //
const Comment = (props) => {
    const { comment, own } = props;

    const name = comment?.sinhVien
    ? comment?.sinhVien?.ho + ' ' + comment?.sinhVien?.ten
    : comment?.quanLy?.tenHienThi;

    const image = comment?.sinhVien 
    ? comment?.sinhVien?.image
    : comment?.quanLy?.quanLy;

    const formatter = buildFormatter(vietnameseStrings);

    return (
        <div className={clsx({
            [styles.Comment]: true,
            [styles.CommentOwn]: own
        })}>
            <div className={styles.CommentTop}>
                <Avatar className={styles.Avatar} src={image} {...stringAvatar(name)} />
                <div className={styles.Message}>
                    <Typography variant='h6' component='h6'>{name}</Typography>
                    <Typography variant='p' component='p'>{comment?.noiDung}</Typography>
                </div>
            </div>
            <div className={styles.CommentBottom}>
                <TimeAgo date={moment(comment.createdAt)} formatter={formatter} />
            </div>
        </div>
    )
}

export default Comment