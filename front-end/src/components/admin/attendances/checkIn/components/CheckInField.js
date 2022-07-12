// Node Modules ============================================================ //
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './CheckInField.module.scss';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';
// Material UI ============================================================= //
import { Button, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

// ===========================|| CHECK IN FIELD ||========================== //
const CheckInField = (props) => {
    const { 
        event, 
        isCheckIn, 
        onCheckIn, 
        studentId, 
        error,
        setStudentId,
        setStatus,
        setError,
    } = props;
    
    const [src, setSrc] = useState(null);
    const [imgError, setImgError] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        setSrc(event?.anhBia)
    }, [event]);

    const onError = () => {
        if (!imgError) {
            setImgError(true);
            setSrc(null);
        }
    };

    return (
        <div className={styles.CheckInField}>
            <div className={styles.ImageWrapper}>
                <img
                    className={styles.Image}
                    src={src || fallbackSrc}
                    onError={onError}
                />
            </div>
            <div className={styles.ContentWrapper}>
                <Typography 
                    variant='h3' 
                    component='h3'
                    className={styles.Title}
                >
                    {event?.tenHoatDong}
                </Typography>
                <div className={styles.CheckIn}>
                    <Typography
                        variant='h5'
                        component='h5'
                        className={styles.CheckInText}
                    >
                        {isCheckIn ? 'Điểm danh vào:' : 'Điểm danh ra:'}
                    </Typography>
                    <div className={styles.CheckInInput}>
                        <TextField
                            inputRef={inputRef}
                            className={styles.Input}
                            variant='outlined'
                            size='medium'
                            placeholder='Nhập mã số sinh viên...'
                            value={studentId}
                            onChange={e => {
                                if (error) {
                                    setError('');
                                    setStatus('ready');
                                };
                                setStudentId(e.target.value)}
                            }
                            onKeyPress={(e) => { 
                                if(e.key === "Enter") {
                                    onCheckIn(studentId);
                                }
                            }}
                        />
                        <Button 
                            variant="contained"
                            className={clsx({
                                ["button"]: true, 
                                [styles.Button]: true,
                                [styles.CheckInButton]: isCheckIn,
                                [styles.CheckOutButton]: !isCheckIn,
                            })}
                            onClick={() => {
                                onCheckIn(studentId);
                                inputRef.current.focus();
                            }}
                        >
                            { isCheckIn ?
                                <LoginIcon /> :
                                <LogoutIcon />
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckInField