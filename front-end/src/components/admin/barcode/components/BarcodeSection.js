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
            <div className={styles.PrintRectangle} ref={componentRef}>
                <ul className={styles.Infomation}>
                    <li className={styles.Item}>
                        <p>Họ tên: </p>
                        <p><b>{data ? `${data.ho} ${data.ten}` : ''}</b></p>
                    </li>
                    <li className={styles.Item}>
                        <p>Lớp: </p>
                        <p><b>{data && data.lopSV ? data.lopSV.tenLop : ''}</b></p>
                    </li>
                    <li className={styles.Item}>
                        <p>Khoa: </p>
                        <p><b>{data && data.donVi ? data.donVi.tenDonVi : ''}</b></p>
                    </li>
                </ul>
                <Barcode
                    className={styles.BarcodeToPrint} 
                    value={(data && data.maSoSV) ? data.maSoSV : '' } 
                /> 
            </div>
            <div className={styles.Barcode}>
                <Barcode
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