// Node Modules ============================================================ //
import React, { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

// Styles ================================================================== //
import styles from './ReceiptModal.module.css';

// Material UI ============================================================= //
import { Backdrop, Box, Button, Modal } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

// ===========================|| RECEIPT MODAL ||=========================== //
const ReceiptModal = ({ openModal, onClose }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <Modal
                className={styles.Modal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={onClose}
                // BackdropComponent={Backdrop}
                // BackdropProps={{
                //     timeout: 500,
                // }}
            >
                <>
                    <div className={styles.Header}>
                        <Button onClick={handlePrint}>Print</Button>
                        <Button onClick={onClose}>Close</Button>
                    </div>
                    <div className={styles.Content} ref={componentRef}>Content</div>
                </>
            </Modal>
        </div>
    )
}

export default ReceiptModal