import React, { useState } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './UploadModal.module.scss';
// APIs ==================================================================== //
import { importBillsFromFile } from 'apis/studentBill';
// Material UI ============================================================= //
import { 
    Button,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
// My components =========================================================== //
import BaseModal from 'components/common/modal/base/BaseModal';
import SnackBar from 'components/common/alert/Snackbar';
import CircularLoading from 'components/common/loading/CircularLoading';
import ImportDataTable from './ImportDataTable';
import ImportErrorsTable from './ImportErrorsTable';

const UploadModal = (props) => {
    const { open, onClose, onRefetch } = props;

    const [alert, setAlert] = useState(null);
    const [errors, setErrors] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [importedData, setImportedDate] = useState([]);

    const handleSubmitFile = async () => {
        try {
            setUploading(true);
            const res = await importBillsFromFile(file);
            if (res.data.status === success) {
                setImportedDate(res.data.data.importData);
                setFile(null);
                setAlert({
                    severity: 'success',
                    message: res.data.message || 'Upload file thành công'
                });
            };
        } catch (e) {
            if (e.response?.data?.errors) {
                setErrors(e.response?.data?.errors);
            } else {
                setAlert({
                    severity: 'error',
                    message: e.response?.data?.message || 'Đã xảy ra lỗi'
                });
            }
        } finally {
            setUploading(false)
        }
    };

    return (
        <BaseModal
            visible={open}
            title={"Upload danh sách đóng đoàn phí"}
            onClose={() => {
                setErrors([]);
                setAlert(null);
                onRefetch();
                onClose();
            }}
        >
            <div className={styles.ContentWrapper}>
                <Typography className={styles.Guide} variant='h3' component='h3'>Tải danh sách theo mẫu để cập nhật thông tin đoàn phí</Typography>
                <div className={styles.ButtonsWrapper}>
                    <Button
                        className={clsx('button', styles.DownloadButton)}
                        endIcon={<DownloadIcon />}
                    >
                        Tải file mẫu
                    </Button>
                    <label htmlFor="contained-button-upload">
                        <input 
                            className={styles.UploadInput} 
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                            id="contained-button-upload" 
                            type="file" 
                            onChange={e => {
                                setImportedDate([]);
                                setErrors([]);
                                setAlert(null);
                                setFile(e.target.files[0])
                            }}
                        />
                        <Button
                            className={clsx('button', styles.UploadButton)}
                            component="span"
                            endIcon={<UploadIcon />}
                        >
                            Upload danh sách
                        </Button>
                    </label>
                </div>
                {file &&
                    <div className={styles.FileWrapper}>
                        <div className={styles.File}>
                            <p>{file.name}</p>
                            <IconButton 
                                className={styles.IconButton}
                                size="small" 
                                onClick={() => setFile(null)}
                            >
                                <CloseIcon fontSize="inherit" color="error"/>
                            </IconButton>
                        </div>
                        <LoadingButton
                            className={clsx('button', styles.SubmitButton)}
                            loading={uploading}
                            onClick={handleSubmitFile}
                        >
                            Gửi file
                        </LoadingButton>
                    </div>
                }
                <div className={styles.TableWrapper}>
                    <Typography className={styles.Title} variant="h2" component="h2">Kết quả</Typography>
                    <div 
                        className={clsx({
                            [styles.Table]: true,
                            [styles.DataTable]: importedData.length > 0,
                            [styles.ErrorTable]: errors.length > 0
                        })}
                    >
                        {
                            importedData.length > 0 && 
                            <ImportDataTable data={importedData} />
                        }
                        {
                            errors.length > 0 && 
                            <ImportErrorsTable data={errors} />
                        }
                        { alert && 
                            <SnackBar 
                                message={alert.message}
                                severity={alert.severity}
                                onClose={() => setAlert(null)}
                            />
                        }
                    </div>
                </div>
            </div>
        </BaseModal>
    )
}

export default UploadModal