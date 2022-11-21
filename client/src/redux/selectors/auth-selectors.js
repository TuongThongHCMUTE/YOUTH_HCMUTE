import { USER_ROLES } from 'helpers/auth';

export const accessTokenSelector = (state) => state.auth.token;

export const userSelector = (state) => state.auth.user;

export const roleSelector = (state) => state.auth.user ? state.auth.user.role : USER_ROLES.GUEST;
