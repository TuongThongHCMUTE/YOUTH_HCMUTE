// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './Introduction.module.scss';
// Material UI ============================================================= //
import { Button, Grid } from '@mui/material';
// Assets ================================================================== //
import image from 'assets/images/hero-img.png';
// Constants =============================================================== //
import {
  LANDING_PAGE_INTRODUCTION,
  LANDING_PAGE_FEATURE
} from 'helpers/landing';

// ============================|| INTRODUCTION ||=========================== //
const Introduction = () => {
  const pageIntroduction = (
    <React.Fragment>
      <div className={styles.Info}>
        <h1>{LANDING_PAGE_INTRODUCTION.header}</h1>
        <h3>{LANDING_PAGE_INTRODUCTION.subHeader}</h3>
        <p>{LANDING_PAGE_INTRODUCTION.description}</p>
        <div className={styles.ButtonWrapper}>
          <Button className={styles.OutlinedButton}>Khám phá ngay</Button>
        </div>
      </div>
      <div className={styles.ImageContainer}>
        <img className={styles.Image} src={image} alt="" />
      </div>
    </React.Fragment>
  );

  const pageFeatures = (
    <React.Fragment>
      <div className={styles.Title}>
        <h2>{LANDING_PAGE_FEATURE.header}</h2>
        <p>{LANDING_PAGE_FEATURE.quote}</p>
      </div>
      <ul className={styles.Items}>
        {LANDING_PAGE_FEATURE.features.map(feature => {
          const Icon = feature.icon;
          return (
            <li key={feature.id}>
              <div className={styles.Item}>
                <div className={styles.IconWrapper}>
                  <Icon className={styles.Icon} />
                </div>
                <h3>{feature.name}</h3>
                <p>{feature.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );

  return (
    <div id="introduction">
      <Grid container className={styles.Introduction}>
        <Grid item xs={10} className={styles.Content}>
          {pageIntroduction}
        </Grid>
      </Grid>
      <Grid id="feature" container className={styles.FeatureSection}>
        <Grid item xs={10} className={styles.Features}>
          {pageFeatures}
        </Grid>
      </Grid>
    </div>
  );
};

export default Introduction;
