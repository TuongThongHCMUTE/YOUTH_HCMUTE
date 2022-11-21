export const saveTokenToStorage = (token) => {
  localStorage.setItem('token', token);
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
};

export const getTokenFromStorage = () => {
  return localStorage.getItem('token');
};