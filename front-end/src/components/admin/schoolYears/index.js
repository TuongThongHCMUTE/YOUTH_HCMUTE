import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { getAllSchoolYears } from "apis/schoolYears";
import { Box, Button } from "@material-ui/core";
import SchoolYearsTable from "./components/SchoolYearsTable";
import CreateSchoolYearModal from "./components/CreateSchoolYearModal";

const SchoolYearManagement = () => {
  const [years, setYears] = useState([]);
  const [searchValues, setSearchValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState({ isDisplay: false, isUpdate: false, schoolYear: {}});

  useEffect(async () => {
    getYears(searchValues);
  }, []);

  const getYears = async (args) => {
    setLoading(true);
    try {
      const res = await getAllSchoolYears(args);

      if (res.data.status === "success") {
        setYears(res.data.data.schoolYears);
        setTotalRecords(res.data.all);
        setLoading(false);
      } else {
        // Show error message
      }
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.SchoolYearManagements}>
      <Box className={styles.SchoolYearsList}>
        <Box className={styles.TitleSection}>
          <div className={styles.Left}>
            <h3 className={styles.Title}>Danh sách năm học</h3>
          </div>
          <div className={styles.ButtonWrapper}>
            <Button
              className="button"
              variant="contained"
              onClick={() => setOpenCreateModal({ isDisplay: true, isUpdate: false, schoolYear: {}})}
            >
              Thêm mới
            </Button>
          </div>
        </Box>
        <SchoolYearsTable
          data={years}
          totalRecords={totalRecords}
          loading={loading}
          onRefetch={(args) => {
            getYears({ ...searchValues, ...args });
            setSearchValues((prev) => ({ ...prev, ...args }));
          }}
          setOpenCreateModal={setOpenCreateModal}
        />
      </Box>
      <CreateSchoolYearModal
        open={openCreateModal.isDisplay}
        isUpdate={openCreateModal.isUpdate}
        schoolYear={openCreateModal.schoolYear}
        onClose={() => setOpenCreateModal({ isDisplay: false, isUpdate: false, schoolYear: {}})}
        onRefetch={() => {
          getYears(searchValues);
        }}
      />
    </div>
  );
};

export default SchoolYearManagement;
