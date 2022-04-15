// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
// Material UI ============================================================= //
import {
    Box,
    CircularProgress,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
    Paper
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
// Components ============================================================== //
import BorderTopCard from 'ui-component/cards/BorderTopCard';

function createData(bill) {
    const id = bill._id;
    const studentId = bill.maSoSV;
    const name = bill.sinhVien.ho + " " + bill.sinhVien.ten;
    const faculty = bill.donVi?.tenDonVi;
    const total = bill.tongTien;
    const status = bill.trangThai ? "Đã thanh toán" : "Chưa thanh toán";
    const date = bill.ngayThanhToan;

    return { id, studentId, name, faculty, total, status, date };
}

const headCells = [
    {
        id: 'studentId',
        numeric: false,
        disablePadding: false,
        label: 'Mã số sinh viên',
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
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Tổng tiền',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Ngày thanh toán',
    }
];

const mapOrderBy = field => {
    switch (field) {
        case 'studentId':
            return 'maSoSV';
        case 'total':
            return 'tongTien';
        case 'status':
            return 'trangThai';
        case 'date':
            return 'ngayThanhToan';
        default:
            return undefined;
    }
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        if (property === 'name' || property === 'faculty') 
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
                    {headCell.id !== 'name' && headCell.id !== 'faculty' ?
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

// ============================|| BILLS TABLE ||============================ //
export default function EnhancedTable({ data, totalRecords, loading, onRefetch }) {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);

    useEffect(() => {
        onRefetch({
            limit: 10,
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

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const rows = data.map(bill => createData(bill))

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
                        size={'medium'}
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
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.faculty}</TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="right">
                                        <NumberFormat 
                                            value={row.total}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix=' VNĐ'
                                            renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{moment(row.date).format("DD/MM/YYYY hh:mm A")}</TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                        <Pagination 
                            count={(totalRecords / 10).toFixed()} 
                            page={page + 1} 
                            onChange={handleChangePage} 
                        />
                    </Box>
                </Paper>:
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
                    <CircularProgress sx={{ color: 'var(--color-primary-400)'}}/>
                </Box>}
            </Box>
        </BorderTopCard>
    );
}