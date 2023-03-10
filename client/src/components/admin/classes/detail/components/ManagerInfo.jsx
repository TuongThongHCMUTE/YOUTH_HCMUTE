// Node Modules ============================================================ //
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from '../ClassDetailPage.module.scss';
// APIs ==================================================================== //
import { searchStudentsByStudentIdRequest } from 'apis/student';
// Helpers ================================================================= //
import { addManager, removeManager } from 'helpers/class';
import {
  HTTP_RESPONSE_STATUS,
  DEFAULT_ERROR_MESSAGE,
  handleErrorResponse
} from 'helpers/http';
// Material UI ============================================================= //
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
// My Components =========================================================== //
import CircularLoading from 'components/common/CircularLoading';

// ========================|| MANAGERS INFORMATION ||======================= //
const ManagerInfo = props => {
  const { data, loading, updating, onUpdate } = props;

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [searching, setSearching] = useState(false);
  const [students, setStudents] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    setManagers(data?.quanLy);
  }, [data]);

  const handleSearchStudents = async studentId => {
    try {
      setSearching(true);
      const res = await searchStudentsByStudentIdRequest(studentId);
      if (res.status === HTTP_RESPONSE_STATUS.success) {
        setStudents(res.data.data.students);
        setSearchValue('');
      }
    } catch (error) {
      handleErrorResponse(error, DEFAULT_ERROR_MESSAGE, dispatch);
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = () => {
    onUpdate({ _id: data._id, quanLy: managers });
  };

  const ManagerItem = ({ manager }) => {
    return (
      <Box className={styles.Card}>
        <Box className={styles.Name}>
          <Box className={styles.StudentName}>
            <h5>{manager.hoTen}</h5>
            {manager.chucVu === 'BI_THU' ? (
              <Box className={styles.Secretary}>Bí thư</Box>
            ) : (
              <Box className={styles.DeputySecretary}>P. Bí thư</Box>
            )}
          </Box>
          <h6 className={styles.StudentId}>{manager.maSoSV}</h6>
        </Box>
        <Box className={styles.Contact}>
          <Box className={styles.Phone}>
            <h5>Phone</h5>
            <h6>{manager.sinhVien.soDienThoai}</h6>
          </Box>
          <Box className={styles.Email}>
            <h5>Email</h5>
            <h6>{manager.sinhVien.email}</h6>
          </Box>
        </Box>
        <IconButton
          className={styles.RemoveButton}
          color="error"
          onClick={() =>
            setManagers(prev => removeManager(prev, manager.maSoSV))
          }
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  const SearchItem = ({ student }) => {
    const fullName = student.ho + ' ' + student.ten;

    return (
      <Box className={styles.Item}>
        <Box className={styles.Content}>
          <Box className={styles.Info}>
            <h5 className={styles.Name}>{fullName}</h5>
            <h6 className={styles.StudentId}>{student.maSoSV}</h6>
          </Box>
          <Box className={styles.Positions}>
            <Box
              className={styles.Secretary}
              onClick={() =>
                setManagers(prev => addManager(prev, student, 'BI_THU'))
              }
            >
              Bí thư
            </Box>
            <Box
              className={styles.DeputySecretary}
              onClick={() =>
                setManagers(prev => addManager(prev, student, 'PHO_BI_THU'))
              }
            >
              P. Bí thư
            </Box>
          </Box>
        </Box>
        <Box className={styles.Divider} />
      </Box>
    );
  };

  return (
    <Grid container>
      <Grid item lg={6} xs={12} className={styles.Left}>
        {loading ? (
          <CircularLoading />
        ) : (
          <>
            <div className={styles.Info}>
              {managers?.length ? (
                managers.map(i => <ManagerItem key={i._id} manager={i} />)
              ) : (
                <Typography
                  variant="h3"
                  component="div"
                  className={styles.NoInfo}
                >
                  Chưa có dữ liệu
                </Typography>
              )}
            </div>
            <div className={styles.Actions}>
              <LoadingButton
                type="submit"
                variant="contained"
                className={clsx('button', styles.Button)}
                loading={updating}
                onClick={() => handleSubmit()}
              >
                Lưu lại
              </LoadingButton>
            </div>
          </>
        )}
      </Grid>
      <Grid item lg={6} xs={12} className={styles.Right}>
        <div className={styles.Search}>
          <TextField
            className={styles.SearchTextField}
            placeholder="Nhập MSSV"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSearchStudents(searchValue);
              }
            }}
          />
          <Button
            variant="contained"
            className={styles.SearchButton}
            onClick={() => handleSearchStudents(searchValue)}
          >
            <SearchIcon />
          </Button>
        </div>
        <div className={styles.SearchResults}>
          <div className={styles.ResultHeader}>
            <div className={styles.TopBorder} />
            <h4>Kết quả tìm kiếm</h4>
            <div className={styles.Divider} />
          </div>
          {searching && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress color="success" />
            </Box>
          )}
          <div className={styles.ResultBody}>
            {students && students.length > 0 ? (
              students.map(i => <SearchItem key={i._id} student={i} />)
            ) : (
              <h3 className={styles.NoResults}>Không có kết quả để hiển thị</h3>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ManagerInfo;
