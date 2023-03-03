/* eslint-disable jsx-a11y/anchor-is-valid */
// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Contact.module.scss';
// Assets ================================================================== //
import logo from 'assets/images/logo-medium.png';
// Helpers ================================================================= //
import { CONTACT_INFO, SOCIAL_NETWORKS } from 'helpers/landing';
// Material UI ============================================================= //
import { Grid } from '@mui/material';

// ==============================|| CONTACT ||============================== //
const Contact = () => {
  const pageNameComp = (
    <React.Fragment>
      <div className={styles.Name}>
        <h1>YOUTH HCMUTE</h1>
        <h5>
          Đoàn Thanh niên - Hội Sinh viên trường ĐH Sư phạm Kỹ thuật TP.
          HCM
        </h5>
      </div>
      <a className={styles.Logo} href="/">
        <img href="logo" alt="logo" src={logo} />
      </a>
    </React.Fragment>
  );

  const contactInfoComp = (
    <React.Fragment>
      <h3 className={styles.Title}>Thông tin liên hệ</h3>
      <ul className={styles.Contacts}>
        {CONTACT_INFO.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.id} className={styles.ContactItem}>
              <div className={styles.IconBackGround}>
                <Icon className={styles.Icon} />
              </div>
              <div className={styles.Info}>
                <b>{item.label}</b>
                {item.value}
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );

  const socialNetworksComp = (
    <React.Fragment>
      <h3 className={styles.Title}>Trang thông tin của chúng tôi</h3>
      <ul className={styles.Networks}>
        {SOCIAL_NETWORKS.map(network => {
          const Icon = network.icon;
          return (
            <li key={network.id} className={styles.NetworkItem}>
              <a>
                <Icon className={styles.Icon} />
              </a>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );

  return (
    <div id="contact">
      <div className={styles.Divider} />
      <Grid container className={styles.Contact}>
        <Grid item xs={10} className={styles.Content}>
          <div className={styles.Column}>{pageNameComp}</div>
          <div className={styles.Column}>{contactInfoComp}</div>
          <div className={styles.Column}>{socialNetworksComp}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Contact);
