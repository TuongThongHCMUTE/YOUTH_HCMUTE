import { uiActions } from 'redux/reducers/ui-reducer';
import { authActions } from 'redux/reducers/auth-reducer';
import {
  saveTokenToStorage,
  removeTokenFromStorage,
  saveRoleToStorage,
  removeRoleFromStorage
} from 'helpers/storage';
import { ROUTE } from 'helpers/route';
import { USER_ROLES } from 'helpers/auth';

export const login = ({ token, user }) => {
  return dispatch => {
    let defaultPath;
    switch (user.role) {
      case USER_ROLES.ADMIN:
        defaultPath = ROUTE.adminDashboard;
        break;
      case USER_ROLES.DOAN_TRUONG:
        defaultPath = ROUTE.adminDashboard;
        break;
      case USER_ROLES.SINH_VIEN:
        defaultPath = ROUTE.studentDashboard;
        break;
      case USER_ROLES.GUEST:
        defaultPath = ROUTE.home;
        break;
      default:
        defaultPath = ROUTE.home;
        break;
    }
    saveTokenToStorage(token);
    saveRoleToStorage(user.role);
    dispatch(uiActions.changeDefaultPath(defaultPath));
    dispatch(
      authActions.login({
        token: token,
        user: user
      })
    );
  };
};

export const logout = () => {
  return dispatch => {
    removeTokenFromStorage();
    removeRoleFromStorage();
    dispatch(uiActions.changeDefaultPath(ROUTE.home));
    dispatch(authActions.logout());
  };
};
