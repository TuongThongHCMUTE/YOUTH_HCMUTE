// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'

// Styles ================================================================== //
import styles from './ReceiptModal.module.css';

// Material UI ============================================================= //
import { Backdrop, Box, Button, Modal } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

// ===========================|| RECEIPT MODAL ||=========================== //
const ReceiptModal = ({ openModal, onClose }) => {
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
                    <div className={styles.Header}>Header</div>
                    <div className={styles.Content}>Content</div>
                </>
            </Modal>
        </div>
    )
}

export default ReceiptModal