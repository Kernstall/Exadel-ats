import { studentHistory as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentHistory = ({studentId, groupId}) => (dispatch) => {

  dispatch(Actions.historyRequest());
  fetch(`/api/student/group/history?studentId=${studentId}&&groupId=${groupId}`, {
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.historySuccess(body)))
    .catch(err => dispatch(Actions.historyRequest(err)));
};
