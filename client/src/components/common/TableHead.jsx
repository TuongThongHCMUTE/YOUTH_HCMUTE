// Node Modules ============================================================ //
import React from 'react';
import PropTypes from 'prop-types';
// Material UI ============================================================= //
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// ============================|| TABLE HEAD ||============================= //
function EnhancedTableHead(props) {
  const {
    headCells = [],
    ignoreFields = [],
    order,
    orderBy,
    onRequestSort
  } = props;

  const isAbleToSort = property => {
    return !ignoreFields.includes(property);
  };

  const createSortHandler = property => event => {
    if (isAbleToSort(property)) {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={
              headCell.align
                ? headCell.align
                : headCell.numeric
                  ? 'right'
                  : 'left'
            }
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {isAbleToSort(headCell.id) ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;
