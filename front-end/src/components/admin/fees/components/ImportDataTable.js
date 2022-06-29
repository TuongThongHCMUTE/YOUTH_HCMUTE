import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderTopCard from 'ui-component/cards/BorderTopCard';

export default function BasicTable({ data }) {
  return (
    <BorderTopCard
        borderColor="var(--color-grey-300"
        topColor="var(--color-primary-400)"
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Mã số sinh viên</TableCell>
              <TableCell>Đoàn phí</TableCell>
              <TableCell>Công trình thanh niên</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.stt}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.stt}</TableCell>
                <TableCell>{row.hoVaTen}</TableCell>
                <TableCell>{row.maSoSV}</TableCell>
                <TableCell>{row.doanPhi}</TableCell>
                <TableCell>{row.cttn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BorderTopCard>
  );
}