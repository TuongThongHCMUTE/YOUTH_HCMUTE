// Node Modules ============================================================ //
import React, { useState, useEffect, useContext } from 'react'
// Styles ================================================================== //
import styles from './index.module.scss';
// APIs ==================================================================== //
import { getComments, createOneComment } from 'apis/comment';
// Context ================================================================= //
import AppContext from 'store/AppContext';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/constants/user';
// Material UI ============================================================= //
import { Typography } from '@mui/material';
// Components ============================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';
import Comment from './Comment';
import WriteComment from './WriteComment';

// ==============================|| COMMENTS ||============================= //
const Comments = (props) => {
    const { eventId } = props;

    const { state } = useContext(AppContext);
    const { user } = state;

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCommentsOfEvent = async (id) => {
        try {
            setLoading(true);
            const res = await getComments({ hoatDong: id });
            if (res.data.status === 'success') {
                setComments(res.data.data.comments);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (eventId) {
            getCommentsOfEvent(eventId);
        }
    }, [eventId]);

    const isOwnComment = (comment) => {
        let senderId;

        if (comment.sinhVien) {
            senderId = comment.sinhVien._id;
        } else if (comment.quanLy) {
            senderId = comment.quanLy._id;
        }

        return user._id === senderId;
    }

    if (loading) {
        return <CircularLoading />
    }

    const postComment = async (message) => {
        const data = {
            noiDung: message,
            hoatDong: eventId,
        };

        if (user.role === USER_ROLES.DOAN_VIEN) {
            data.sinhVien = {
                _id: user._id,
                image: user.image,
                ho: user.ho,
                ten: user.ten,
            }
        } else {
            data.quanLy = {
                _id: user._id,
                image: user.image,
                tenHienThi: user.tenHienThi,
            }
        }

        const res = await createOneComment(data);
        if (res.data.status === 'success') {
            setComments(prev => [...prev, res.data.data.comment]);
        }
    }

    return (
        <div className={styles.Comments}>
            <WriteComment
                user={user}
                onSubmit={(message) => postComment(message)}
            />
            { comments.length > 0 ?
                <>
                    { comments.map(comment => (
                        <Comment 
                            comment={comment}
                            own={isOwnComment(comment)}
                        />
                    ))}
                </> :
                <Typography 
                    variant='p' 
                    component='p' 
                    className={styles.NoComments}
                >
                    Chưa có bình luận
                </Typography>
            }
        </div>
    )
}

export default Comments