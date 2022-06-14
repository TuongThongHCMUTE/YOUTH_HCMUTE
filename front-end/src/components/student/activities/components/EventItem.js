// Node Modules ============================================================ //
import React, { useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import moment from 'moment';
// Styles ================================================================== //
import styles from './EventItem.module.scss';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';
// Constants =============================================================== //
const dateFormat = 'DD/MM/YYYY';
// Material UI ============================================================= //
import { Box, Typography } from '@mui/material';
import Tag from 'components/common/tag';
import LinearProgressBarWithLabel from 'components/common/progress/LinearProgressBarWithLabel';

// =============================|| EVENT ITEM ||============================ //
const EventItem = (props) => {
  const { event } = props;

  const [src, setSrc] = useState(event.anhBia);
  const [imgError, setImgError] = useState(false);

  const onError = () => {
    if (!imgError) {
        setImgError(true);
        setSrc(fallbackSrc);
    }
  }

  return (
    <Box className={styles.Item}>
        <Box className={styles.ImageWrapper}>
            <img
                className={styles.Image}
                src={src}
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
            <Typography 
                variant='p' 
                component='p'
                className={styles.Description}
            >
                {ReactHtmlParser(event.moTa)}
            </Typography>
            <Box className={styles.Tags}>
                {event.tieuChi.length > 0 && event.tieuChi.map(i => (
                    <Tag className={styles.Tag} tag={{ id: i.maTieuChi, description: i.tenTieuChi }} />
                ))}
            </Box>
            <Box className={styles.Details}>
                <Box className={styles.Record}>
                    <div>
                        <b>Đăng ký: </b> 
                        {`${moment(event.thoiGianDangKy.thoiGianBatDau).format(dateFormat)}
                         - 
                        ${moment(event.thoiGianDangKy.thoiGianKetThuc).format(dateFormat)}`}
                    </div>
                    <div>
                        <b>Diễn ra: </b>{}
                        {`${moment(event.thoiGianToChuc.thoiGianBatDau).format(dateFormat)}
                         - 
                        ${moment(event.thoiGianToChuc.thoiGianKetThuc).format(dateFormat)}`}
                    </div>
                </Box>
                <Box className={styles.Record}>
                    <div>
                        <b>Địa điểm: </b>{event.diaDiem}
                    </div>
                </Box>
                <Box className={styles.Record}>
                    <div>
                        <b>Quyền lợi: </b>{event.quenLoiThamGia}
                    </div>
                </Box>
                <Box className={styles.Record}>
                    <div>
                        <b>Sinh viên đăng ký: </b>{}
                    </div>
                </Box>
                <Box className={styles.ProgressBar}>
                    <LinearProgressBarWithLabel 
                        value={event.soLuongSinhVienDangKy} 
                        maxValue={event.soLuongSinhVien} 
                    />
                </Box>    
            </Box>
        </Box>
    </Box>
  )
}

export default EventItem