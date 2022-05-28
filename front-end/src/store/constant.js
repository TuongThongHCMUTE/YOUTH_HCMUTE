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
    { value: true, displayName: 'Đoàn viên' },
    { value: false, displayName: 'Sinh viên' }
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
    SINH_VIEN: 'DOAN_VIEN'
}

export const GOOGLE_CLIENT_ID = "495304423620-qaaopkrvume0id1n6o409sc4teeqr643.apps.googleusercontent.com";

