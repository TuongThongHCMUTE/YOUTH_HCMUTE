/* eslint-disable no-unused-vars */
import axios from 'axios';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const searchStudentInfoRequest = (studentId, year = {}) => {
  const token = getTokenFromStorage();

  return axios({
    method: 'get',
    url: `${url}/students/thong-tin-barcode/${studentId}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: { maNamHoc: year }
  });
};

export const searchStudentsByStudentIdRequest = studentId => {
  const token = getTokenFromStorage();

  return axios({
    method: 'get',
    url: `${url}/students`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: { maSoSV: studentId }
  });
};

// Do not send googleId to avoid encrypting twice
export const updateStudentRequest = ({ googleId, ...student }) => {
  const token = getTokenFromStorage();

  return axios({
    method: 'put',
    url: `${url}/students/${student._id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: student
  });
};
