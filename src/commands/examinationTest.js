import { passingTest as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentExamQuestions = ({testId, callback}) => (dispatch) => {

  dispatch(Actions.questionsRequest());
  fetch(`/api/student/examination/test?testId=${testId}`, {
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.questionsSuccess(body)))
    .then(() => callback())
    .catch(err => dispatch(Actions.questionsError(err)));
};
