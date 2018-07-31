import { teacherCreateGroup as Actions, errorMessage as errorEmmiter } from '../actions';

// eslint-disable-next-line

export const getAvailableStudents = filter => (dispatch) => {
  dispatch(Actions.getStudentsRequest());
  fetch('/api/teacher/students', {
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.getStudentsSuccess(body)))
    .catch(err => dispatch(Actions.getStudentsError(err)));
};


export const teacherCreateGroup = studentsObject => (dispatch) => {
  const { studentsList, groupName } = studentsObject;
  dispatch(Actions.createGroupRequest(studentsList, groupName));
  fetch('/api/teacher/group', {
    method: 'POST',
    body: JSON.stringify({
      studentsList,
      groupName,
    }),
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      switch (response.status) {
        case 409:
          throw new Error('Группа с таким именем уже существует');
        default:
          throw new Error('Не удалось создать группу');
      }
    })
    .then((body) => {
      dispatch(Actions.createGroupSuccess(body.id));
      dispatch(errorEmmiter.messageRequested('Группа успешно создана!'));
    })
    .catch((err) => {
      dispatch(Actions.createGroupError(err));
      dispatch(errorEmmiter.messageRequested(err.message));
    });
};
