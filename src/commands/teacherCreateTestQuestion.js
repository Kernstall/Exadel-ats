import {
  errorMessage as errorEmmiter,
  teacherCreateTestQuestion as TestQuestionActions,
} from '../actions';

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

export const addTestQuestion = questionObject => (dispatch) => {
  console.log(questionObject);
  dispatch(TestQuestionActions.addTaskRequest());
  fetch('/api/teacher/new/question', {
    method: 'POST',
    body: JSON.stringify(questionObject),
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.ok) {
      return response.text();
    }
    switch (response.status) {
      case 400:
        throw new Error(`Не удалось создать вопрос, ${response.body}`);
      default:
        throw new Error('Неизвестная ошибка');
    }
  })
    .then(() => {
      dispatch(TestQuestionActions.addTaskSuccess());
      dispatch(errorEmmiter.messageRequested('Вопрос успешно создан!', '/тест'));
    })
    .catch((err) => {
      dispatch(TestQuestionActions.addTaskError(err));
      dispatch(errorEmmiter.messageRequested(err.message));
    });
};
