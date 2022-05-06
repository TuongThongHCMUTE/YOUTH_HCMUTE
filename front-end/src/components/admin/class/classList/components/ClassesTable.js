// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
// APIs ==================================================================== //
import { updateClass } from 'apis/class';
// Constants =============================================================== //
import { DEFAULT_LIMIT } from 'helpers/constants/class';
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
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
// Components ============================================================== //
import BorderTopCard from 'ui-component/cards/BorderTopCard';

function createData(studentClass) {
    const id = studentClass._id;
    const name = studentClass.tenLop;
    const faculty = studentClass.donVi?.tenDonVi;
    const major = studentClass.nganhHoc;
    const status = studentClass.hienThi;
    const secretary = studentClass.quanLy.filter(i => i.chucVu === 'BI_THU')[0];
    const deputySecretary = studentClass.quanLy.filter(i => i.chucVu === 'PHO_BI_THU')[0];
    const createdAt = studentClass.createdAt;

    return { id, name, faculty, status, major, secretary, deputySecretary, createdAt};
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Tên lớp',
    },
    {
        id: 'faculty',
        numeric: false,
        disablePadding: false,
        label: 'Đơn vị',
    },
    {
        id: 'major',
        numeric: false,
        disablePadding: false,
        label: 'Ngành học',
    },
    {
        id: 'secretary',
        numeric: false,
        disablePadding: false,
        label: 'Bí thư',
    },
    {
        id: 'deputySecretary',
        numeric: false,
        disablePadding: false,
        label: 'Phó Bí thư',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Ngày tạo',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái',
    },
];

const mapOrderBy = field => {
    switch (field) {
        case 'name':
            return 'tenLop';
        case 'status':
            return 'hienThi';
        case 'major':
            return 'nganhHoc';
        default:
            return undefined;
    }
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        if (property === 'secretary' || property === 'deputySecretary' || property === 'faculty' || property === 'actions') 
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
                    {headCell.id !== 'secretary' && headCell.id !== 'deputySecretary' && headCell.id !== 'faculty' && headCell.id !== 'actions' ?
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
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);

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
            const res = await updateClass({ _id: id, hienThi: status });
            if (res.data.status === 'success') {
                onRefetch({
                    limit: DEFAULT_LIMIT,
                    offset: page,
                    sortBy: mapOrderBy(orderBy),
                    isDescending: order === 'desc'
                });
            }
        } catch (err) {
            alert(err);
        }
    }

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
                                    <TableCell padding="8px">{row.name}</TableCell>
                                    <TableCell align="left">{row.faculty}</TableCell>
                                    <TableCell align="left">{row.major}</TableCell>
                                    <TableCell align="left">{row.secretary?.hoTen}</TableCell>
                                    <TableCell align="left">{row.deputySecretary?.hoTen}</TableCell>
                                    <TableCell align="left">{moment(row.createdAt).format('DD/MM/YYYY hh:mm A')}</TableCell>
                                    <TableCell align="right">
                                        <IconButton 
                                            onClick={(event) => handleChangeStatus(event, row.id, !row.status)}
                                        >
                                            {row.status ? <LockOpenIcon color='success' /> : <LockIcon />}
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
        </BorderTopCard>
    );
}