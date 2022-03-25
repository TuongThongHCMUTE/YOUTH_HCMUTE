// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllClasses = () => {
    const option = {
        method: 'get',
        url: `${url}/classes`,
        params: { offset: 0, limit: 50, sortBy: 'tenLop'}
    }

    return axios(option)
}