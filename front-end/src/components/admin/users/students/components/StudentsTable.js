// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// APIs ==================================================================== //
import { updateOneStudent, deleteStudent } from 'apis/student';
// Constants =============================================================== //
import { DEFAULT_LIMIT } from 'helpers/constants/student';
// Material UI ============================================================= //
import {
    Box,
    CircularProgress,
    IconButton,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
// Components ============================================================== //
import BorderTopCard from 'ui-component/cards/BorderTopCard';
import { ConfirmationModal } from 'components/common/modal';
import SnackBar from 'components/common/alert/Snackbar';

function createData(student) {
    const id = student._id;
    const studentId = student.maSoSV;
    const email = student.email;
    const name = student.ho + ' ' + student.ten;
    const faculty = student.donVi?.tenDonVi;
    const className = student.lopSV?.tenLop;
    const status = student.trangThai;

    return { id, name, email, studentId, faculty, className, status};
}

const headCells = [
    {
        id: 'studentId',
        numeric: false,
        disablePadding: false,
        label: 'Mã số sinh viên',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Họ và tên',
    },
    {
        id: 'faculty',
        numeric: false,
        disablePadding: false,
        label: 'Đơn vị',
    },
    {
        id: 'className',
        numeric: false,
        disablePadding: false,
        label: 'Lớp',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: '',
    },
];

const mapOrderBy = field => {
    switch (field) {
        case 'studentId':
            return 'maSoSV';
        case 'status':
            return 'hienThi';
        case 'email':
            return 'email';
        default:
            return undefined;
    }
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        if (property === 'name' || property === 'className' || property === 'faculty' || property === 'actions') 
            return;
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    {headCell.id !== 'name' && headCell.id !== 'className' && headCell.id !== 'faculty' && headCell.id !== 'actions' ?
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ?
                        (
                            <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel> :
                    headCell.label
                    }
                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

// ===========================|| STUDENTS TABLE ||========================== //
export default function EnhancedTable({ data, totalRecords, loading, onRefetch }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);
    const [alert, setAlert] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        onRefetch({
            limit: DEFAULT_LIMIT,
            offset: page,
            sortBy: mapOrderBy(orderBy),
            isDescending: order === 'desc'
        })
    }, [order, orderBy, page]); 

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, id) => {
        navigate(`/chi-doan/${id}`);
    };

    const handleChangeStatus = async (event, id, status) => {
        event.stopPropagation();
        try {
            const res = await updateOneStudent({ _id: id, trangThai: status });
            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: 'Cập nhật thành công!'
                });
                onRefetch({
                    limit: DEFAULT_LIMIT,
                    offset: page,
                    sortBy: mapOrderBy(orderBy),
                    isDescending: order === 'desc'
                });
            }
        } catch (error) {
            setAlert({
                severity: 'error',
                message: error.response.data.message
            });
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteStudent(id);
            if (res.data.status === 'success') {
                setAlert({
                    severity: 'success',
                    message: 'Xóa thành công!'
                });
                onRefetch({
                    limit: DEFAULT_LIMIT,
                    offset: page,
                    sortBy: mapOrderBy(orderBy),
                    isDescending: order === 'desc'
                });
            }
        } catch (error) {
            setAlert({
                severity: 'error',
                message: error.response.data.message
            });
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const rows = data.map(studentClass => createData(studentClass))

    return (
        <BorderTopCard
            borderColor="var(--color-grey-300"
            topColor="var(--color-primary-400)"
        >
            <Box sx={{ width: '100%' }}>
                {!loading ?
                <Paper sx={{ width: '100%' }}>
                    <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                        {
                            rows.map((row, index) => {
                            return (
                                <TableRow
                                    sx={{ cursor: 'pointer' }}
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    <TableCell padding="8px">{row.studentId}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.faculty}</TableCell>
                                    <TableCell align="left">{row.className}</TableCell>
                                    <TableCell align="right">
                                        <IconButton 
                                            onClick={(event) => handleChangeStatus(event, row.id, !row.status)}
                                        >
                                            {row.status ? <LockOpenIcon color='success' /> : <LockIcon />}
                                        </IconButton>
                                        <IconButton 
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedRow(row);
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
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                        <Pagination 
                            count={Math.ceil(totalRecords / DEFAULT_LIMIT)} 
                            page={page + 1} 
                            onChange={handleChangePage} 
                        />
                    </Box>
                </Paper>:
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
                    <CircularProgress sx={{ color: 'var(--color-primary-400)'}}/>
                </Box>}
            </Box>
            {alert && 
                <SnackBar 
                    message={alert.message}
                    severity={alert.severity}
                    onClose={() => setAlert(null)}
                />
            }
            <ConfirmationModal
                visible={showConfirmation}
                message={`Bạn có chắc chắn xóa sinh viên ${selectedRow?.name}?`}
                onConfirm={() => handleDelete(selectedRow?.id).then(setShowConfirmation(false))}
                onCancel={() => setShowConfirmation(false)}
            />
        </BorderTopCard>
    );
}