// Node Modules ============================================================ //
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Formik } from "formik";
import moment from "moment";
import "moment/locale/vi";
// Styles ================================================================== //
import styles from "./CreateSchoolYearModal.module.scss";
// APIs ==================================================================== //
import { createSchoolYear, updateSchoolYear } from "apis/schoolYears";
// Material UI ============================================================= //
import {
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// My components =========================================================== //
import BaseModal from "components/common/modal/base/BaseModal";
import SnackBar from "components/common/alert/Snackbar";

// =======================|| CREATE MANAGER MODAL ||======================== //
const CreateSchoolYearModal = (props) => {
  const { open, onClose, isUpdate, schoolYear, onRefetch } = props;
  const [creating, setCreating] = useState(false);
  const [alert, setAlert] = useState(null);

  console.log('schoolYear: ', schoolYear)

  const displayOptions = [
    {
      display: "Hiển thị",
      value: true,
    },
    {
      display: "Ẩn",
      value: false,
    },
  ];

  const currentYearOptions = [
    {
      display: "Năm hiện tại",
      value: true,
    },
    {
      display: "Không",
      value: false,
    },
  ];

  const initialValues = {
    maNamHoc: "",
    tenNamHoc: "",
    chuDeNamHoc: "",
    moTa: "",
    ngayBatDau: moment(),
    ngayKetThuc: moment(),
    hienThi: true,
    nameHocHienTai: false,
  };

  const [formData, setFormData] = useState(initialValues);
  useEffect(() => {
    setFormData(schoolYear);
  }, [schoolYear])

  const validateData = (values) => {
    const errors = {};

    if (!values.maNamHoc) {
      errors.tenHienThi = "Mã năm học không được để trống.";
    }

    if (!values.tenNamHoc) {
      errors.email = "Tên năm học không được để trống.";
    }

    return errors;
  };

  const handleCreate = async (values, resetForm) => {
    try {
      setCreating(true);

      const res = isUpdate ? await updateSchoolYear(values) : await createSchoolYear(values);
      if (res.data.status === "success") {
        setAlert({
          severity: "success",
          message: "Lưu thành công!",
        });
        !isUpdate && resetForm();
        onRefetch(values.role);
      }
    } catch (e) {
      setAlert({
        severity: "error",
        message: e.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <BaseModal visible={open} title="Năm học" onClose={onClose}>
      <Formik
        initialValues={formData}
        enableReinitialize
        validate={(values) => validateData(values)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => {
          handleCreate(values, resetForm);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
            <form className={styles.Form} onSubmit={handleSubmit}>
              <Grid
                container
                sx={{ display: "flex", flexWrap: "wrap", padding: "16px" }}
              >
                {/* THÔNG TIN CÁ NHÂN */}
                <Grid item xs={12}>
                  <h3 className={styles.SectionTitle}>Thông tin năm học</h3>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <TextField
                    name="maNamHoc"
                    className={styles.TextField}
                    variant="outlined"
                    label="Mã năm học"
                    disabled={isUpdate}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.maNamHoc || ""}
                    error={errors.maNamHoc}
                    helperText={errors.maNamHoc}
                  />
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <TextField
                    name="tenNamHoc"
                    className={styles.TextField}
                    variant="outlined"
                    label="Tên năm học"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.tenNamHoc || ""}
                    error={errors.tenNamHoc}
                    helperText={errors.tenNamHoc}
                  />
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <DatePicker
                    name="ngayBatDau"
                    views={["year", "month", "day"]}
                    inputFormat="DD/MM/yyyy"
                    label="Ngày bắt đầu"
                    value={
                      values?.ngayBatDau
                        ? moment(values.ngayBatDau).format(
                            "YYYY-MM-DD"
                          )
                        : moment().format("YYYY-MM-DD")
                    }
                    onChange={value => setFieldValue('ngayBatDau', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="text-field"
                        helperText={null}
                        variant="outlined"
                        type="date"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <DatePicker
                    name="ngayKetThuc"
                    views={["year", "month", "day"]}
                    inputFormat="DD/MM/yyyy"
                    label="Ngày kết thúc"
                    value={
                      values?.ngayKetThuc
                        ? moment(values.ngayKetThuc).format(
                            "YYYY-MM-DD"
                          )
                        : moment().format("YYYY-MM-DD")
                    }
                    onChange={value => setFieldValue('ngayKetThuc', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="text-field"
                        helperText={null}
                        variant="outlined"
                        type="date"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ p: 2 }}>
                  <TextField
                    name="chuDeNamHoc"
                    className={styles.TextField}
                    variant="outlined"
                    label="Chủ đề năm học"
                    value={values?.chuDeNamHoc || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.chuDeNamHoc}
                    helperText={errors.chuDeNamHoc}
                  />
                </Grid>
                <Grid item xs={12} sx={{ p: 2 }}>
                  <TextField
                    name="moTa"
                    className={styles.TextField}
                    variant="outlined"
                    label="Mô tả"
                    value={values?.moTa || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.chuDeNamHoc}
                    helperText={errors.chuDeNamHoc}
                  />
                </Grid>
                {/* THÔNG TIN TÀI KHOẢN */}
                <Grid item xs={12} mt={2}>
                  <h3 className={styles.SectionTitle}>Tùy chọn</h3>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className="text-field"
                  >
                    <InputLabel id="hienThi">Hiển thị</InputLabel>
                    <Select
                      name="hienThi"
                      labelId="hienThi-group"
                      id="input-hienThi"
                      value={values?.hienThi || false}
                      label="Hiển thị"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {displayOptions.map((i) => (
                        <MenuItem key={i.value} value={i.value}>
                          {i.display}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className="text-field"
                  >
                    <InputLabel id="namHocHienTai">Năm học hiện tại</InputLabel>
                    <Select
                      name="namHocHienTai"
                      labelId="namHocHienTai-group"
                      id="input-namHocHienTai"
                      value={values?.namHocHienTai || false}
                      label="Năm học hiện tại"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {currentYearOptions.map((i) => (
                        <MenuItem key={i.value} value={i.value}>
                          {i.display}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    mt: 2,
                    p: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    className={clsx("button", styles.Button)}
                    loading={creating}
                  >
                    Lưu lại
                  </LoadingButton>
                </Grid>
              </Grid>
              {alert && (
                <SnackBar
                  message={alert.message}
                  severity={alert.severity}
                  onClose={() => setAlert(null)}
                />
              )}
            </form>
          </LocalizationProvider>
        )}
      </Formik>
    </BaseModal>
  );
};

export default CreateSchoolYearModal;
