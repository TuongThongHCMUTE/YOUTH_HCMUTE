import React, { useState } from 'react'
// My components =========================================================== //
import BaseModal from 'components/common/modal/base/BaseModal';
import SnackBar from 'components/common/alert/Snackbar';
import CircularLoading from 'components/common/loading/CircularLoading';

const UploadModal = (props) => {
    const { open, onClose, onRefetch } = props;

    const [alert, setAlert] = useState(null);
    const [errors, setErrors] = useState(null);
    const [uploading, setUploading] = useState(false);

    return (
        <BaseModal
            visible={open}
            title={"Upload danh sách đóng đoàn phí"}
            onClose={() => {
                setErrors(null);
                setAlert(null);
                onRefetch();
                onClose();
            }}
        >
        </BaseModal>
    )
}

export default UploadModal