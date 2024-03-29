// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
// Styles ================================================================== //
import styles from './BaseModal.module.scss';
// Assets ================================================================== //
import logo from 'assets/images/logo-hcmute-small.png';
// Material UI ============================================================= //
import {
    Box, 
    IconButton,
    Modal,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// ============================|| BASE MODAL ||============================= //
const BaseModal = (props) => {
    const { children, visible, title, onClose } = props;

    const [open, setOpen] = useState(visible);

    useEffect(() => {
        setOpen(visible);
    }, [visible]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            open={open}
            disableAutoFocus={true}
            onClose={onClose}
        >
            <Box className={styles.Modal}>
                <div className={styles.Header}>
                    <IconButton className={styles.Close} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={styles.Logo}>
                        <img src={logo} alt="logo-hcmute" />
                    </div>
                    <div className={styles.Name}>
                        <h5>{title}</h5>
                    </div>
                </div>
                <div className={styles.Divider} />
                <div className={styles.Body}>{children}</div>
            </Box>
        </Modal>
    )
}

export default BaseModal