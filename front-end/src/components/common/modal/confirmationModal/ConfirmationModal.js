// Node Modules ============================================================ //
import React from 'react'
// Styles ================================================================== //
import styles from './ConfirmationModal.module.scss';
// Material UI ============================================================= //
import {
    Box, 
    Button,
    IconButton,
    Modal,
    Typography
} from '@mui/material';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import CloseIcon from '@mui/icons-material/Close';

// ========================|| CONFIRMATION MODAL ||========================= //
const ConfirmationModal = (props) => {
    const { title, message, visible, onConfirm, onCancel } = props;

    return (
        <Modal
            open={visible}
            onClose={onCancel}
            hideBackdrop={true}
        >
            <Box className={styles.Modal}>
                <div className={styles.Header}>
                    <IconButton className={styles.Close} onClick={onCancel}>
                        <CloseIcon />
                    </IconButton>
                    <h3>{title || "Confirmation"}</h3>
                    {/* <div className={styles.Divider} /> */}
                </div>
                <GppMaybeOutlinedIcon className={styles.Icon} />
                <Typography className={styles.Message}>
                    {message}
                </Typography>
                <div className={styles.Divider} />
                <Box className={styles.Actions}>
                    <Button 
                        variant='oulined' 
                        className={styles.Cancel} 
                        onClick={onCancel}
                    >
                        Trở lại
                    </Button>
                    <Button 
                        variant='contained' 
                        className={styles.Confirm} 
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ConfirmationModal