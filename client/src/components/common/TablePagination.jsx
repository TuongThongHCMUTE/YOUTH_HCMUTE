// Node Modules ============================================================ //
import React from 'react';
// Material UI ============================================================= //
import {
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
// Helpers ================================================================= //
import { ROWS_PER_PAGE } from 'helpers/ui';

// ========================|| TABLE PAGINATION ||=========================== //
const TablePagination = (props) => {
  const { page, rowsPerPage, totalRecords, onPageChange, onRowsPerPageChange } = props;

  return (
    <Stack
      direction={{md: 'row', xs: 'column' }}
      justifyContent="space-between"
      alignItems="center"
      sx={{ px: 1 }}
    >
      <FormControl sx={{ m: 1, minWidth: 100 }} variant="standard" size="small">
        <InputLabel>Số hàng:</InputLabel>
        <Select
          value={rowsPerPage}
          label="Số hàng:"
          onChange={onRowsPerPageChange}
        >
          {ROWS_PER_PAGE.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        count={Math.ceil(totalRecords / rowsPerPage)}
        page={page + 1}
        onChange={onPageChange}
      />
    </Stack>
  );
};

export default TablePagination;
