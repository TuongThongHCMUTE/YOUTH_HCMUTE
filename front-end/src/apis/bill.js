// Node Modules ============================================================ //
import axios from "axios";
import moment from "moment";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllBills = (args) => {
    const { limit, offset, sortBy, isDescending, faculty, status, date } = args;

    const params = {
        startDate: moment(date[0]).startOf('day').toDate(),
        endDate: moment(date[1]).endOf('day').toDate()
    }

    if (faculty && faculty !== 'all') {
        params.donVi = faculty;
    }

    if (status !== 'all') {
        params.trangThai = status;
    }

    params.offset = offset ? offset : 0;
    params.sortBy = sortBy ? sortBy : "ngayThanhToan:desc";
    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 
    params.limit = limit;

    const option = {
        method: 'get',
        url: `${url}/bills`,
        params: params
    }

    return axios(option)
}

export const createOneBill = (bill) => {
    const option = {
        method: "post",
        url: `${url}/bills`,
        data: bill
    }
  
    return axios(option);
}

export const updateOneBill = (bill) => {
    const option = {
        method: "put",
        url: `${url}/bills/${bill._id}`,
        data: bill
    }
  
    return axios(option);
}

export const checkOutBill = (billId) => {
    const option = {
        method: "put",
        url: `${url}/bills/thanh-toan/${billId}`,
        data: {}
    }
  
    return axios(option);
}

export const getBillStatistic = ({ faculty, status, date }) => {
    const params = {
        startDate: moment(date[0]).startOf('day').toDate(),
        endDate: moment(date[1]).endOf('day').toDate()
    }

    if (faculty && faculty !== 'all') {
        params.donVi = faculty;
    }

    if (status !== 'all') {
        params.trangThai = status;
    }

    const option = {
        method: 'get',
        url: `${url}/bills/thong-ke-theo-ngay`,
        params: params
    }

    return axios(option)
}