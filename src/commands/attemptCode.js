import { attemptCode as Actions } from '../actions';

export const getAttemptCode = ({ taskId, attemptNumber }) => (dispatch) => {
  dispatch(Actions.attemptRequest());
  fetch(`/api/student/task/attempt?taskId=${taskId}&&attemptNumber=${attemptNumber}`, {
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.attemptSuccess(body)))
    .catch(err => dispatch(Actions.attemptRequest(err)));
};
