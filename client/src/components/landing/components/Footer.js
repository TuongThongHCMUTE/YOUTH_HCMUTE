// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Footer.module.scss';
// Material UI ============================================================= //
import { Grid } from '@mui/material';

// ==============================|| FOOTER ||=============================== //
const Footer = () => {
  return (
    <div id="footer">
      <Grid container className={styles.Footer}>
        <Grid item xs={10} className={styles.Content}>
          <div>
            © Copyright <b>Youth HCMUTE</b>. All Rights Reserved
          </div>
          <div>
            Designed by <b>Youth HCMUTE</b>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
