import { passingTest as Actions } from '../actions';

// eslint-disable-next-line
export const getStudentQuestions = ({topicId, callback}) => (dispatch) => {

  dispatch(Actions.questionsRequest());
  fetch(`/api/student/test/questions?topicId=${topicId}`, {
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
