import { USER_ROLES } from 'helpers/auth';
import adminNavigation from './admin';
import collaboratorNavigation from './collaborator';
import studentNavigation from './student';

export const getMenu = (role) => {
  switch (role) {
    case USER_ROLES.ADMIN:
    case USER_ROLES.DOAN_TRUONG:
      return adminNavigation;
    case USER_ROLES.CONG_TAC_VIEN:
      return collaboratorNavigation;
    case USER_ROLES.SINH_VIEN:
      return studentNavigation;
    default:
      return studentNavigation;
  }
};