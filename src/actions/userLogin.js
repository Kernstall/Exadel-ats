export const loginError = error => ({
  type: 'Entity/Login/Error',
  payload: { error },
});

export const loginRequest = () => ({
  type: 'Entity/Login/Request',
});

export const loginSuccess = response => ({
  type: 'Entity/Login/Success',
  payload: { response },
});

export const logoutError = error => ({
  type: 'Entity/Logout/Error',
  payload: { error },
});

export const logoutRequest = () => ({
  type: 'Entity/Logout/Request',
});

export const logoutSuccess = logoutResponse => ({
  type: 'Entity/Logout/Success',
  payload: { logoutResponse },
});

export default {
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
};
