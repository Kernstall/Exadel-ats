import { studentSubmitTest as Actions, errorMessage as errorEmmiter } from '../actions';

export const studentSubmitTest = testObject => (dispatch) => {
  dispatch(Actions.studentSubmitTestRequest(testObject));
  fetch('Мой адрес запроса !!!', {
    method: 'POST',
    body: JSON.stringify({
      ...testObject,
    }),
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      switch (response.status) {
        case 409:
          throw new Error('Не удалось послать тест на проверку');
        default:
          throw new Error('Не удалось послать тест на проверку');
      }
    })
    .then((body) => {
      dispatch(Actions.studentSubmitTestSuccess());
      dispatch(errorEmmiter.messageRequested('Тест успешно отправлен на проверку', `Юрла для редиректа!!!!`));
    })
    .catch((err) => {
      dispatch(Actions.studentSubmitTestError(err));
      dispatch(errorEmmiter.messageRequested(err.message));
    });
};
