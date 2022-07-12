// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
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
    Typography,
    Paper
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Components ============================================================== //
import BorderTopCard from 'ui-component/cards/BorderTopCard';

function createData(bill) {
    const id = bill._id;
    const maSoSV = bill.maSoSV;
    const name = bill.ho + " " + bill.ten;
    const donVi = bill.donVi?.tenDonVi;
    const lopSV = bill.lopSV?.tenLop;
    const doanPhi = bill.bill?.trangThai;
    const soDoan = bill.thongTinDoanVien?.trangThaiSoDoan;
    const doanVien = bill.doanVien;
    const tongTien = bill.bill.tongTien;
    const ngayThanhToan = bill.bill.ngayThanhToan;

    return { id, maSoSV, name, donVi, lopSV, doanPhi, soDoan, doanVien, tongTien, ngayThanhToan };
}

const headCells = [
    {
        id: 'maSoSV',
        align: 'left',
        disablePadding: false,
        label: 'Mã số sinh viên',
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Họ và tên',
    },
    {
        id: 'donVi',
        align: 'left',
        disablePadding: false,
        label: 'Đơn vị',
    },
    {
        id: 'lopSV',
        align: 'left',
        disablePadding: false,
        label: 'Lớp',
    },
    {
        id: 'doanVien',
        align: 'center',
        disablePadding: false,
        label: 'Là đoàn viên',
    },
    {
        id: 'doanPhi',
        align: 'center',
        disablePadding: false,
        label: 'Đã đóng đoàn phí',
    },
    {
        id: 'soDoan',
        align: 'center',
        disablePadding: false,
        label: 'Đã thu sổ đoàn',
    },
    {
        id: 'tongTien',
        align: 'right',
        disablePadding: false,
        label: 'Tổng tiền',
    },
    {
        id: 'ngayThanhToan',
        align: 'center',
        disablePadding: false,
        label: 'Ngày thanh toán',
    },
];

const mapOrderBy = field => {
    switch (field) {
        case 'maSoSV':
            return 'maSoSV';
        case 'doanVien':
            return 'doanVien';
        default:
            return undefined;
    }
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        if (property === 'name' || 
            property === 'donVi' ||
            property === 'lopSV' ||
            property === 'doanPhi' ||
            property === 'soDoan' ||
            property === 'tongTien' ||
            property === 'ngayThanhToan'
        ) 
            return;
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    {(
                        headCell.id !== 'name' && 
                        headCell.id !== 'donVi' &&
                        headCell.id !== 'lopSV' &&
                        headCell.id !== 'doanPhi' &&
                        headCell.id !== 'soDoan' &&
                        headCell.id !== 'tongTien' &&
                        headCell.id !== 'ngayThanhToan'
                    ) ?
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
export default function EnhancedTable({ data, totalRecords, loading, onRefetch, searchValues }) {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('maSoSV');
    const [page, setPage] = useState(0);

    useEffect(() => {
        onRefetch(prev => ({
            ...prev,
            offset: page,
            sortBy: mapOrderBy(orderBy),
            isDescending: order === 'desc'
        }))
    }, [order, orderBy, page]); 

    useEffect(() => {
        if (searchValues.offset !== page) {
            setPage(searchValues.offset)
        }
    }, [searchValues.offset])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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
                                    // onClick={(event) => handleClick(event, row.id)}
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    <TableCell padding="8px">{row.maSoSV}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.donVi}</TableCell>
                                    <TableCell align="left">{row.lopSV}</TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            {row.doanVien ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.doanVien && <IconButton>
                                            {row.doanPhi === 'Đã đóng' ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />}
                                        </IconButton>}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.doanVien && <IconButton>
                                            {row.soDoan === 'DA_NOP' ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />}
                                        </IconButton>}
                                    </TableCell>
                                    <TableCell align="right">
                                        <NumberFormat 
                                            value={row.tongTien}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix=' VNĐ'
                                            renderText={(value, props) => <Typography {...props}>{value}</Typography>}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{row.ngayThanhToan ? moment(row.ngayThanhToan).format("DD/MM/YYYY hh:mm A") : ''}</TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                        <Pagination 
                            count={Math.ceil(totalRecords / 10)} 
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