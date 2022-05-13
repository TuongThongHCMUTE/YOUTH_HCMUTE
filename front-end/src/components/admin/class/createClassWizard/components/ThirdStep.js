// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from '../index.module.scss';
// APIs ==================================================================== //
import { getFacultyById } from 'apis/faculty';
import { createClass } from 'apis/class';
// Material UI ============================================================= //
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
// My components =========================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';

// ===========================|| THIRD STEP ||============================== //
const ThirdStep = (props) => {
    const { studentClass, onClose, onRetry, onRefetch } = props;

    const [facultyName, setFacultyName] = useState('');
    const [creating, setCreating] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessange] = useState('');

    useEffect(async () => {
        try {
            const res = await getFacultyById(studentClass.faculty?._id);
            if (res.data.status === 'success') {
                setFacultyName(res.data.data.faculty.tenDonVi);
            } else {
                setFacultyName('');
            }
        } catch (err) {
            setFacultyName('');
        }
    }, [])

    useEffect(() => {
        handleCreate();
    }, [])

    const handleCreate = async () => {
        setCreating(true);
        setSuccess(false);

        try {
            const res = await createClass(studentClass);
            if (res.data.status === 'success') {
                setSuccess(true);
                onRefetch();
            } else {
                setSuccess(false);
            }
        } catch (err) {
            setErrorMessange(err.response.data.message)
            setSuccess(false);
        } finally {
            setCreating(false);
        }
    }

    const findName = (position) => {
        const index = studentClass.managers.findIndex(i => i.chucVu === position);

        if (index === -1) {
            return '';
        } else {
            return studentClass.managers[index].hoTen;
        }
    }

    return (
        <div className={styles.ThirdStep}>
            { creating ?
                <CircularLoading /> :
                <>{   success ?
                    <>
                        <div className={styles.Header}>
                            <CheckIcon className={styles.Icon} />
                            <h3>Bạn đã thêm thành công một chi đoàn mới!</h3>
                        </div>
                        <div className={styles.Body}>
                            <h5 className={styles.Title}>Thông tin chi đoàn</h5>
                            <div className={styles.Record}>
                                <div className={styles.Field}>Tên chi đoàn</div>
                                <div className={styles.Value}>{studentClass.name}</div>
                            </div>
                            <div className={styles.Record}>
                                <div className={styles.Field}>Đơn vị:</div>
                                <div className={styles.Value}>{facultyName}</div>
                            </div>
                            <div className={styles.Record}>
                                <div className={styles.Field}>Ngành học:</div>
                                <div className={styles.Value}>{studentClass.major}</div>
                            </div>
                            <div className={styles.Record}>
                                <div className={styles.Field}>Bí thư:</div>
                                <div className={styles.Value}>{findName('BI_THU')}</div>
                            </div>
                            <div className={styles.Record}>
                                <div className={styles.Field}>Phó bí thư:</div>
                                <div className={styles.Value}>{findName('PHO_BI_THU')}</div>
                            </div>
                        </div>
                        <div className={styles.Footer}>
                            <div className={styles.Divider} />
                            <div className={styles.Actions}>
                                <Button className='button' onClick={() => onClose()}>Thoát</Button>
                            </div>
                        </div>
                    </> : 
                    <>
                        <div className={clsx(styles.Header, styles.ErrorHeader)}>
                            <CloseIcon className={styles.Icon} />
                            <h3>Đã xảy ra lỗi. Vui lòng thử lại!</h3>
                        </div>
                        <div className={styles.Body}>
                            <h5 className={styles.Title}>Chi tiết</h5>
                            <p className={styles.ErrorMessage}>{errorMessage}</p>
                        </div>
                        <div className={styles.Footer}>
                            <div className={styles.Divider} />
                            <div className={styles.Actions}>
                                <Button 
                                    className='button' 
                                    onClick={() => {
                                        setErrorMessange('');
                                        onRetry();
                                    }}
                                >
                                    Thử lại
                                </Button>
                            </div>
                        </div>
                    </>
                }</>
            }
        </div>
    )
}

export default ThirdStep