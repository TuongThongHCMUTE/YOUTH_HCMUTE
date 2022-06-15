// Node Modules ============================================================ //
import React, { useState, useRef, useEffect } from 'react'
// Styles ================================================================== //
import styles from './WriteComment.module.scss';
// Material UI ============================================================= //
import { Avatar, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// ===========================|| WRITE COMMENT ||=========================== //
const WriteComment = (props) => {
    const { user, onSubmit } = props;

    const [message, setMessage] = useState('');

    const inputCommentRef = useRef(null);

    useEffect(() => {
        inputCommentRef?.current?.scrollIntoView({ behavior: "smooth"});
    }, [])

    const onKeyDownHandler = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
    }

    return (
        <>
            <div className={styles["write-comment"]}>
                <div className={styles.avatar}>
                    <Avatar sx={{ height: '50px', width: '50px'}} src={user?.image} alt='user-avt' />
                </div>
                <form 
                    ref={inputCommentRef}
                    className={styles.comment} 
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (message) {
                            onSubmit(message);
                            setMessage('');
                        }
                    }}
                >
                    <textarea 
                        className={styles.content} 
                        name='content'
                        id='content'
                        value = {message}
                        onChange = {e => setMessage(e.target.value)}
                        onKeyDown = {onKeyDownHandler}
                        rows = '1'
                        placeholder="Viết bình luận..." />
                    <IconButton
                        type='submit'
                        className={styles.send} 
                        aria-label="send"
                        color="primary"
                    >
                        <SendIcon />
                    </IconButton>
                </form>
            </div>
        </>
    )
}

export default WriteComment