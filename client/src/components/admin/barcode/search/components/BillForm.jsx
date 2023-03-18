// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import 'moment/locale/vi';
// Styles ================================================================== //
import styles from '../BarcodeSearchPage.module.scss';
// Helpers ================================================================= //
import { USER_ROLES } from 'helpers/auth';
import {
  HTTP_RESPONSE_STATUS,
  DEFAULT_ERROR_MESSAGE,
  handleErrorResponse
} from 'helpers/http';
// APIs ==================================================================== //
import { createBillRequest, updateBillRequest } from 'apis/bill';
// Redux Store ============================================================= //
import { roleSelector } from 'redux/selectors/auth-selectors';
// Material UI ============================================================= //
import {
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// Components ============================================================== //
import ConfirmationModal from 'components/common/modal/ConfirmationModal/ConfirmationModal';

// =============================|| BILL FORM ||============================= //
const Bill = props => {
  const { isNewBill, onCheckout } = props;

  const dispatch = useDispatch();
  const userRole = useSelector(roleSelector);

  const [bill, setBill] = useState(props.bill);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setBill(props.bill);
  }, [props.bill]);

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
  const additionalFeeIndex = fees.findIndex(
    f => f.tenChiPhi === 'Truy thu Đoàn phí'
  );
  // Các khoản phí khác
  const soDoanIndex = fees.findIndex(f => f.tenChiPhi === 'Sổ đoàn viên');
  const cttnIndex = fees.findIndex(
    f => f.tenChiPhi === 'Kinh phí đóng góp công trình thanh niên'
  );
  const theHVIndex = fees.findIndex(
    f => f.tenChiPhi === 'Kinh phí làm thẻ Hội viên hội sinh viên Việt Nam'
  );

  const calculateTotalPrice = fees =>
    fees.reduce((sum, i) => sum + i.thanhTien, 0);

  // This function is triggered when user makes an update on bill
  // Some actions: change start/end date, fill number, check/uncheck option
  const handleChange = (field, value, index) => {
    if (index === -1) {
      return;
    }

    const fee = fees[index];

    if (field === 'ngayBatDau' || field === 'ngayKetThuc') {
      fee[field] = value;
      fee.soLuong = moment(fee.ngayKetThuc).diff(
        moment(fee.ngayBatDau),
        'months'
      );
    } else if (field === 'additionalFee') {
      fee.soLuong = value;
    } else if (field === 'so-doan' || field === 'the-hoi-vien') {
      fee.soLuong = value ? 1 : 0;
    } else if (field === 'cong-trinh-thanh-nien') {
      fee.soLuong = value ? 12 : 0;
    }

    fee.thanhTien = fee.soLuong * fee.donGia;
    fees[index] = fee;

    setBill(prev => ({
      ...prev,
      cacKhoanPhi: fees,
      tongTien: calculateTotalPrice(fees)
    }));
  };

  const handleCheckout = async () => {
    try {
      const res = isNewBill
        ? await createBillRequest(bill)
        : await updateBillRequest(bill);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        onCheckout(res.data.data.bill);
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    }
  };

  const generateStatus = () => {
    if (bill.trangThai === false && isNewBill === false)
      return <p>Chưa thanh toán</p>;
    if (bill.trangThai === true && isNewBill === false)
      return (
        <p>
          Đã thanh toán vào lúc{' '}
          {moment(bill.ngayThanhToan).format('HH:mm [ngày] DD/MM/YYYY')}
        </p>
      );
    if (isNewBill === true) return <p>Chưa xuất hóa đơn</p>;
  };

  return (
    <div className={styles.BillForm}>
      <div className={styles.BillOptions}>
        <h3 className={styles.OptionTitle}>Đoàn phí</h3>
        <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
          <Grid container className={styles.Fields}>
            <Grid item md={4} xs={12} sx={{ p: 1 }}>
              <DatePicker
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/yyyy"
                label="Từ tháng"
                value={feeStartDate}
                onChange={newValue => {
                  handleChange('ngayBatDau', newValue, unionFeeIndex);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    className="text-field"
                    helperText={null}
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12} sx={{ p: 1 }}>
              <DatePicker
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/yyyy"
                label="Đến tháng"
                value={feeEndDate}
                onChange={newValue => {
                  handleChange('ngayKetThuc', newValue, unionFeeIndex);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    className="text-field"
                    helperText={null}
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12} sx={{ p: 1 }}>
              <TextField
                className="text-field"
                label="Truy thu"
                type="number"
                inputProps={{ min: '0', step: '1' }}
                value={
                  additionalFeeIndex !== -1
                    ? fees[additionalFeeIndex].soLuong
                    : 0
                }
                onChange={e =>
                  handleChange(
                    'additionalFee',
                    e.target.value,
                    additionalFeeIndex
                  )
                }
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
                onChange={e =>
                  handleChange('so-doan', e.target.checked, soDoanIndex)
                }
              />
            }
            label="Nộp sổ đoàn"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={fees[cttnIndex].soLuong === 12}
                onChange={e =>
                  handleChange(
                    'cong-trinh-thanh-nien',
                    e.target.checked,
                    cttnIndex
                  )
                }
              />
            }
            label="Kinh phí đóng góp xây dựng công trình thanh niên"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={fees[theHVIndex].soLuong === 1}
                onChange={e =>
                  handleChange('the-hoi-vien', e.target.checked, theHVIndex)
                }
              />
            }
            label="Chi phí làm thẻ hội viên Hội Sinh viên Việt Nam "
          />
        </FormGroup>
      </div>
      <div className={styles.Line} />
      <div className={styles.Detail}>
        <h3 className={styles.BillTitle}>
          <u>Chi tiết hóa đơn</u>
        </h3>
        <ul className={styles.Items}>
          {bill?.cacKhoanPhi.map(i => (
            <li key={i.thuTu} className={styles.Item}>
              <p>
                {i.thuTu}. {i.tenChiPhi} ({i.soLuong} {i.donViTinh})
              </p>
              <NumberFormat
                value={i.thanhTien}
                displayType={'text'}
                thousandSeparator={true}
                suffix=" VNĐ"
                renderText={(value, props) => (
                  <p {...props}>
                    <b>{value}</b>
                  </p>
                )}
              />
            </li>
          ))}
        </ul>
        <div className={styles.Total}>
          <p>Tổng cộng: </p>
          <NumberFormat
            value={bill?.tongTien || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix=" VNĐ"
            renderText={(value, props) => <p {...props}>{value}</p>}
          />
        </div>
      </div>
      <ConfirmationModal
        visible={showConfirmation}
        message="Bạn chắc chắn thanh toán hóa đơn này? Thao tác sẽ cập nhật lại thông tin hóa đơn của sinh viên trên hệ thống"
        onConfirm={() => handleCheckout().then(setShowConfirmation(false))}
        onCancel={() => setShowConfirmation(false)}
      />
      <div className={styles.CheckOut}>
        <Button
          variant="contained"
          className="button"
          onClick={() => setShowConfirmation(true)}
          disabled={userRole === USER_ROLES.CONG_TAC_VIEN}
        >
          XUẤT HÓA ĐƠN
        </Button>
        {generateStatus()}
      </div>
    </div>
  );
};

export default Bill;
