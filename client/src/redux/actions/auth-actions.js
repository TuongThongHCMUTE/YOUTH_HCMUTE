import { uiActions } from 'redux/reducers/ui-reducer';
import { authActions } from 'redux/reducers/auth-reducer';
import { saveTokenToStorage, removeTokenFromStorage } from 'helpers/storage';
import { ROUTE } from 'helpers/route';
import { USER_ROLES } from 'helpers/auth';

export const login = ({ token, user }) => {
  return (dispatch) => {
    let defaultPath;
    switch (user.role) {
      case USER_ROLES.DOAN_TRUONG:
        defaultPath = ROUTE.adminDashboard
        break;
      case USER_ROLES.SINH_VIEN:
        defaultPath = ROUTE.studentDashboard
        break;
      case USER_ROLES.GUEST:
        defaultPath = ROUTE.home
        break;
      default:
        defaultPath = ROUTE.home
        break;
    }
    saveTokenToStorage(token);
    dispatch(uiActions.changeDefaultPath(defaultPath));
    dispatch(authActions.login({
      token: token,
      user: user,
    }));
  };
}

export const logout = () => {
  return (dispatch) => {
    removeTokenFromStorage();
    dispatch(uiActions.changeDefaultPath(ROUTE.home));
    dispatch(authActions.logout());
  };
}