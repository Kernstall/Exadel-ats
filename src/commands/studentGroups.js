import { studentGroups as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentGroups = ({ id }) => (dispatch) => {
  dispatch(Actions.studentGroupsRequest());
  fetch(`/api/student?id=${id}`)
    .then(response => response.json())
    .then(body => dispatch(Actions.studentGroupsSuccess(body)))
    .catch(err => dispatch(Actions.studentGroupsRequest(err)));
};
