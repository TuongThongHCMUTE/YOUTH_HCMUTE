// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
// Styles ================================================================== //
import styles from './BillForm.module.css';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/constants/user';
// APIs ==================================================================== //
import { createOneBill, updateOneBill } from 'apis/bill';
// Material UI ============================================================= //
import { 
    Grid, 
    TextField, 
    FormGroup, 
    FormControlLabel, 
    Checkbox, 
    Button,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
// import { LocalizationProvider, DatePicker} from '@mui/lab';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// My components =========================================================== //
import { ConfirmationModal } from 'components/common/modal';

// =============================|| BILL FORM ||============================= //
const BillForm = (props) => {
    const { onCheckOut, newBill, user } = props;

    const [bill, setBill] = useState(props.bill);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Update state whenever bill prop changes
    useEffect(() => {
        setBill(props.bill);
    }, [props.bill])

    // Các khoản phí: đoàn phí, truy thu, sổ đoàn, công trình thanh niên, thẻ hội viên
    const fees = bill?.cacKhoanPhi;

    // Đoàn phí
    const unionFeeIndex = fees.findIndex(f => f.tenChiPhi === 'Đoàn phí');
    const feeStartDate = 
        unionFeeIndex !== -1 && fees[unionFeeIndex].ngayBatDau 
        ? moment(fees[unionFeeIndex].ngayBatDau) 
        : moment();
    const feeEndDate = 
        unionFeeIndex !== -1 && fees[unionFeeIndex].ngayKetThuc 
        ? moment(fees[unionFeeIndex].ngayKetThuc) 
        : moment();

    // Truy thu đoàn phí
    const additionalFeeIndex = fees.findIndex(f => f.tenChiPhi === 'Truy thu Đoàn phí');

    // Các khoản phí khác
    const soDoanIndex = fees.findIndex(f => f.tenChiPhi === 'Sổ đoàn viên');
    const cttnIndex = fees.findIndex(f => f.tenChiPhi === 'Kinh phí đóng góp công trình thanh niên');
    const theHVIdex = fees.findIndex(f => f.tenChiPhi === 'Kinh phí làm thẻ Hội viên hội sinh viên Việt Nam');

    const calculateTotalPrice = (fees) => {
        const total = fees.reduce((sum, i) => sum + i.thanhTien, 0);
        return total;
    }

    // This function is triggered when user makes an update on bill
    // Some actions: change start/end date, fill number, check/uncheck option
    const handleChange = (field, value, index) => {
        if (index === -1) {
            return;
        }

        // Get fee by the index
        const fee = fees[index];

        // if field is start date or end date: update field and re-calculate numbers of days
        if (field === 'ngayBatDau' || field === 'ngayKetThuc') {
            fee[field] = value;
            const count = moment(fee.ngayKetThuc).diff(moment(fee.ngayBatDau), 'months');
            fee.soLuong = count;
        }
        // if field is additional fee (Truy thu đoàn phí): update field with the value of input 
        else if (field === 'additionalFee') {
            fee.soLuong = value;
        }
        // if user chooses the option 'Sổ đoàn' or 'Thẻ hội viên' => the value is 1
        // otherwise, the value is 0
        else if (field === 'so-doan' || field === 'the-hoi-vien') {
            fee.soLuong = value ? 1 : 0;
        }
        // if user chooses the option 'Công trình thanh niên' => the value is 12
        // otherwise, the value is 0 
        else if (field === 'cong-trinh-thanh-nien') {
            fee.soLuong = value ? 12 : 0;
        }

        // Calculate cost of the updated item
        fee.thanhTien = fee.soLuong * fee.donGia;
        fees[index] = fee;

        // Update bill state
        setBill(prev => ({
            ...prev,
            cacKhoanPhi: fees,
            tongTien: calculateTotalPrice(fees),
        }));
    }

    // This function is triggered when user confirm to checkout
    const handleCheckOut = async () => {
        try {
            // If the bill has not created yet => create new bill
            // Otherwise => update base on existing bill
            const res = newBill ? await createOneBill(bill) : await updateOneBill(bill);

            // If create/update success => trigger onCheckout funtion
            // This function update parent component's bill state and open receipt modal 
            if(res.data.status === 'success') {
                onCheckOut(res.data.data.bill);
            }
        } catch(err) {
            alert(err);
        }
    }

    // Update status of bill
    const generateStatus = () => {
        if (bill.trangThai === false && newBill === false) return (<p>Chưa thanh toán</p>);
        if (bill.trangThai === true && newBill === false) return (<p>Đã thanh toán vào lúc {moment(bill.ngayThanhToan).format('HH:mm [ngày] DD/MM/YYYY')}</p>);
        if (newBill === true) return (<p>Chưa xuất hóa đơn</p>)
    }

    return (
        <div className={styles.BillForm}>
            <div className={styles.Detail}>
                <h3 className={styles.BillTitle}><u>Chi tiết hóa đơn</u></h3>
                <ul className={styles.Items}>
                    {bill?.cacKhoanPhi.map(i => (
                        <li key={i.thuTu} className={styles.Item}>
                            <p>{i.thuTu}. {i.tenChiPhi} ({i.soLuong} {i.donViTinh})</p>
                            <p><b>{i.thanhTien}đ</b></p>
                        </li>
                    ))}
                </ul>
                <div className={styles.Total}>
                    <p>Tổng cộng: </p>
                    <p>{bill?.tongTien}đ</p>
                </div>
            </div>
            <ConfirmationModal
                visible={showConfirmation}
                message="Bạn chắc chắn thanh toán hóa đơn này? Thao tác sẽ cập nhật lại thông tin hóa đơn của sinh viên trên hệ thống"
                onConfirm={() => handleCheckOut().then(setShowConfirmation(false))}
                onCancel={() => setShowConfirmation(false)}
            />
            <div className={styles.CheckOut}>
                <Button 
                    variant='contained'
                    className='button'
                    onClick={() => setShowConfirmation(true)}
                    disabled={user?.role === USER_ROLES.CONG_TAC_VIEN}
                >
                    XUẤT HÓA ĐƠN
                </Button>
                {generateStatus()}
            </div>
            <div className={styles.Line} />
            <div className={styles.BillOptions}>
                <h3 className={styles.OptionTitle}>Đoàn phí</h3>
                <LocalizationProvider locale='vi' dateAdapter={AdapterMoment}>
                    <Grid 
                        container
                        className={styles.Fields}
                    >
                        <Grid item xs={4} sx={{ p: 1 }}>
                            <DatePicker
                                views={['year', 'month', 'day']}
                                inputFormat="DD/MM/yyyy"
                                label="Từ tháng"
                                value={feeStartDate}
                                onChange={(newValue) => {
                                    handleChange('ngayBatDau', newValue, unionFeeIndex);
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        className='text-field' 
                                        helperText={null} 
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ p: 1 }}>
                            <DatePicker
                                views={['year', 'month', 'day']}
                                inputFormat="DD/MM/yyyy"
                                label="Đến tháng"
                                value={feeEndDate}
                                onChange={(newValue) => {
                                    handleChange('ngayKetThuc', newValue, unionFeeIndex);
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        className='text-field' 
                                        helperText={null} 
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ p: 1 }}>
                            <TextField 
                                className='text-field'
                                label="Truy thu"
                                type='number'
                                inputProps={{ min: "0", step: "1" }}
                                value={additionalFeeIndex !== -1 ? fees[additionalFeeIndex].soLuong : 0 }
                                onChange={e => handleChange('additionalFee', e.target.value, additionalFeeIndex)}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                <h3 className={styles.OptionTitle}>Các mục khác</h3>
                <FormGroup className={styles.CheckBoxes}>
                    <FormControlLabel 
                        control={
                            <Checkbox  
                                checked={fees[soDoanIndex].soLuong === 1}
                                onChange={e => handleChange('so-doan', e.target.checked, soDoanIndex)} 
                            />} 
                        label="Nộp sổ đoàn" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox  
                                checked={fees[cttnIndex].soLuong === 12}
                                onChange={e => handleChange('cong-trinh-thanh-nien', e.target.checked, cttnIndex)} 
                            />} 
                        label="Kinh phí đóng góp xây dựng công trình thanh niên" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox  
                                checked={fees[theHVIdex].soLuong === 1}
                                onChange={e => handleChange('the-hoi-vien', e.target.checked, theHVIdex)} 
                            />} 
                        label="Chi phí làm thẻ hội viên Hội Sinh viên Việt Nam " 
                    />
                </FormGroup>
            </div>
        </div>
    )
}

export default BillForm