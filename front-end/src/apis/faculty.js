// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllFaculties = () => {
    const option = {
        method: 'get',
        url: `${url}/faculties`,
        params: { offset: 0, limit: 50, sortBy: 'tenDonVi'}
    }

    return axios(option)
}