// Node Modules ============================================================ //
import React from 'react'
// Styles ================================================================== //
import styles from './ConfirmationModal.module.scss';
// Material UI ============================================================= //
import {
    Box, 
    Button,
    Modal,
    Typography
} from '@mui/material';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';

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
                {title && <Typography variant="h5" component="h2">
                    {title}
                </Typography>}
                <GppMaybeOutlinedIcon className={styles.Icon} />
                <Typography className={styles.Message}>
                    {message}
                </Typography>
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