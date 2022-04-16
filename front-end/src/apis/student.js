// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getOneStudentByStudentId = (studentId) => {
    const option = {
        method: 'get',
        url: `${url}/students/thong-tin-barcode/${studentId}`,
        params: { maNamHoc: '2021-2022'}
    }

    return axios(option)
}

export const updateOneStudent = ({ googleId, ...student }) => {
    const option = {
        method: "put",
        url: `${url}/students/${student._id}`,
        data: student
    }
  
    return axios(option);
}