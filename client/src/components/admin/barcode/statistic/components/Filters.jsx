// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from '../BarcodeStatisticPage.module.scss';
// Material UI ============================================================= //
import {
  Button,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// ============================|| SEARCH BAR ||============================= //
const Filters = props => {
  const { faculties, filters, onChange, onSearch } = props;

  return (
    <Grid container className={styles.Filters}>
      <Grid item md={2} xs={12}>
        <h1 className={styles.Title}>Bộ lọc:</h1>
      </Grid>
      <Grid item md={10} xs={12} className={styles.SearchArea}>
        <Grid container>
          <Grid item sm={3} xs={12} pr={{ sm: 1.5, xs: 0 }} py={{ sm: 0, xs: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              label="Mã số sinh viên"
              fullWidth
              value={filters.studentId}
              onChange={e => onChange('studentId', e.target.value)}
            />
          </Grid>
          <Grid item sm={3} xs={12} px={{ sm: 1.5, xs: 0 }} py={{ sm: 0, xs: 1 }}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              className="text-field"
            >
              <InputLabel id="faculty-group">Khoa</InputLabel>
              <Select
                name="donVi._id"
                labelId="faculty-group"
                id="input-faculty"
                value={filters.faculty || 'all'}
                label="Khoa"
                onChange={e => onChange('faculty', e.target.value)}
              >
                {[{ _id: 'all', tenDonVi: 'Tất cả khoa' }, ...faculties].map(
                  f => (
                    <MenuItem key={f._id} value={f._id}>
                      {f.tenDonVi}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5} xs={12} px={{ sm: 1.5, xs: 0 }} py={{ sm: 0, xs: 1 }}>
            <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
              <Stack direction={{ sm: 'row', xs: 'column' }} spacing={{ sm: 3, xs: 2 }}>
                <DatePicker
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/yyyy"
                  label="Từ ngày"
                  value={filters.startDate}
                  onChange={value => {
                    onChange('startDate', value);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      className="text-field"
                      size='small'
                      helperText={null}
                    />
                  )}
                />
                <DatePicker
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/yyyy"
                  label="Đến ngày"
                  value={filters.endDate}
                  onChange={value => {
                    onChange('endDate', value);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      className="text-field"
                      size='small'
                      helperText={null}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item sm={1} xs={12} pl={{ sm: 1.5, xs: 0 }} py={{ sm: 0, xs: 1 }} className={styles.ButtonContainer}>
            <Button
              variant="contained"
              className="button"
              sx={{ width: '100% !important' }}
              onClick={() => onSearch(filters)}
            >
              Lọc
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Filters;
