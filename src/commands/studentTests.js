import { studentTests as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentTests = ({groupId}) => (dispatch) => {

  dispatch(Actions.testsRequest());
  fetch(`/api/student/group/tests?groupId=${groupId}`, {
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.testsSuccess(body)))
    .catch(err => dispatch(Actions.testsError(err)));
};
