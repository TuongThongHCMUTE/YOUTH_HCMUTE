import validator from 'validator';
import { ERROR_MESSAGE } from './message';

export const GOOGLE_CLIENT_ID =
  '495304423620-qaaopkrvume0id1n6o409sc4teeqr643.apps.googleusercontent.com';

export const LOGIN_STEPS = {
  CHOOSE_OPTIONS: 0,
  STUDENT_LOGIN: 1,
  ADMIN_LOGIN: 2,
  FORGOT_PASSWORD: 3
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  DOAN_TRUONG: 'DOAN_TRUONG',
  SINH_VIEN: 'DOAN_VIEN',
  GUEST: 'GUEST',
};

export const validateLoginValues = (values) => {
  const error = {};
  if (validator.isEmpty(values.email, { ignore_whitespace: true })) {
    error.email = ERROR_MESSAGE.requireEmail;
  }
  if (validator.isEmpty(values.password)) {
    error.password = ERROR_MESSAGE.requirePassword;
  }
  return error;
};

export const validateResetPasswordValues = (values) => {
  const error = {};
  if (validator.isEmpty(values.email, { ignore_whitespace: true })) {
    error.email = ERROR_MESSAGE.requireEmail;
  }
  return error;
};