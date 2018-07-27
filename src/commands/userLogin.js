import { userLogin as Action } from '../actions';

export const login = state => (dispatch) => {
  dispatch(Action.loginRequest());
  fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: state.username,
      password: state.password,
    }),
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status) {
        localStorage.setItem('user', JSON.stringify(res.id));
      }
      return res;
    })
    .then(res => dispatch(Action.loginSuccess(res)))
    .catch(rej => dispatch(Action.loginError(rej)));
};

export const logout = () => (dispatch) => {
  dispatch(Action.logoutRequest());
  localStorage.removeItem('user');
  fetch('/api/user/logout')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .then(res => dispatch(Action.logoutSuccess(res)))
    .catch(rej => dispatch(Action.logoutError(rej)));
};
