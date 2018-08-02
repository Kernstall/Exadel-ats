import { teacherCreateTestQuestion as TestQuestionActions } from '../actions';

// eslint-disable-next-line

export const getTestThemes = () => (dispatch) => {
  dispatch(TestQuestionActions.getThemesRequest());
  fetch('/api/teacher/all/topics', {
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(TestQuestionActions.getThemesSuccess(body)))
    .catch(err => dispatch(TestQuestionActions.getThemesError(err)));
};
