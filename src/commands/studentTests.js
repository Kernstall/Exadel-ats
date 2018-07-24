import { studentTests as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentTests = ({studentId, groupId}) => (dispatch) => {

  dispatch(Actions.testsRequest());
  fetch(`/api/student/group/tests?studentId=${studentId}&&groupId=${groupId}`)
    .then(response => response.json())
    .then(body => dispatch(Actions.testsSuccess(body)))
    .catch(err => dispatch(Actions.testsRequest(err)));
};
