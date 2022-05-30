// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Contact.module.scss';
// Assets ================================================================== //
import logo from 'assets/images/logo-medium.png';
import { 
  BsFacebook, 
  BsMessenger,
  BsLinkedin,
  BsTwitter,
  BsGlobe 
} from 'react-icons/bs'
// Material UI ============================================================= //
import { Grid } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallIcon from '@mui/icons-material/Call';

// ==============================|| CONTACT ||============================== //
const Contact = () => {
  return (
    <div id="contact">
      <div className={styles.Divider} />
      <Grid container className={styles.Contact}>
        <Grid item xs={10} className={styles.Content}>
          <div className={styles.Column}>
            <div className={styles.Name}>
              <h1>YOUTH HCMUTE</h1>
              <h5>Đoàn Thanh niên - Hội Sinh viên trường ĐH Sư phạm Kỹ thuật TP. HCM</h5>
            </div>
            <a className={styles.Logo} href="/">
              <img href="logo" src={logo} />
            </a>
          </div>
          <div className={styles.Column}>
            <h3 className={styles.Title}>Thông tin liên hệ</h3>
            <ul className={styles.Contacts}>
              <li className={styles.ContactItem}>
                <div className={styles.IconBackGround}>
                  <PlaceIcon className={styles.Icon} />
                </div>
                <div className={styles.Info}>
                  <b>Địa chỉ: </b>
                  Số 1 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức. TP. Hồ Chí Minh
                </div>
              </li>
              <li className={styles.ContactItem}>
                <div className={styles.IconBackGround}>
                  <EmailOutlinedIcon className={styles.Icon} />
                </div>
                <div className={styles.Info}>
                  <b>Email Đoàn Thanh niên: </b>
                  doantruong@hcmute.edu.vn
                </div>
              </li>
              <li className={styles.ContactItem}>
                <div className={styles.IconBackGround}>
                  <EmailOutlinedIcon className={styles.Icon} />
                </div>
                <div className={styles.Info}>
                  <b>Email Hội Sinh viên: </b>
                  hoisinhvien@hcmute.edu.vn
                </div>
              </li>
              <li className={styles.ContactItem}>
                <div className={styles.IconBackGround}>
                  <CallIcon className={styles.Icon} />
                </div>
                <div className={styles.Info}>
                  <b>Số điện thoại: </b>
                  08 3897 3871
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.Column}>
            <h3 className={styles.Title}>Trang thông tin của chúng tôi</h3>
            <ul className={styles.Networks}>
              <li className={styles.NetworkItem}>
                <a><BsFacebook className={styles.Icon} /></a>
              </li>
              <li className={styles.NetworkItem}>
                <a><BsMessenger className={styles.Icon} /></a>
              </li>
              <li className={styles.NetworkItem}>
                <a><BsLinkedin className={styles.Icon} /></a>
              </li>
              <li className={styles.NetworkItem}>
                <a><BsTwitter className={styles.Icon} /></a>
              </li>
              <li className={styles.NetworkItem}>
                <a><BsGlobe className={styles.Icon} /></a>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Contact