// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
// Components ============================================================== //
import BorderTopCard from 'components/common/cards/BorderTopCard';
import TableHead from 'components/common/TableHead';
import TablePagination from 'components/common/TablePagination';
import { ConfirmationModal } from 'components/common/modal';

const HEAD_CELLS = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên lớp'
  },
  {
    id: 'faculty',
    numeric: false,
    disablePadding: false,
    label: 'Đơn vị'
  },
  {
    id: 'major',
    numeric: false,
    disablePadding: false,
    label: 'Ngành học'
  },
  {
    id: 'secretary',
    numeric: false,
    disablePadding: false,
    label: 'Bí thư'
  },
  {
    id: 'deputySecretary',
    numeric: false,
    disablePadding: false,
    label: 'Phó Bí thư'
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Ngày tạo'
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: ''
  }
];

const mapOrderBy = field => {
  switch (field) {
    case 'name':
      return 'tenLop';
    case 'status':
      return 'hienThi';
    case 'major':
      return 'nganhHoc';
    case 'createdAt':
      return 'createdAt';
    default:
      return undefined;
  }
};

const createData = studentClass => {
  return {
    id: studentClass._id,
    name: studentClass.tenLop,
    faculty: studentClass.donVi?.tenDonVi,
    status: studentClass.hienThi,
    major: studentClass.nganhHoc,
    secretary: studentClass.quanLy.filter(i => i.chucVu === 'BI_THU')[0],
    deputySecretary: studentClass.quanLy.filter(
      i => i.chucVu === 'PHO_BI_THU'
    )[0],
    createdAt: studentClass.createdAt
  };
};

// ============================|| BILLS TABLE ||============================ //
export default function EnhancedTable(props) {
  const {
    data,
    totalRecords,
    loading,
    onRefetch,
    onUpdate,
    onDelete,
  } = props;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

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

  const handleClick = (_event, id) => {
    navigate(`/chi-doan/${id}`);
  };

  const handleChangeStatus = (_event, id, status) => {
    _event.stopPropagation();
    onUpdate({ _id: id, hienThi: status })
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
                  ignoreFields={['secretary', 'deputySecretary', 'faculty', 'actions']}
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
                        <TableCell p={1}>{row.name}</TableCell>
                        <TableCell align="left">{row.faculty}</TableCell>
                        <TableCell align="left">{row.major}</TableCell>
                        <TableCell align="left">
                          {row.secretary?.hoTen}
                        </TableCell>
                        <TableCell align="left">
                          {row.deputySecretary?.hoTen}
                        </TableCell>
                        <TableCell align="left">
                          {moment(row.createdAt).format('DD/MM/YYYY hh:mm A')}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={event =>
                              handleChangeStatus(event, row.id, !row.status)
                            }
                          >
                            {row.status ? (
                              <LockOpenIcon color="success" />
                            ) : (
                              <LockIcon />
                            )}
                          </IconButton>
                          <IconButton
                            onClick={event => {
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
        message={`Bạn có chắc chắn xóa lớp ${selected?.name}?`}
        onConfirm={() =>
          handleDelete(selected?.id).then(setShowConfirmation(false))
        }
        onCancel={() => setShowConfirmation(false)}
      />
    </BorderTopCard>
  );
}
