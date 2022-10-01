// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from "store/constant";

export const getAllSchoolYears = (args) => {
  const token = sessionStorage.getItem("token");

  const { limit, offset, sortBy, isDescending , hienThi } = args;

  const params = {
      offset: offset ? offset : 0,
      sortBy: sortBy ? sortBy : 'maNamHoc',
  }

  if (limit) {
      params.limit = limit;
  }

  if (hienThi === true || hienThi === false) {
      params.hienThi = hienThi;
  }

  params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

  const option = {
    method: "get",
    url: `${url}/school-years`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params
  };

  return axios(option);
};

export const createSchoolYear = (schoolYear) => {
  const token = sessionStorage.getItem("token");

  const option = {
      method: "post",
      url: `${url}/school-years`,
      headers: {
          Authorization: `Bearer ${token}`,
      },
      data: schoolYear
  }

  return axios(option);
}

export const updateSchoolYear = (schoolYear) => {
  const token = sessionStorage.getItem("token");
  const option = {
      method: "put",
      url: `${url}/school-years/${schoolYear.maNamHoc}`,
      headers: {
          Authorization: `Bearer ${token}`,
      },
      data: schoolYear
  }

  return axios(option);
}

export const deleteSchoolYear = (schoolYearId) => {
  const token = sessionStorage.getItem("token");
  const option = {
      method: "delete",
      url: `${url}/school-years/${schoolYearId}`,
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }

  return axios(option);
}
