import axios from 'axios';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const createBillRequest = (bill) => {
  const token = getTokenFromStorage();

  return axios({
    method: 'post',
    url: `${url}/bills`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: bill,
  });
};

export const updateBillRequest = (bill) => {
  const token = getTokenFromStorage();

  return axios({
    method: 'put',
    url: `${url}/bills/${bill._id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: bill,
  });
};

export const checkoutBillRequest = (id) => {
  const token = getTokenFromStorage();

  return axios({
    method: 'put',
    url: `${url}/bills/thanh-toan/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {},
  });
};