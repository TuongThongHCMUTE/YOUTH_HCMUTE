import React, { useState, useEffect } from 'react';

import styles from '../index.module.scss';
import { getFacultyById } from 'apis/faculty';
// APIs ==================================================================== //
import { createClass } from 'apis/class';

import CheckIcon from '@mui/icons-material/Check';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ThirdStep = (props) => {
    const { studentClass, onClose, onRefetch } = props;

    const [facultyName, setFacultyName] = useState('');
    const [creating, setCreating] = useState(false);
    const [success, setSuccess] = useState(false);

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
                setCreating(false);
                setSuccess(true);
                onRefetch();
            } else {
                // log error
                setCreating(false);
                setSuccess(false);
            }
        } catch (err) {
            alert(err);
            console.log(err)
            setCreating(false);
            setSuccess(false);
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
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> :
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
                </>
            }
        </div>
    )
}

export default ThirdStep