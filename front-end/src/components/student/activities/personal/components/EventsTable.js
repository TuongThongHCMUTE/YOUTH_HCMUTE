// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import moment from 'moment';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';
// Constants =============================================================== //
const DEFAULT_LIMIT = 10;
const dateTimeFormat = 'DD/MM/YYYY - hh:mm A';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Components ============================================================== //
import BorderTopCard from 'ui-component/cards/BorderTopCard';
import { ConfirmationModal } from 'components/common/modal';
import SnackBar from 'components/common/alert/Snackbar';

function createData(event) {
    const id = event._id;
    const name = event.tenHoatDong;
    const image = event.anhBia;
    const eventTime = event.thoiGianToChuc;
    const isCheckIn = event.attendance?.diemDanhVao;
    const checkInTime = event.attendance?.thoiGianDiemDanhVao;
    const isCheckOut = event.attendance?.diemDanhRa;
    const checkOutTime = event.attendance?.thoiGianDiemDanhRa;
    const status = event.attendance?.hoanThanhHoatDong;

    return { id, name, image, eventTime, isCheckIn, checkInTime, isCheckOut, checkOutTime, status };
}

const headCells = [
    {
        id: 'image',
        align: 'left',
        disablePadding: false,
        label: '',
        minWidth: 70,
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Tên hoạt động',
        minWidth: 300,
    },
    {
        id: 'eventTime',
        align: 'center',
        disablePadding: false,
        label: 'Thời gian tổ chức',
        minWidth: 200,
    },
    {
        id: 'checkIn',
        align: 'center',
        disablePadding: false,
        label: 'Điểm danh vào',
        minWidth: 200,
    },
    {
        id: 'checkOut',
        align: 'center',
        disablePadding: false,
        label: 'Điểm danh ra',
        minWidth: 200,
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Hoàn thành',
        minWidth: 120,
    },
];

const mapOrderBy = field => {
    switch (field) {
        case 'name':
            return 'tenHoatDong';
        default:
            return undefined;
    }
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        if (
            property !== 'name'
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
                    style={{ minWidth: headCell.minWidth }}
                >
                    {
                        headCell.id === 'name' ?
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

const EventImage = ({ image }) => {
    const [src, setSrc] = useState(image || fallbackSrc);
    const [imgError, setImgError] = useState(false);
  
    const onError = () => {
        if (!imgError) {
            setImgError(true);
            setSrc(fallbackSrc);
        }
    };

    return (
        <img 
            style={{ width: '150px' }} 
            src={src}
            onError={onError}
        />
    )
}

// ===========================|| STUDENTS TABLE ||========================== //
export default function EnhancedTable({ data, totalRecords, loading, onRefetch, setModalType, setSelectedEvent, setOpenCreateModal }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);
    const [alert, setAlert] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    const handleClick = (event, row) => {

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const rows = data.map(event => createData(event))

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
                                    <TableCell padding="8px"><EventImage image={row.image} /></TableCell>
                                    <TableCell align="left">
                                        <b>{ReactHtmlParser(row.name)}</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        {`${moment(row.eventTime.thoiGianBatDau).format(dateTimeFormat)} - ${moment(row.eventTime.thoiGianKetThuc).format(dateTimeFormat)}`}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.isCheckIn ? moment(row.checkInTime).format(dateTimeFormat) : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.isCheckOut ? moment(row.checkOutTime).format(dateTimeFormat) : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            {row.status ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />}
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
                message={`Bạn có chắc chắn xóa ${selectedRow?.name}?`}
                onConfirm={() => handleDelete(selectedRow?.id).then(setShowConfirmation(false))}
                onCancel={() => setShowConfirmation(false)}
            />
        </BorderTopCard>
    );
}