import { taskInfo as Actions } from '../actions';

// eslint-disable-next-line
export const getTaskInfo = (taskId) => (dispatch) => {
  dispatch(Actions.getTaskInfoRequest());
  fetch(`/api/teacher/task?id=${taskId}`, {
    method: 'get',
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.getTaskInfoSuccess(body)))
    .catch(err => dispatch(Actions.getTaskInfoError(err)));
};
