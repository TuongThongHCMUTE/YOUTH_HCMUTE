// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './ResetPasswordModal.module.scss';
// Material UI ============================================================= //
import {
    Box, 
    IconButton,
    Modal,
    TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

// =======================|| RESET PASSWORD MODAL ||======================== //
const ResetPasswordModal = (props) => {
    const [open, setOpen] = useState(props.visible);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setOpen(props.visible);
    }, [props.visible]);

    const handleClose = () => {
        props.onClose();
    };

    const handleSubmit = () => {
        if (password.length < 6) {
            setError('Mật khẩu ít nhất 6 ký tự!');
            return;
        }
        props.onSubmit(password);
    };

    return (
        <Modal
            open={open}
            disableAutoFocus={true}
        >
            <Box className={styles.Modal}>
                <div className={styles.Header}>
                    <IconButton className={styles.Close} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={styles.Name}>
                        <h5>CẤP LẠI MẬT KHẨU</h5>
                    </div>
                </div>
                <div className={styles.Divider} />
                <div className={styles.Body}>
                    <div className={styles.Content}>
                        <TextField 
                            name='password'
                            type='password'
                            className='text-field'
                            variant="outlined"
                            label="Mật khẩu mới"
                            value={password}
                            error={error}
                            helperText={error}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <LoadingButton
                            className={clsx("button", styles.Button)}
                            loading={props.loading}
                            onClick={() => handleSubmit()}
                        >
                            Lưu lại
                        </LoadingButton>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ResetPasswordModal