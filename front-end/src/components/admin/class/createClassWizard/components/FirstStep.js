// Node Modules ============================================================ //
import React from 'react'
import clsx from 'clsx';
import { Formik } from 'formik';
// Styles ================================================================== //
import styles from '../index.module.scss';
// Material UI ============================================================= //
import { 
    Box, 
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField, 
} from '@mui/material'
import EastIcon from '@mui/icons-material/East';
// Assets ================================================================== //

import background from 'assets/images/work-1.jpg'

// ============================|| FIRST STEP ||============================= //
const FirstStep = (props) => {
    const { initialValues, faculties, studentClass, setStudentClass, setStep } = props;

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

    return (
        <div className={styles.FirstStep}>
            <Box className={styles.Left}>
                <h3 className={styles.Step}>Bước 1: Thông tin chi đoàn</h3>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validate={values => validateData(values)}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => { 
                        setStudentClass({...studentClass, ...values});
                        setStep(1); 
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
                            <Button
                                type='submit'
                                variant='contained'
                                className={clsx('button', styles.Button)}
                                endIcon={<EastIcon />}
                            >
                                Tiếp theo
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
            <Box className={styles.Right}>
                <img src={background} alt='image' className={styles.Background} />
            </Box>
        </div>
  )
}

export default FirstStep