import { getFacultyById } from "apis/faculty"

export const getFacultyName = async (id) => {
    try {
        const res = await getFacultyById(id);

        if (res.data.status === 'success') {
            const faculty = res.data.faculty;
            return faculty?.tenDonVi;
        } else {
            return '';
        }
    } catch (err) {
        return '';
    }
}