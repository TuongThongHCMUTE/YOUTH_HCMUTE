// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Introduction.module.scss';
// Material UI ============================================================= //
import { Button, Grid } from '@mui/material';
import FitScreenOutlinedIcon from '@mui/icons-material/FitScreenOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
// Assets ================================================================== //
import image from 'assets/images/hero-img.png';

// ============================|| INTRODUCTION ||=========================== //
const Introduction = () => {
  return (
    <div id="introduction">
      <Grid container className={styles.Introduction}>
        <Grid item xs={10} className={styles.Content}>
          <div className={styles.Info}>
            <h1>TRANG THÔNG TIN QUẢN LÝ ĐOÀN VIÊN</h1>
            <h3>Trường Đại học Sư phạm Kỹ Thuật TP. Hồ Chí Minh</h3>
            <p>Website cung cấp các công cụ tiện ích hỗ trợ Đoàn trường, Đoàn khoa quản lý thông tin, hồ sơ đoàn vụ của sinh viên trường Đại học Sư phạm Kỹ thuật thành phố Hồ Chí Minh. Đồng thời website có thể theo dõi thông tin về việc nộp sổ đoàn, nhận xét trong quá trình sinh hoạt Đoàn tại trường và đóng Đoàn phí.</p>
            <div className={styles.ButtonWrapper}>
              <Button className={styles.OutlinedButton}>Khám phá ngay</Button>
            </div>
          </div>
          <div className={styles.ImageContainer}>
            <img className={styles.Image} src={image} alt='' />
          </div>
        </Grid>
      </Grid>  
      <Grid id="feature" container className={styles.FeatureSection}>
        <Grid item xs={10} className={styles.Features}>
          <div className={styles.Title}>
            <h2>Chức năng chính</h2>
            <p>Cung cấp các tính năng hỗ trợ quản lý thông tin đoàn viên, hồ sơ, đoàn vụ</p>
          </div>
          <div className={styles.Items}>
            <div className={styles.Item}>
              <div className={styles.IconWrapper}>
                <FitScreenOutlinedIcon className={styles.Icon} />
              </div>
              <h3>Thu sổ đoàn</h3>
              <p>Nhập mô tả</p>
            </div>
            <div className={styles.Item}>
              <div className={styles.IconWrapper}>
                <SearchOutlinedIcon className={styles.Icon} />
              </div>
              <h3>Tra cứu thông tin đoàn viên</h3>
              <p>Nhập mô tả</p>
            </div>
            <div className={styles.Item}>
              <div className={styles.IconWrapper}>
                <DriveFileRenameOutlineOutlinedIcon className={styles.Icon} />
              </div>
              <h3>Phê sổ đoàn trực tuyến</h3>
              <p>Nhập mô tả</p>
            </div>
            <div className={styles.Item}>
              <div className={styles.IconWrapper}>
                <GetAppOutlinedIcon className={styles.Icon} />
              </div>
              <h3>Đăng ký rút sổ đoàn</h3>
              <p>Nhập mô tả</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Introduction;