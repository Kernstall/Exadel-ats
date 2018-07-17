import { studentTasks as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentTasks = ({studentId, groupId}) => (dispatch) => {
  dispatch(Actions.tasksRequest());
  fetch(`api/student/tasks?studentId=${studentId}groupId=${groupId}`)
    .then(response => response.json())
    .then(body => dispatch(Actions.tasksSuccess(body)))
    .catch(err => dispatch(Actions.tasksRequest(err)));
};
