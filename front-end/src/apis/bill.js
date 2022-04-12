// Node Modules ============================================================ //
import axios from "axios";
import moment from "moment";

// Constants =============================================================== //
import { url } from 'store/constant';

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

export const getBillStatistic = ({ faculty, date }) => {
    const params = {
        startDate: moment(date[0]).toDate(),
        endDate: moment(date[1]).toDate()
    }

    if (faculty && faculty !== 'all') {
        params.faculty = faculty;
    }

    const option = {
        method: 'get',
        url: `${url}/bills/thong-ke-theo-ngay`,
        params: params
    }

    return axios(option)
}