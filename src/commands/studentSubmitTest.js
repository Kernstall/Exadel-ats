import { studentSubmitTest as Actions, errorMessage as errorEmmiter } from '../actions';

export const studentSubmitTest = ({answersObject, groupId, topicId}) => (dispatch) => {
  dispatch(Actions.studentSubmitTestRequest(answersObject));
  console.log(answersObject);
  fetch(`/api/student/test/checking?groupId=${groupId}&topicId=${topicId}`, {
    method: 'POST',
    body: JSON.stringify({
      ...answersObject,
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
      dispatch(errorEmmiter.messageRequested('Тест успешно отправлен на проверку', `/studentMenu/${groupId}`));
    })
    .catch((err) => {
      dispatch(Actions.studentSubmitTestError(err));
      dispatch(errorEmmiter.messageRequested(err.message));
    });
};
