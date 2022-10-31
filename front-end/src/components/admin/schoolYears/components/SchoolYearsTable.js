// Node Modules ============================================================ //
import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
// Material UI ============================================================= //
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
// Components ============================================================== //
import BorderTopCard from "ui-component/cards/BorderTopCard";
import SnackBar from "components/common/alert/Snackbar";
import { ConfirmationModal } from 'components/common/modal';
import { updateSchoolYear, deleteSchoolYear } from "apis/schoolYears";

function createData(year) {
  const id = year._id;
  const maNamHoc = year.maNamHoc;
  const tenNamHoc = year.tenNamHoc;
  const ngayBatDau = year.ngayBatDau;
  const ngayKetThuc = year.ngayKetThuc;
  const namHocHienTai = year.namHocHienTai;
  const hienThi = year.hienThi;

  return {
    id,
    maNamHoc,
    tenNamHoc,
    ngayBatDau,
    ngayKetThuc,
    namHocHienTai,
    hienThi,
  };
}

const headCells = [
  {
    id: "maNamHoc",
    align: "left",
    disablePadding: false,
    label: "Mã năm học",
  },
  {
    id: "tenNamHoc",
    align: "left",
    disablePadding: false,
    label: "Tên năm học",
  },
  {
    id: "ngayBatDau",
    align: "left",
    disablePadding: false,
    label: "Ngày bắt đầu",
  },
  {
    id: "ngayKetThuc",
    align: "left",
    disablePadding: false,
    label: "Ngày kết thúc",
  },
  {
    id: "hienThi",
    align: "center",
    disablePadding: false,
    label: "Hiển thị",
  },
  {
    id: "actions",
    align: "right",
    disablePadding: false,
    label: "",
  },
];

const mapOrderBy = (field) => {
  switch (field) {
    case "maNamHoc":
      return "maNamHoc";
    case "tenNamHoc":
      return "tenNamHoc";
    case "ngayBatDau":
      return "ngayBatDau";
    case "ngayBatDau":
      return "ngayBatDau";
    case "hienThi":
      return "hienThi";
    default:
      return undefined;
  }
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

// ============================|| TABLE ||============================ //
export default function EnhancedTable({
  data,
  loading,
  onRefetch,
  setOpenCreateModal,
}) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("maNamHoc");
  const [alert, setAlert] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    onRefetch({
      sortBy: mapOrderBy(orderBy),
      isDescending: order === "desc",
    });
  }, [order, orderBy]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (e, schoolYear) => {
    e.stopPropagation();
    setOpenCreateModal({
      isDisplay: true,
      isUpdate: true,
      schoolYear: schoolYear,
    });
  };

  const handleDelete = async (id) => {
    try {
        const res = await deleteSchoolYear(id);
        if (res.data.status === 'success') {
            setAlert({
                severity: 'success',
                message: 'Xóa thành công!'
            });
            onRefetch();
        }
    } catch (error) {
        setAlert({
            severity: 'error',
            message: error.response.data.message
        });
    }
};

  const handleChangeStatus = async (event, id, status) => {
    event.stopPropagation();
    try {
      const res = await updateSchoolYear({ maNamHoc: id, hienThi: status });
      if (res.data.status === "success") {
        setAlert({
          severity: "success",
          message: "Cập nhật thành công!",
        });
        onRefetch();
      }
    } catch (error) {
      setAlert({
        severity: "error",
        message: error.response.data.message,
      });
    }
  };

  const handleActiveShoolYear = async (event, id, isActive) => {
    event.stopPropagation();
    try {
      const res = await updateSchoolYear({
        maNamHoc: id,
        namHocHienTai: isActive,
      });
      if (res.data.status === "success") {
        setAlert({
          severity: "success",
          message: "Cập nhật thành công!",
        });
        onRefetch();
      }
    } catch (error) {
      setAlert({
        severity: "error",
        message: error.response.data.message,
      });
    }
  };

  const rows = data.map((year) => createData(year));

  return (
    <BorderTopCard
      borderColor="var(--color-grey-300"
      topColor="var(--color-primary-400)"
    >
      <Box sx={{ width: "100%" }}>
        {!loading ? (
          <Paper sx={{ width: "100%" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"small"}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {rows.map((row, index) => {
                    return (
                      <TableRow
                        sx={{ cursor: "pointer" }}
                        hover
                        onClick={(event) => handleClick(event, row)}
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{row.maNamHoc}</TableCell>
                        <TableCell align="left">{row.tenNamHoc}</TableCell>
                        <TableCell align="left">
                          {row.ngayBatDau
                            ? moment(row.ngayBatDau).format("DD/MM/YYYY")
                            : ""}
                        </TableCell>
                        <TableCell align="left">
                          {row.ngayKetThuc
                            ? moment(row.ngayKetThuc).format("DD/MM/YYYY")
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={(event) =>
                              handleChangeStatus(
                                event,
                                row.maNamHoc,
                                !row.hienThi
                              )
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
                              handleActiveShoolYear(
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
          </Paper>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
            <CircularProgress sx={{ color: "var(--color-primary-400)" }} />
          </Box>
        )}
      </Box>
      {alert && (
        <SnackBar
          message={alert.message}
          severity={alert.severity}
          onClose={() => setAlert(null)}
        />
      )}
      <ConfirmationModal
        visible={showConfirmation}
        message={`Bạn có chắc chắn xóa năm học ${selectedRow?.tenNamHoc}?`}
        onConfirm={() =>
          handleDelete(selectedRow?.maNamHoc).then(setShowConfirmation(false))
        }
        onCancel={() => setShowConfirmation(false)}
      />
    </BorderTopCard>
  );
}
