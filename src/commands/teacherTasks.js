import { teacherTasks as Actions } from '../actions';

// eslint-disable-next-line
export const getTeacherTasks = () => (dispatch) => {
  dispatch(Actions.getTeacherTasksRequest());
  fetch('/api/teacher/tasks', {
    method: 'get',
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.getTeacherTasksSuccess(body)))
    .catch(err => dispatch(Actions.getTeacherTasksError(err)));
};
