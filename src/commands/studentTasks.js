import { studentTasks as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentTasks = ({studentId, groupId}) => (dispatch) => {
  console.log('studentId, groupId, 123', studentId, groupId);

  dispatch(Actions.tasksRequest());
  fetch(`/api/student/group/tasks?studentId=${studentId}&&groupId=${groupId}`)
    .then(response => response.json())
    .then(body => dispatch(Actions.tasksSuccess(body)))
    .catch(err => dispatch(Actions.tasksRequest(err)));
};