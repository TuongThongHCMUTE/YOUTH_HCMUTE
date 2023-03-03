// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Styles ================================================================== //
import styles from './BarcodeSearchPage.module.scss';
// APIs ==================================================================== //
import { searchStudentInfoRequest, updateStudentRequest } from 'apis/student';
// Helpers ================================================================= //
import { ALERT_STATUS } from 'helpers/ui';
import {
  HTTP_RESPONSE_STATUS,
  DEFAULT_ERROR_MESSAGE,
  handleErrorResponse
} from 'helpers/http';
// Redux =================================================================== //
import {
  activeYearsSelector,
  currentYearSelector
} from 'redux/selectors/year-selectors';
import { uiActions } from 'redux/reducers/ui-reducer';
// Material UI ============================================================= //
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// Components ============================================================== //
import Barcode from './components/Barcode';
import StudentInfoForm from './components/StudentInfoForm';
import BillForm from './components/BillForm';
import ReceiptModal from './components/ReceiptModal';

const BarcodeSearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [student, setStudent] = useState(null);
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNewBill, setIsNewBill] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const years = useSelector(activeYearsSelector);
  const currentYear = useSelector(currentYearSelector);

  if (!selectedYear && currentYear) {
    setSelectedYear(currentYear.maNamHoc);
  }

  useEffect(() => {
    searchStudent();
  }, [selectedYear]);

  const searchStudent = async () => {
    if (!searchValue || !selectedYear) {
      return;
    }

    try {
      setLoading(true);
      const res = await searchStudentInfoRequest(searchValue, selectedYear);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setStudent(res.data.data.student);
        setBill(res.data.data.bill);
        setIsNewBill(res.data.data.hoaDonMoi);
        setSearchValue('');
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async student => {
    try {
      const res = await updateStudentRequest(student);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setStudent(res.data.data.student);
        dispatch(
          uiActions.showAlert({
            severity: ALERT_STATUS.success,
            message: 'Cập nhật thông tin thành công'
          })
        );
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    }
  };

  const handleChangeYear = e => {
    setSelectedYear(e.target.value);
  };

  const handleCheckout = bill => {
    setBill(bill);
    setIsNewBill(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Stack className={styles.BarcodePage}>
      <Stack
        direction="row"
        alignItems="center"
        className={styles.SearchSection}
      >
        <Typography variant="h1" className={styles.Title}>
          Tra cứu thông tin
        </Typography>
        <Box className={styles.Search}>
          <Input
            className={styles.SearchTextField}
            placeholder="Nhập mã số sinh viên"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                searchStudent();
              }
            }}
          />
          <Button
            variant="contained"
            className={styles.SearchButton}
            onClick={searchStudent}
          >
            <SearchIcon />
          </Button>
        </Box>
        <Box ml={3} sx={{ width: 200 }}>
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            className="text-field"
          >
            <InputLabel id="year-group">Năm học</InputLabel>
            <Select
              labelId="year-group"
              value={selectedYear}
              label="Năm học"
              onChange={e => handleChangeYear(e)}
            >
              {years.map(item => (
                <MenuItem key={item._id} value={item.maNamHoc}>
                  {item.tenNamHoc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {loading && (
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <LinearProgress />
          </Box>
        )}
      </Stack>
      <Grid container className={styles.BodySection}>
        {student ? (
          <>
            <Grid item lg={6} className={styles.InfoForm}>
              <Stack spacing={3}>
                <Barcode data={student} />
                <Divider sx={{ px: 2 }} />
                <StudentInfoForm
                  student={student}
                  onSubmit={updateStudent}
                />
              </Stack>
            </Grid>
            <Grid item lg={6} className={styles.BillForm}>
              {bill ? (
                <BillForm
                  bill={bill}
                  isNewBill={isNewBill}
                  onCheckout={handleCheckout}
                />
              ) : (
                <Typography>Không có dữ liệu hóa đơn</Typography>
              )}
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography className={styles.NoDataMessage}>
              Không có dữ liệu
            </Typography>
          </Grid>
        )}
      </Grid>
      <ReceiptModal
        open={openModal}
        student={student}
        bill={bill}
        onClose={handleCloseModal}
        onCheckout={(bill, student) => {
          handleCheckout(bill);
          updateStudent(student);
        }}
      />
    </Stack>
  );
};

export default BarcodeSearchPage;
