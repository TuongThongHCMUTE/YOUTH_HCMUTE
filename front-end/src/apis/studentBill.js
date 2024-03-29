// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllStudentBills = (args) => {
    const token = sessionStorage.getItem("token");
    const { limit, offset, sortBy, isDescending, maSoSV, donVi, lopSV, namHoc, doanPhi, soDoan, doanVien } = args;

    const params = {};

    if (maSoSV !== '') {
        params.maSoSV = maSoSV;
    }

    if (donVi && donVi !== 'all') {
        params.donVi = donVi;
    }

    if (lopSV && lopSV !== 'all') {
        params.lopSV = lopSV;
    }

    if (namHoc && namHoc !== 'all') {
        params['maNamHoc'] = namHoc;
    }

    if (doanPhi && doanPhi !== 'all') {
        params.doanPhi = doanPhi;
    }

    if (soDoan && soDoan !== 'all') {
        params.soDoan = soDoan;
    }

    if (doanVien !== 'all') {
        params.doanVien = doanVien;
    }

    params.offset = offset ? offset : 0;
    params.sortBy = sortBy ? sortBy : "maSoSV:desc";
    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 
    params.limit = limit;

    const option = {
        method: 'get',
        url: `${url}/student-bills`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
};

export const exportExcelStudentBills = (args) => {
    const token = sessionStorage.getItem("token");
    const { offset, sortBy, isDescending, maSoSV, donVi, lopSV, doanPhi, soDoan } = args;

    const params = {
        xls: true,
    };

    if (maSoSV !== '') {
        params.maSoSV = maSoSV;
    }

    if (donVi && donVi !== 'all') {
        params.donVi = donVi;
    }

    if (lopSV && lopSV !== 'all') {
        params.lopSV = lopSV;
    }

    if (doanPhi && doanPhi !== 'all') {
        params.doanPhi = doanPhi;
    }

    if (soDoan && soDoan !== 'all') {
        params.soDoan = soDoan;
    }

    params.offset = offset ? offset : 0;
    params.sortBy = sortBy ? sortBy : "maSoSV:desc";
    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

    const option = {
        headers: {'Content-Type': 'blob'},
        method: 'get',
        responseType: 'arraybuffer',
        url: `${url}/student-bills`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
};

export const importBillsFromFile = (file) => {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    const option = {
        method: "post",
        url: `${url}/student-bills/nhap-du-lieu`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        params: { fileType: 'excel' },
        data: formData
    }
    return axios(option);
}