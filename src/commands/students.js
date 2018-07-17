import { students as Actions } from '../actions';

// eslint-disable-next-line
export const getStudents = (param) => (dispatch) => {
  dispatch(Actions.studentsRequest());
  fetch('api/user/tops')
    .then(response => response.json())
    .then(body => dispatch(Actions.studentsSuccess(body)))
    .catch(err => dispatch(Actions.studentsRequest(err)));
};
