// Node Modules ============================================================ //
import React from 'react';

// Styles ================================================================== //
import styles from './BillForm.module.css';

// Material UI ============================================================= //
import { 
    Grid, 
    TextField, 
    FormGroup, 
    FormControlLabel, 
    Checkbox, 
    Button 
} from '@mui/material';

// =============================|| BILL FORM ||============================= //
const BillForm = () => {
  return (
    <div className={styles.BillForm}>
        <div className={styles.Detail}>
            <h3 className={styles.BillTitle}><u>Chi tiết hóa đơn</u></h3>
            <ol className={styles.Items}>
                <li className={styles.Item}>
                    <p>1. Đoàn phí (12 tháng)</p>
                    <p><b>24.000đ</b></p>
                </li>
                <li>
                    <p>2. Truy thu đoàn phí (0 tháng)</p>
                    <p><b>0đ</b></p>
                </li>
                <li>
                    <p>3. Kinh phí đóng góp xây dựng công trình thanh niên</p>
                    <p><b>24.000đ</b></p>
                </li>
                <li>
                    <p>4. Phí làm thẻ hội viên Hội Sinh viên Việt Nam</p>
                    <p><b>2.000đ</b></p>
                </li>
                <li>
                    <p>5. Sổ đoàn</p>
                    <p><b>0đ</b></p>
                </li>
            </ol>
            <div className={styles.Total}>
                <p>Tổng cộng: </p>
                <p>50.000đ</p>
            </div>
        </div>
        <div className={styles.CheckOut}>
            <Button 
                variant='contained'
                className='button'
            >
                XUẤT HÓA ĐƠN
            </Button>
        </div>
        <div className={styles.Line} />
        <div className={styles.BillOptions}>
            <h3 className={styles.OptionTitle}>Đoàn phí</h3>
            <Grid 
                container
                className={styles.Fields}
            >
                <Grid item xs={4} sx={{ p: 1 }}>
                    <TextField 
                        className='text-field'
                        variant="filled"
                        label="Từ tháng"
                    />
                </Grid>
                <Grid item xs={4} sx={{ p: 1 }}>
                    <TextField 
                        className='text-field'
                        variant="filled"
                        label="Đến tháng"
                    />
                </Grid>
                <Grid item xs={4} sx={{ p: 1 }}>
                    <TextField 
                        className='text-field'
                        variant="filled"
                        label="Truy thu"
                    />
                </Grid>
            </Grid>
            <h3 className={styles.OptionTitle}>Các mục khác</h3>
            <FormGroup className={styles.CheckBoxes}>
                <FormControlLabel 
                    control={<Checkbox defaultChecked />} 
                    label="Nộp sổ đoàn" 
                />
                <FormControlLabel 
                    control={<Checkbox defaultChecked />} 
                    label="Kinh phí đóng góp xây dựng công trình thanh niên" 
                />
                <FormControlLabel 
                    control={<Checkbox defaultChecked />} 
                    label="Chi phí làm thẻ hội viên Hội Sinh viên Việt Nam " 
                />
            </FormGroup>
        </div>
    </div>
  )
}

export default BillForm