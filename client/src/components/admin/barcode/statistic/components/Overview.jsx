// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
// Styles ================================================================== //
import styles from '../BarcodeStatisticPage.module.scss';
// Material UI ============================================================= //
import {
  Grid,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// Components ============================================================== //
import MainCard from 'components/common/cards/MainCard';
import SkeletonEarningCard from 'components/common/cards/Skeleton/EarningCard';

// =============================|| OVERVIEW ||============================== //
const Overview = ({ loading, data }) => {
  const total = data.filter(i => i.name === 'Tổng tiền đã thu')[0];
  const doanPhi = data.filter(i => i.name === 'Đoàn phí')[0];
  const truyThuDoanPhi = data.filter(i => i.name === 'Truy thu Đoàn phí')[0];
  const soDoan = data.filter(i => i.name === 'Sổ đoàn viên')[0];
  const cttn = data.filter(
    i => i.name === 'Kinh phí đóng góp công trình thanh niên'
  )[0];
  const theHV = data.filter(
    i => i.name === 'Kinh phí làm thẻ Hội viên hội sinh viên Việt Nam'
  )[0];

  if (loading) {
    return (
      <Grid className={styles.Results} container>
        <Grid item xs={3}>
          <SkeletonEarningCard />
        </Grid>
        <Grid item xs={3}>
          <SkeletonEarningCard />
        </Grid>
        <Grid item xs={3}>
          <SkeletonEarningCard />
        </Grid>
        <Grid item xs={3}>
          <SkeletonEarningCard />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid className={styles.Overview} container>
      <Grid item lg={3} sm={6} xs={12}>
        <MainCard
          border={false}
          className={clsx(styles.Card, styles.PurpleCard)}
          contentClass={styles.Content}
        >
          <Grid container direction="column">
            <Grid item>
              <Avatar variant="rounded" className={styles.Avatar}>
                <MonetizationOnIcon className={styles.CardIcon} />
              </Avatar>
            </Grid>
            <Grid item className={styles.Total}>
              <NumberFormat
                value={total?.total || 0}
                className={styles.cardHeading}
                displayType={'text'}
                thousandSeparator={true}
                suffix=" VNĐ"
                renderText={(value, props) => (
                  <Typography {...props}>{value}</Typography>
                )}
              />
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={styles.subHeading}>
                Tổng tiền đã thu
              </Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <MainCard
          border={false}
          className={clsx(styles.Card, styles.BlueCard)}
          contentClass={styles.Content}
        >
          <Grid container direction="column">
            <Grid item>
              <Avatar variant="rounded" className={styles.Avatar}>
                <AccountCircleIcon className={styles.CardIcon} />
              </Avatar>
            </Grid>
            <Grid item className={styles.Total}>
              <NumberFormat
                value={doanPhi?.total || 0}
                className={styles.cardHeading}
                displayType={'text'}
                thousandSeparator={true}
                suffix=" VNĐ"
                renderText={(value, props) => (
                  <Typography {...props}>{value}</Typography>
                )}
              />
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={styles.subHeading}>Đoàn phí</Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <MainCard
          border={false}
          className={clsx(styles.Card, styles.GreenCard)}
          contentClass={styles.Content}
        >
          <Grid container direction="column">
            <Grid item>
              <Avatar variant="rounded" className={styles.Avatar}>
                <LibraryBooksIcon className={styles.CardIcon} />
              </Avatar>
            </Grid>
            <Grid item className={styles.Total}>
              <NumberFormat
                value={soDoan?.total || 0}
                className={styles.cardHeading}
                displayType={'text'}
                thousandSeparator={true}
                suffix=" sổ"
                renderText={(value, props) => (
                  <Typography {...props}>{value}</Typography>
                )}
              />
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={styles.subHeading}>Sổ đoàn</Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <div className={styles.ColItems}>
          <MainCard
            sx={{ mb: '4px' }}
            className={styles.SmallCard}
            contentClass={styles.SmallContent}
          >
            <List className={styles.Padding}>
              <ListItem
                alignItems="center"
                disableGutters
                className={styles.Padding}
              >
                <ListItemAvatar>
                  <Avatar variant="rounded" className={styles.Avatar}>
                    <LocalAtmIcon
                      className={styles.CardIcon}
                      fontSize="inherit"
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={styles.Padding}
                  primary={
                    <NumberFormat
                      value={truyThuDoanPhi?.total || 0}
                      variant="h4"
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=" VNĐ"
                      renderText={(value, props) => (
                        <Typography {...props}>{value}</Typography>
                      )}
                    />
                  }
                  secondary={
                    <Typography
                      variant="subtitle2"
                      className={styles.Secondary}
                    >
                      Truy thu đoàn phí
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </MainCard>
          <MainCard
            sx={{ mt: '4px', mb: '4px' }}
            className={styles.SmallCard}
            contentClass={styles.SmallContent}
          >
            <List className={styles.Padding}>
              <ListItem
                alignItems="center"
                disableGutters
                className={styles.Padding}
              >
                <ListItemAvatar>
                  <Avatar variant="rounded" className={styles.Avatar}>
                    <LocalAtmIcon
                      className={styles.CardIcon}
                      fontSize="inherit"
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={styles.Padding}
                  primary={
                    <NumberFormat
                      value={cttn?.total || 0}
                      variant="h4"
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=" VNĐ"
                      renderText={(value, props) => (
                        <Typography {...props}>{value}</Typography>
                      )}
                    />
                  }
                  secondary={
                    <Typography
                      variant="subtitle2"
                      className={styles.Secondary}
                    >
                      Công trình thanh niên
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </MainCard>
          <MainCard
            sx={{ mt: '4px' }}
            className={styles.SmallCard}
            contentClass={styles.SmallContent}
          >
            <List className={styles.Padding}>
              <ListItem
                alignItems="center"
                disableGutters
                className={styles.Padding}
              >
                <ListItemAvatar>
                  <Avatar variant="rounded" className={styles.Avatar}>
                    <LocalAtmIcon
                      className={styles.CardIcon}
                      fontSize="inherit"
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={styles.Padding}
                  primary={
                    <NumberFormat
                      value={theHV?.total || 0}
                      variant="h4"
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=" VNĐ"
                      renderText={(value, props) => (
                        <Typography {...props}>{value}</Typography>
                      )}
                    />
                  }
                  secondary={
                    <Typography
                      variant="subtitle2"
                      className={styles.Secondary}
                    >
                      Phí làm thẻ hội viên
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </MainCard>
        </div>
      </Grid>
    </Grid>
  );
};

export default Overview;
