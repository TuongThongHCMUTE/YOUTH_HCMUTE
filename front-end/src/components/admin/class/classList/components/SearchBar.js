// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './SearchBar.module.scss';
// Material UI ============================================================= //
import { 
  Button, 
  Grid, 
  InputLabel,
  FormControl,
  MenuItem,
  Select,  
  TextField, 
} from '@mui/material';

// ============================|| SEARCH BAR ||============================= //
const SearchBar = (props) => {
  const { faculties, searchValues, onChange, onSearch } = props;

  return (
    <Grid container className={styles.SearchBar}>
        <Grid item xs={2}><h1 className={styles.Title}>Bộ lọc</h1></Grid>
        <Grid item xs={10} className={styles.SearchArea}>
          <Grid container>
            <Grid item xs={5} className={styles.Divider}></Grid>
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
            <Grid item xs={1.5}>
              <TextField
                variant='outlined'
                size='small'
                label='Lớp'
                value={searchValues.className}
                onChange={e => onChange("className", e.target.value)}
              />
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