// Node Modules ============================================================ //
import React from 'react'
import Barcode from 'react-barcode'

// Styles ================================================================== //
import styles from './BarcodeSection.module.css';

// Material UI ============================================================= //
import {  Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

// ==========================|| BARCODE SECTION ||========================== //
const BarcodeSection = (props) => {
    const { data } = props;

    return (
        <div className={styles.BarcodeSection}>
            <div></div>
            <div className={styles.Barcode}>
                <Barcode
                    value={(data && data.maSoSV) ? data.maSoSV : '' } 
                />
                <Button 
                  className='button'
                  variant='contained'
                  endIcon={<PrintIcon />}
                >
                  IN BARCODE
                </Button>
            </div>
        </div>
    )
}

export default BarcodeSection