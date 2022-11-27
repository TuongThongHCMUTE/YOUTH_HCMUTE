import { USER_ROLES } from 'helpers/auth';
import hcmuteLogo from 'assets/images/logo-hcmute-small-cut.png';

export const accessTokenSelector = (state) => state.auth.token;

export const userSelector = (state) => state.auth.user;

export const roleSelector = (state) => state.auth.user ? state.auth.user.role : USER_ROLES.GUEST;

export const avatarSelector = (state) => {
  const user = state.auth.user;
  if (user) {
    if (user.avatar) {
      return user.avatar;
    } else if (user.role === USER_ROLES.DOAN_TRUONG) {
      return hcmuteLogo;
    }
  }
  return null;
};

export const positionSelector = (state) => {
  return state.auth.user ? state.auth.user.position : '';
};

export const displayNameSelector = (state) => {
  const user = state.auth.user;
  if (user) {
    return user.name ? user.name : user.lastName + ' ' + user.firstName;
  }
  else return '';
}
