// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import moment from 'moment';
// Material UI ============================================================= //
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// Components ============================================================== //
import BorderTopCard from 'components/common/cards/BorderTopCard';
import TableHead from 'components/common/TableHead';
import TablePagination from 'components/common/TablePagination';
import { ConfirmationModal } from 'components/common/modal';

const HEAD_CELLS = [
  {
    id: 'maNamHoc',
    align: 'left',
    disablePadding: false,
    label: 'Mã năm học',
  },
  {
    id: 'tenNamHoc',
    align: 'left',
    disablePadding: false,
    label: 'Tên năm học',
  },
  {
    id: 'ngayBatDau',
    align: 'left',
    disablePadding: false,
    label: 'Ngày bắt đầu',
  },
  {
    id: 'ngayKetThuc',
    align: 'left',
    disablePadding: false,
    label: 'Ngày kết thúc',
  },
  {
    id: 'hienThi',
    align: 'center',
    disablePadding: false,
    label: 'Hiển thị',
  },
  {
    id: 'actions',
    align: 'right',
    disablePadding: false,
    label: 'Actions',
  },
];

const mapOrderBy = field => {
  switch (field) {
    case 'maNamHoc':
      return 'maNamHoc';
    case 'tenNamHoc':
      return 'tenNamHoc';
    case 'ngayBatDau':
      return 'ngayBatDau';
    case 'ngayKetThuc':
      return 'ngayKetThuc';
    case 'hienThi':
      return 'hienThi';
    default:
      return undefined;
  }
};

const createData = year => {
  return {
    id: year._id,
    maNamHoc: year.maNamHoc,
    tenNamHoc: year.tenNamHoc,
    ngayBatDau: year.ngayBatDau,
    ngayKetThuc: year.ngayKetThuc,
    namHocHienTai: year.namHocHienTai,
    hienThi: year.hienThi
  };
};

// ============================|| YEARS TABLE ||============================ //
export default function EnhancedTable(props) {
  const {
    data,
    totalRecords,
    loading,
    onRefetch,
    onUpdate,
    onDelete,
    onOpenCreateModal,
  } = props;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('maNamHoc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    onRefetch({
      limit: rowsPerPage,
      offset: page,
      sortBy: mapOrderBy(orderBy),
      isDescending: order === 'desc'
    });
  }, [order, orderBy, page, rowsPerPage]);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (_event, year) => {
    _event.stopPropagation();
    onOpenCreateModal({
      isDisplay: true,
      isUpdate: true,
      year: year,
    });
  };

  const handleChangeStatus = (_event, id, status) => {
    _event.stopPropagation();
    onUpdate({ maNamHoc: id, hienThi: status })
  };

  const handleActiveYear = (_event, id, isActive) => {
    _event.stopPropagation();
    onUpdate({ maNamHoc: id, namHocHienTai: isActive })
  };

  const handleDelete = async id => {
    onDelete(id);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (_event) => {
    setPage(0);
    setRowsPerPage(parseInt(_event.target.value, 10));
  };

  const rows = data.map(studentClass => createData(studentClass));

  return (
    <BorderTopCard
      borderColor="var(--color-grey-300"
      topColor="var(--color-primary-400)"
    >
      <Box sx={{ width: '100%' }}>
        {!loading ? (
          <Paper sx={{ width: '100%' }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'small'}
              >
                <TableHead
                  headCells={HEAD_CELLS}
                  ignoreFields={[]}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow
                        sx={{ cursor: 'pointer' }}
                        hover
                        onClick={event => handleClick(event, row.id)}
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell p={1}>{row.maNamHoc}</TableCell>
                        <TableCell align="left">{row.tenNamHoc}</TableCell>
                        <TableCell align="left">
                          {row.ngayBatDau
                            ? moment(row.ngayBatDau).format('DD/MM/YYYY')
                            : 'N/A'}
                        </TableCell>
                        <TableCell align="left">
                          {row.ngayKetThuc
                            ? moment(row.ngayKetThuc).format('DD/MM/YYYY')
                            : 'N/A'}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={event =>
                              handleChangeStatus(event, row.maNamHoc, !row.hienThi)
                            }
                          >
                            {row.hienThi ? (
                              <VisibilityIcon color="success" />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(event) => {
                              event.stopPropagation();
                              handleActiveYear(
                                event,
                                row.maNamHoc,
                                !row.namHocHienTai
                              );
                            }}
                          >
                            {row.namHocHienTai ? (
                              <AccessTimeFilledIcon color="primary" />
                            ) : (
                              <AccessTimeIcon />
                            )}
                          </IconButton>
                          <IconButton
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelected(row);
                              setShowConfirmation(true);
                            }}
                          >
                            <DeleteOutlineIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              page={page}
              rowsPerPage={rowsPerPage}
              totalRecords={totalRecords}
              onPageChange={handleChangePage} 
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
            <CircularProgress sx={{ color: 'var(--color-primary-400)' }} />
          </Box>
        )}
      </Box>
      <ConfirmationModal
        visible={showConfirmation}
        message={`Bạn có chắc chắn xóa năm học ${selected?.tenNamHoc}?`}
        onConfirm={() =>
          handleDelete(selected?.id).then(setShowConfirmation(false))
        }
        onCancel={() => setShowConfirmation(false)}
      />
    </BorderTopCard>
  );
}
