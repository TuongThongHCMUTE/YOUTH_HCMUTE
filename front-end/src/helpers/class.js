export const addManager = (managers, student, position) => {
    let newManagers = managers;
    const index = managers.findIndex(i => i.chucVu === position);

    if (index !== -1) {
        newManagers[index] = {
            chucVu: position,
            maSoSV: student.maSoSV,
            hoTen: student.ho + ' ' + student.ten,
            sinhVien: student
        }
    } else {
        newManagers = [
            ...newManagers,
            {
                chucVu: position,
                maSoSV: student.maSoSV,
                hoTen: student.ho + ' ' + student.ten,
                sinhVien: student
            }
        ]
    }

    return [...newManagers];
};

export const removeManager = (managers, id) => {
    return managers.filter(i => i.maSoSV !== id);
} 