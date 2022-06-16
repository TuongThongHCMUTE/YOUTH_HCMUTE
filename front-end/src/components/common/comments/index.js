// Node Modules ============================================================ //
import React, { useState, useEffect, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    const getCommentsOfEvent = async (id) => {
        try {
            setLoading(true);
            const res = await getComments({ hoatDong: id, limit: limit });
            if (res.data.status === 'success') {
                setComments(res.data.data.comments);
                setTotalRecords(res.data.all);
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
    }, [eventId, limit]);

    const isOwnComment = (comment) => {
        let senderId;

        if (comment.sinhVien) {
            senderId = comment.sinhVien._id;
        } else if (comment.quanLy) {
            senderId = comment.quanLy._id;
        }

        return user._id === senderId;
    }

    const postComment = async (message) => {
        const data = {
            noiDung: message,
            hoatDong: eventId,
        };

        if (user.role === USER_ROLES.DOAN_VIEN) {
            data.sinhVien = user._id;
        } else {
            data.quanLy = user._id;
        }

        const res = await createOneComment(data);
        if (res.data.status === 'success') {
            setComments(prev => [res.data.data.comment, ...prev]);
        }
    };

    if (loading && comments.length <= 0) {
        return <CircularLoading />
    };

    return (
        <div className={styles.Comments}>
            <WriteComment
                user={user}
                onSubmit={(message) => postComment(message)}
            />
            { comments.length > 0 ?
                <InfiniteScroll
                    dataLength={comments.length}
                    next={() => setLimit(prev => prev + 10)}
                    hasMore={comments.length < totalRecords}
                    loader={<CircularLoading />}
                    scrollableTarget="infinite-scroll-target"
                >
                    { comments.map(comment => (
                        <Comment
                            key={comment._id} 
                            comment={comment}
                            own={isOwnComment(comment)}
                        />
                    ))}
                </InfiniteScroll> :
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