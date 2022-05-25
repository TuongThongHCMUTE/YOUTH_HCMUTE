// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

// server
export const url = 'https://dev-youthhcmute-be.herokuapp.com/api/v1';
// export const url = 'http://localhost:5000/api/v1';


// student
export const bookStatuses = [
    { value: 'CHUA_NOP', displayName: 'Chưa nộp' },
    { value: 'DA_NOP', displayName: 'Đã nộp' },
    { value: 'DA_RUT', displayName: 'Đã rút' },
]

export const studentStatuses = [
    { value: 'DOAN_VIEN', displayName: 'Đoàn viên' },
    { value: 'SINH_VIEN', displayName: 'Sinh viên' }
]

// auth
export const LOGIN_STEPS = {
    CHOOSE_OPTIONS: 0,
    STUDENT_LOGIN: 1,
    ADMIN_LOGIN: 2,
    FORGOT_PASSWORD: 3
}

export const USER_ROLES = {
    DOAN_TRUONG: 'DOAN_TRUONG',
    SINH_VIEN: 'SINH_VIEN'
}

