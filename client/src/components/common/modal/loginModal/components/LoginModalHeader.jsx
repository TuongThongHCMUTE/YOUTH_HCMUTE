// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from '../LoginModal.module.scss';
// Assets ================================================================== //
import logo from 'assets/images/logo-hcmute-small.png';
// Material UI ============================================================= //
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// =======================|| LOGIN MODAL HEADER ||========================== //
const LoginModalHeader = props => {
  return (
    <React.Fragment>
      <div className={styles.Header}>
        <IconButton className={styles.Close} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
        <div className={styles.Logo}>
          <img src={logo} alt="logo-hcmute" />
        </div>
        <div className={styles.Name}>
          <h3>TRƯỜNG ĐẠI HỌC</h3>
          <h2>
            <u>SƯ PHẠM KỸ THUẬT TP. HỒ CHÍ MINH</u>
          </h2>
          <h5>HCMC University of Technology and Education</h5>
        </div>
      </div>
      <div className={styles.Divider} />
    </React.Fragment>
  )
}

export default React.memo(LoginModalHeader);