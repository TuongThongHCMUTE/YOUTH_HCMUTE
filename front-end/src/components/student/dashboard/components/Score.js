import React, { useState } from 'react';
import styles from './Score.module.scss';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Typography, IconButton } from '@material-ui/core';
import { TitleCard } from 'components/common/card';
import EventDetailsModal from 'components/student/activities/components/EventDetailsModal';
import CircularLoading from 'components/common/loading/CircularLoading';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EastIcon from '@mui/icons-material/East';

const Scores = (props) => {
  const { diemCTXH, diemRenLuyen, loading } = props;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const hoatDongRenLuyen = diemRenLuyen?.events;
  const hoatDongCTXH = diemCTXH?.events;

  return (
    <div className={styles.Scores}>
      { loading ? <SkeletonEarningCard /> : 
        <>
          <div className={styles.Summary}>
            <div className={styles.SummaryItem}>
              <EventNoteIcon className={styles.Icon} />
              <div className={styles.Score}>
                <Typography className={styles.Value} variant='h3' component='h3'>{diemRenLuyen?.tongDiem || 0}</Typography>
                <Typography className={styles.Name} variant='p' component='p'>Điểm rèn luyện</Typography>
              </div>
            </div>
            <div className={styles.SummaryItem}>
              <EventNoteIcon className={styles.Icon} />
              <div className={styles.Score}>
                <Typography className={styles.Value} variant='h3' component='h3'>{diemCTXH?.tongDiem || 0}</Typography>
                <Typography className={styles.Name} variant='p' component='p'>Điểm CTXH</Typography>
              </div>
            </div>
          </div>
          {diemCTXH?.tongDiem < 40 ? 
            <p className={styles.Message}>Bạn còn thiếu <b>{40 - diemCTXH?.tongDiem} điểm CTXH</b> để đạt chuẩn đầu ra</p> : 
            <p className={styles.SuccessMessage}>Bạn đã đủ điểm CTXH để đạt chuẩn đầu ra</p>
          }
        </>
      }
      <div className={styles.List}>
        <TitleCard headerPadding="8px 16px" padding="0" title="Hoạt động cộng điểm rèn luyện">
          { loading ? <CircularLoading /> : 
            <div className={styles.Events}>
              { hoatDongRenLuyen?.length > 0 ? 
                hoatDongRenLuyen.map(event => 
                  <div className={styles.EventItem}>
                    <Typography variant='h6' component='h6'>{event.tenHoatDong}</Typography>
                    <IconButton
                      color="success"
                      onClick={() => {
                        setSelected(event._id);
                        setOpen(true)
                      }}
                    >
                      <EastIcon />
                    </IconButton>
                  </div>
                ) : <p className={styles.NoEvents}>Hiện không có hoạt động phù hợp</p>
              }
            </div>}
        </TitleCard>
      </div>
      <div className={styles.List}>
        <TitleCard headerPadding="8px 16px" padding="0" title="Hoạt động cộng điểm CTXH">
          { loading ? <CircularLoading /> : 
            <div className={styles.Events}>
              { hoatDongCTXH?.length > 0 ? 
                hoatDongCTXH.map(event => 
                  <div className={styles.EventItem}>
                    <Typography variant='h6' component='h6'>{event.tenHoatDong}</Typography>
                    <IconButton
                      color="success"
                      onClick={() => {
                        setSelected(event._id);
                        setOpen(true)
                      }}
                    >
                      <EastIcon />
                    </IconButton>
                  </div>
                ) : <p className={styles.NoEvents}>Hiện không có hoạt động phù hợp</p>}
            </div>}
        </TitleCard>
      </div>
      <EventDetailsModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        id={selected}
      />
    </div>
  )
}

export default Scores