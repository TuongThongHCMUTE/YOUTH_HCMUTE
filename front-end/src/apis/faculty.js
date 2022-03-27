// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllFaculties = () => {
    const option = {
        method: 'get',
        url: `${url}/faculties`,
        params: { sortBy: 'thuTu'}
    }

    return axios(option)
}