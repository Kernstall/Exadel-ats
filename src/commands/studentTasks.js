import { studentTasks as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentTasks = (param) => (dispatch) => {
  dispatch(Actions.tasksRequest());
  fetch('api/student/tasks')
    .then(response => response.json())
    .then(body => dispatch(Actions.tasksSuccess(body)))
    .catch(err => dispatch(Actions.tasksRequest(err)));
};
