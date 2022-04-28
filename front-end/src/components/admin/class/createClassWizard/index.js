// Node Modules ============================================================ //
import React, { useState } from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// Material UI ============================================================= //
import { 
    Box, 
    IconButton, 
    Modal,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
// Assets ================================================================== //
import logo from 'assets/images/union-logo.png'
// My Components =========================================================== //
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';

// ========================|| CREATE CLASS WIZARD ||======================== //
const CreateClassWizard = (props) => {
    const { faculties, onRefetch, onClose, visible } = props;

    const initialValues = {
        name: '',
        faculty: '',
        major: '',
        managers: []
    };

    const [studentClass, setStudentClass] = useState(initialValues);
    const [step, setStep] = useState(0);

    const handleClose = () => {
        setStudentClass(initialValues);
        setStep(0);
        onClose();
    }

    const firstStep = (
        <FirstStep 
            initialValues={studentClass}
            faculties={faculties}
            studentClass={studentClass}
            setStudentClass={setStudentClass}
            setStep={setStep}
        />
    );

    const secondStep = (
        <SecondStep
            studentClass={studentClass}
            setStudentClass={setStudentClass}
            setStep={setStep}
        />
    )

    const thirdStep = (
        <ThirdStep
            studentClass={studentClass}
            onClose={handleClose}
            onRefetch={onRefetch}
        />
    )

    const bodyComponents = [firstStep, secondStep, thirdStep];

    return (
        <Modal
            open={visible}
        >
            <Box className={styles.Modal}>
                <Box className={styles.Header}>
                    <Box className={styles.HeaderTitle}>
                        <img src={logo} alt='logo' className={styles.Logo} />
                        <h3 className={styles.Title}>Thêm mới chi đoàn</h3>
                    </Box>
                    <IconButton onClick={handleClose} className={styles.Close}>
                        <CloseIcon />
                    </IconButton>
                    <div className={styles.Divider} />
                </Box>
                <Box className={styles.Body}>
                    {bodyComponents[step]}
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateClassWizard