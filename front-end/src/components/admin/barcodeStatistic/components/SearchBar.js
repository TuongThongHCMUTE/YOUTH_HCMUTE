// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './SearchBar.module.scss';
// Material UI ============================================================= //
import { 
  Box,
  Button, 
  Grid, 
  InputLabel,
  FormControl,
  MenuItem,
  Select,  
  TextField, 
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider, DateRangePicker} from '@mui/lab';

// ============================|| SEARCH BAR ||============================= //
const SearchBar = (props) => {
  const { faculties, searchValues, onChange, onSearch } = props;

  return (
    <Grid container className={styles.SearchBar}>
        <Grid item xs={2}><h1 className={styles.Title}>Bộ lọc</h1></Grid>
        <Grid item xs={10} className={styles.SearchArea}>
          <Grid container>
            <Grid item xs={1.5}>
              <TextField
                variant='outlined'
                size='small'
                label='MSSV'
                value={searchValues.studentId}
                onChange={e => onChange("studentId", e.target.value)}
              />
            </Grid>
            <Grid item xs={0.5} className={styles.Divider}></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth variant='outlined' size='small' className='text-field'>
                  <InputLabel id="faculty-group">Khoa</InputLabel>
                  <Select
                      name='donVi._id'
                      labelId="faculty-group"
                      id="input-faculty"
                      value={searchValues.faculty || "all"}
                      label="Khoa"
                      onChange={e => onChange("faculty", e.target.value)}
                  >
                      {[
                          { _id: 'all', tenDonVi: 'Tất cả khoa'}, 
                          ...faculties
                      ].map((f) => (
                          <MenuItem key={f._id} value={f._id}>{f.tenDonVi}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
            </Grid>
            <Grid item xs={0.5} className={styles.Divider}></Grid>
            <Grid item xs={4}>
              <LocalizationProvider locale='vi' dateAdapter={DateAdapter}>
                <DateRangePicker
                  inputFormat="DD/MM/yyyy"
                  startText="Ngày bắt đầu"
                  endText="Ngày kết thúc"
                  value={searchValues.date}
                  onChange={(value) => {
                    onChange("date", value);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField variant='outlined' size='small' className='text-field' {...startProps} />
                      <Box sx={{ mx: 2 }}> đến </Box>
                      <TextField variant='outlined' size='small' className='text-field' {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={0.5} className={styles.Divider}></Grid>
            <Grid item xs={1} className={styles.ButtonContainer}>
                <Button 
                    variant="contained"
                    className="button"
                    sx={{ width: '100% !important' }}
                    onClick={() => onSearch(searchValues)}
                >
                    Lọc
                </Button>
            </Grid>
          </Grid>
        </Grid>
    </Grid>
  )
}

export default SearchBar