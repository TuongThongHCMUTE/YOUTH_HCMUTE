// Node Modules ============================================================ //
import React from 'react';

// Styles ================================================================== //
import styles from './index.scss';

// Material UI ============================================================= //
import { Box, Grid } from '@mui/material';

// ==============================|| BARCODE ||============================== //
const BarcodePage = () => {
    const abc = '';

    return (
        <Grid container className={styles.BarcodePage}>
            <Grid xs={12} item>
                Title
            </Grid>
            <Grid xs={12} item>
                Barcode
            </Grid>
            <Grid xs={12} item>
                Form
            </Grid>
        </Grid>
    );
};

export default BarcodePage;
