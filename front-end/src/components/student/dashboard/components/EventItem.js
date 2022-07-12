// Node Modules ============================================================ //
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
// Styles ================================================================== //
import styles from './EventItem.module.scss';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';
// Constants =============================================================== //
const dateFormat = 'DD/MM/YYYY';
// Material UI ============================================================= //
import { Box, Button, Typography } from '@mui/material';

// =============================|| EVENT ITEM ||============================ //
const EventItem = (props) => {
  const { event, onClick } = props;

  const navigate = useNavigate();

  const [src, setSrc] = useState(event.anhBia);
  const [imgError, setImgError] = useState(false);

  const onError = () => {
    if (!imgError) {
        setImgError(true);
        setSrc(fallbackSrc);
    }
  };

  return (
    <Box className={styles.Item}>
        <Box className={styles.ImageWrapper}>
            <img
                className={styles.Image}
                src={src || fallbackSrc}
                onError={onError}
            />
        </Box>
        <Box className={styles.ContentWrapper}>
            <Typography 
                variant='h3' 
                component='h3'
                className={styles.Title}
            >
                {ReactHtmlParser(event.tenHoatDong)}
            </Typography>
            <Box className={styles.Details}>
                <Box className={styles.Record}>
                    <div>
                        <b>Diễn ra: </b>{}
                        {`${moment(event.thoiGianToChuc.thoiGianBatDau).format(dateFormat)}
                         - 
                        ${moment(event.thoiGianToChuc.thoiGianKetThuc).format(dateFormat)}`}
                    </div>
                </Box>
            </Box>
        </Box>
        <Box className={styles.ButtonWrapper}>
            <Button 
                className={clsx('button', styles.CheckInButton)}
                onClick={onClick}
            >
                Chi tiết
            </Button>
        </Box>
    </Box>
  )
}

export default EventItem