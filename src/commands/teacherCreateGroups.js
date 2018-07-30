import { teacherCreateGroup as Actions } from '../actions';

// eslint-disable-next-line

export const getAvailableStudents = (filter) => (dispatch) => {
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
    body: {
      studentsList,
      groupName,
    },
    headers: {
      'Content-type': 'application/json',
      'Set-Cookie': 'true',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(body => dispatch(Actions.createGroupSuccess(body.id)))
    .catch(err => dispatch(Actions.createGroupError(err)));
};
