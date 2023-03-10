// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from '../ClassManagementPage.module.scss';
// Material UI ============================================================= //
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';

// ============================|| SEARCH BAR ||============================= //
const Filters = props => {
  const { faculties, filters, onChange, onSearch } = props;

  const facultyOptions = [
    { _id: 'all', tenDonVi: 'Tất cả khoa' },
    ...faculties
  ];

  return (
    <Stack
      direction={{ md: 'row', xs: 'col' }}
      alignItems={{ xs: 'center' }}
      justifyContent={{ xs: 'space-between' }}
      className={styles.Filters}
    >
      <h1 className={styles.Title}>Bộ lọc:</h1>
      <Stack direction={{ sm: 'row', xs: 'column' }} className={styles.Form}>
        <Box className={styles.FormControl}>
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
              {facultyOptions.map(f => (
                <MenuItem key={f._id} value={f._id}>
                  {f.tenDonVi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={styles.FormControl}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Lớp"
            value={filters.className}
            onChange={e => onChange('className', e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onSearch(filters);
              }
            }}
          />
        </Box>
        <Button
          className="button"
          variant="contained"
          sx={{ width: 100 }}
          onClick={() => onSearch(filters)}
        >
          Lọc
        </Button>
      </Stack>
    </Stack>
  );
};

export default Filters;
