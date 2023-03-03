export const saveTokenToStorage = (token) => {
  localStorage.setItem('token', token);
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
};

export const getTokenFromStorage = () => {
  return localStorage.getItem('token');
};

export const saveRoleToStorage = (role) => {
  sessionStorage.setItem('role', role);
};

export const removeRoleFromStorage = () => {
  sessionStorage.removeItem('role');
};

export const getRoleFromStorage = () => {
  return sessionStorage.getItem('role');
};