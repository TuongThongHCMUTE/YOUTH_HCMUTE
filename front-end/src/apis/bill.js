// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const updateOneBill = (bill) => {
    const option = {
        method: "put",
        url: `${url}/bills/${bill._id}`,
        data: bill
    }
  
    return axios(option);
}