// Node Modules ============================================================ //
import React, { useState } from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from './GeneralInformation.module.scss';
// Constants =============================================================== //
import { CLASS_STATUS } from 'helpers/constants/class';
// APIs ==================================================================== //
import { updateClass } from 'apis/class';
// Material UI ============================================================= //
import {     
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,  
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// My Components =========================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';

// =========================|| GENERAL INFORMATION ||======================= //
const GeneralInformation = (props) => {
    const { data, faculties, loading } = props;

    const [updating, setUpdating] = useState(false);

    const initialValues = {
        name: data?.tenLop,
        major: data?.nganhHoc,
        faculty: data?.donVi,
        status: data?.hienThi,
        id: data?._id
    }

    const validateData = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Tên chi đoàn không được để trống';
        }
        if (!values.faculty || !values.faculty._id) {
            errors.faculty = 'Khoa không được để trống';
        }
        if (!values.major) {
            errors.major = 'Ngành học không được để trống';
        }

        return errors;
    }

    const handleSubmit = async (values) => {
        const data = {};
        data._id = values.id;
        data.tenLop = values.name;
        data.nganhHoc = values.major;
        data.donVi = values.faculty;
        data.hienThi = values.status;

        setUpdating(true);

        try {
            const res = await updateClass(data);

            if (res.data.status === 'success') {

            }
        } catch (error) {
            console.error("error: ", error.response.data.message);
        } finally {
            setUpdating(false);
        }
    }

    if (loading)
        return <CircularLoading />

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validate={values => validateData(values)}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => { 
                handleSubmit(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form className={styles.Form} onSubmit={handleSubmit}>
                    <TextField 
                        name='name'
                        className={clsx('text-field', styles.TextField)}
                        variant="filled"
                        label="Tên chi đoàn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name || ''}
                        error={errors.name}
                        helperText={errors.name}
                    />
                    <FormControl 
                        fullWidth 
                        variant='filled'
                        className={clsx('text-field', styles.TextField)}                                     
                        error={errors.faculty}
                    >
                        <InputLabel id="faculty-group">Khoa</InputLabel>
                        <Select
                            name='faculty._id'
                            labelId="faculty-group"
                            id="input-faculty"
                            value={values?.faculty?._id || undefined}
                            label="Khoa"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            {[
                                { _id: undefined, tenDonVi: 'Chọn khoa'}, 
                                ...faculties
                            ].map((f) => (
                                <MenuItem key={f._id} value={f._id}>{f.tenDonVi}</MenuItem>
                            ))}
                        </Select>
                        {errors.faculty && <FormHelperText>{errors.faculty}</FormHelperText>}
                    </FormControl>
                    <TextField 
                        name='major'
                        className={clsx('text-field', styles.TextField)}
                        variant="filled"
                        label="Ngành học"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.major || ''}
                        error={errors.major}
                        helperText={errors.major}
                    />
                    <FormControl 
                        fullWidth 
                        variant='filled'
                        className={clsx('text-field', styles.TextField)}                                     
                        error={errors.status}
                    >
                        <InputLabel id="status-group">Trạng thái</InputLabel>
                        <Select
                            name='status'
                            labelId="status-group"
                            id="input-status"
                            value={values?.status || false}
                            label="Trạng thái"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            {CLASS_STATUS.map(i =>
                                <MenuItem key={i.value} value={i.value}>{i.display}</MenuItem>
                            )}
                        </Select>
                        {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                    </FormControl>
                    <div className={styles.Actions}>
                        <LoadingButton
                            type='submit'
                            variant='contained'
                            className={clsx('button', styles.Button)}
                            loading={updating}
                        >
                            Lưu lại
                        </LoadingButton>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default GeneralInformation