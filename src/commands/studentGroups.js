import { studentGroups as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentGroups = (param) => (dispatch) => {
  dispatch(Actions.studentGroupsRequest());
  fetch('api/user/studentGroups')
    .then(response => response.json())
    .then(body => dispatch(Actions.studentGroupsSuccess(body)))
    .catch(err => dispatch(Actions.studentGroupsRequest(err)));
};
