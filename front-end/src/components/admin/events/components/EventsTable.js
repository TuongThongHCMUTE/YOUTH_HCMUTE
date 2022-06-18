// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';
// APIs ==================================================================== //
import { updateOneEvent, deleteEvent } from 'apis/event';
// Constants =============================================================== //
const DEFAULT_LIMIT = 10;
const dateTimeFormat = 'HH:mm DD/MM/YYYY'
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Components ============================================================== //
import BorderTopCard from 'ui-component/cards/BorderTopCard';
import { ConfirmationModal } from 'components/common/modal';
import SnackBar from 'components/common/alert/Snackbar';

function createData(event) {
    const id = event._id;
    const name = event.tenHoatDong;
    const registrationTime = event.thoiGianDangKy;
    const eventTime = event.thoiGianToChuc;
    const location = event.diaDiem;
    const image = event.anhBia;
    const approved = event.daDuyet;
    const status = event.hienThi;

    return { id, name, registrationTime, eventTime, location, image, approved, status};
}

const headCells = [
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'Ảnh bìa',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Tên hoạt động',
    },
    {
        id: 'eventTime',
        numeric: false,
        disablePadding: false,
        label: 'Thời gian tổ chức',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'Địa điểm',
    },
    {
        id: 'approved',
        numeric: false,
        disablePadding: false,
        label: 'Duyệt',
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
        case 'name':
            return 'tenHoatDong';
        case 'status':
            return 'hienThi';
        case 'approved':
            return 'daDuyet';
        default:
            return undefined;
    }
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        if (
            property === 'image' || 
            property === 'eventTime' || 
            property === 'actions'
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
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    {
                        headCell.id !== 'image' && 
                        headCell.id !== 'eventTime' && 
                        headCell.id !== 'actions' ?
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

    const handleClick = (event, row) => {
        setModalType('update');
        setSelectedEvent(row);
        setOpenCreateModal(true);
    };

    const handleChangeStatus = async (event, id, type, value) => {
        event.stopPropagation();
        const data = { _id: id };
        if (type === 'hienThi') {
            data.hienThi = value;
        } else if (type === 'daDuyet') {
            data.daDuyet = value;
        }
        try {
            const res = await updateOneEvent(data);
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
            const res = await deleteEvent(id);
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
        } catch (e) {
            setAlert({
                severity: 'error',
                message: e.response?.data?.message || 'Đã xảy ra lỗi'
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
                                    <TableCell padding="8px"><EventImage image={row.image} /></TableCell>
                                    <TableCell align="left">
                                        <b>{ReactHtmlParser(row.name)}</b>
                                    </TableCell>
                                    <TableCell align="left">
                                        {/* <div>{`Từ: ${moment(row.eventTime.thoiGianBatDau).format(dateTimeFormat)}`}</div>
                                        <div>{`Đến: ${moment(row.eventTime.thoiGianKetThuc).format(dateTimeFormat)}`}</div> */}
                                        {`${moment(row.eventTime.thoiGianBatDau).format(dateTimeFormat)} - ${moment(row.eventTime.thoiGianKetThuc).format(dateTimeFormat)}`}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.location}
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton 
                                            onClick={(event) => handleChangeStatus(event, row.id, 'daDuyet', !row.approved)}
                                        >
                                            {row.approved ? <CheckCircleIcon color='success' /> : <CancelIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex' }}>
                                            <IconButton 
                                                onClick={(event) => handleChangeStatus(event, row.id, 'hienThi', !row.status)}
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
                                        </Box>
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