const TOKEN = 'react-admin-token';

export const saveUserInfo = (token) => {
  localStorage.setItem(TOKEN, token);
  const userInfo = JSON.parse(atob(token.split('.')[1]));
  return userInfo;
};

export const loadUserInfo = () => {
  const token = localStorage.getItem(TOKEN);
  const userInfo = token ? JSON.parse(atob(token.split('.')[1])) : null;
  return {
    token,
    userInfo,
  };
};

export const removeUserInfo = () => {
  localStorage.removeItem(TOKEN);
};

export { menus } from './menus';
