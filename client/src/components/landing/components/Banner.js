// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Banner.module.scss';
// Assets ================================================================== //
import banner from 'assets/images/banner/banner.jpg'

// ==============================|| HEADER ||=============================== //
const Banner = () => {
  return (
    <div className={styles.Banner} >
      <img src={banner} alt="banner" className={styles.Image} />
    </div>
  )
}

export default Banner