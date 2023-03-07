import axios from 'axios';
import moment from 'moment';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';
import { renderHttpRequestParams } from 'helpers/http';

const url = getServer();

export const getBillOverviewRequest = args => {
  const token = getTokenFromStorage();
  const params = renderHttpRequestParams({ ...args });

  params.startDate = moment(args.startDate).startOf('day').toDate();
  params.endDate = moment(args.endDate).endOf('day').toDate();

  return axios({
    method: 'get',
    url: `${url}/bills/thong-ke-theo-ngay`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: params
  });
};

export const getBillsRequest = args => {
  const token = getTokenFromStorage();
  const params = renderHttpRequestParams({
    ...args,
    defaultSortBy: 'ngayThanhToan:desc'
  });

  params.startDate = moment(args.startDate).startOf('day').toDate();
  params.endDate = moment(args.endDate).endOf('day').toDate();

  return axios({
    method: 'get',
    url: `${url}/bills`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: params
  });
};

export const exportExcelBillsRequest = args => {
  const token = getTokenFromStorage();
  const params = renderHttpRequestParams({
    ...args,
    defaultSortBy: 'ngayThanhToan:desc'
  });

  params.startDate = moment(args.startDate).startOf('day').toDate();
  params.endDate = moment(args.endDate).endOf('day').toDate();

  return axios({
    method: 'get',
    responseType: 'arraybuffer',
    url: `${url}/bills/xls`,
    headers: {
      'Content-Type': 'blob',
      Authorization: `Bearer ${token}`
    },
    params: params
  });
};

export const createBillRequest = bill => {
  const token = getTokenFromStorage();

  return axios({
    method: 'post',
    url: `${url}/bills`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: bill
  });
};

export const updateBillRequest = bill => {
  const token = getTokenFromStorage();

  return axios({
    method: 'put',
    url: `${url}/bills/${bill._id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: bill
  });
};

export const checkoutBillRequest = id => {
  const token = getTokenFromStorage();

  return axios({
    method: 'put',
    url: `${url}/bills/thanh-toan/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {}
  });
};
