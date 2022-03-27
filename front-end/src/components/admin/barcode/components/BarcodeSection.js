// Node Modules ============================================================ //
import React, { useRef } from 'react'
import Barcode from 'react-barcode'
import { useReactToPrint } from 'react-to-print'

// Styles ================================================================== //
import styles from './BarcodeSection.module.css';

// Material UI ============================================================= //
import {  Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

// ==========================|| BARCODE SECTION ||========================== //
const BarcodeSection = (props) => {
    const { data } = props;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={styles.BarcodeSection}>
            <div></div>
            <div className={styles.Barcode}>
                <Barcode
                    ref={componentRef}
                    value={(data && data.maSoSV) ? data.maSoSV : '' } 
                />
                <Button 
                  className='button'
                  variant='contained'
                  endIcon={<PrintIcon />}
                  onClick={handlePrint}
                >
                  IN BARCODE
                </Button>
            </div>
        </div>
    )
}

export default BarcodeSection