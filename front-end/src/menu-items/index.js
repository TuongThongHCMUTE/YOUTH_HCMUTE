import { USER_ROLES } from 'store/constant';

import adminMenuItems from './admin';
import studentMenuItems from './student';


const getMenuItems = () => {
    const role = sessionStorage.getItem('role');

    switch (role) {
        case USER_ROLES.DOAN_TRUONG:
            return adminMenuItems;
        case USER_ROLES.SINH_VIEN:
            return studentMenuItems;
        default:
            return studentMenuItems;
    }
};

const userMenuItems = getMenuItems();

export default userMenuItems;
