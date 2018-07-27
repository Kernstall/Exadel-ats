import { teacherQuestions as Actions } from '../actions';

// eslint-disable-next-line
export const getTeacherQuestions = () => (dispatch) => {
  dispatch(Actions.getTeacherQuestionsRequest());
  fetch('/api/teacher/questions', {
    method: 'get',
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.getTeacherQuestionsSuccess(body)))
    .catch(err => dispatch(Actions.getTeacherQuestionsError(err)));
};
