// Node Modules ============================================================ //
import React from 'react';
import moment from 'moment';
// Helpers ================================================================= //
import { stringAvatar } from 'helpers/avatar';
// Constants =============================================================== //
const dateTimeFormat = 'DD/MM/YYYY - hh:mm A';
// Material UI ============================================================= //
import {
    Avatar,
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Components ============================================================== //
import BorderTopCard from 'ui-component/cards/BorderTopCard';

function createData(attendant) {
    const id = attendant._id;
    const studentId = attendant.maSoSV;
    const image = attendant.sinhVien.image;
    const name = attendant.sinhVien.ho + ' ' + attendant.sinhVien.ten;
    const checkIn = attendant.thoiGianDiemDanhVao;
    const checkOut = attendant.thoiGianDiemDanhRa;
    const status = attendant.hoanThanhHoatDong;
    const note = attendant.ghiChu

    return { id, name, studentId, checkIn, checkOut, status, note, image};
}

const headCells = [
    {
        id: 'image',
        align: 'center',
        disablePadding: false,
        label: '',
    },
    {
        id: 'studentId',
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
        id: 'checkIn',
        align: 'center',
        disablePadding: false,
        label: 'Điểm danh vào',
    },
    {
        id: 'checkOut',
        align: 'center',
        disablePadding: false,
        label: 'Điểm danh ra',
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Hoàn thành',
    },
];

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                    { headCell.label }
                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// ===========================|| STUDENTS TABLE ||========================== //
export default function EnhancedTable({ data }) {
    const rows = data.map(attendant => createData(attendant))

    return (
        <BorderTopCard
            borderColor="var(--color-grey-300"
            topColor="var(--color-primary-400)"
        >
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            rowCount={rows.length}
                        />
                        <TableBody>
                        {
                            rows.map((row, index) => {
                                return (
                                    <TableRow
                                        sx={{ cursor: 'pointer' }}
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell padding="8px" align="center">
                                            <Avatar src={row.image} {...stringAvatar(row.name)} />
                                        </TableCell>
                                        <TableCell align="left">{row.studentId}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="center">
                                            {row.checkIn ? moment(row.checkIn).format(dateTimeFormat) : ''}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.checkOut ? moment(row.checkOut).format(dateTimeFormat) : ''}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton>
                                                {row.status ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </BorderTopCard>
    );
}