const getStudentsError = error => ({
  type: 'Entity/TeacherGetStudents/Error',
  payload: { error },
});

const getStudentsRequest = () => ({
  type: 'Entity/TeacherGetStudents/Request',
});

const getStudentsSuccess = availableStudentsList => ({
  type: 'Entity/TeacherGetStudents/Success',
  payload: { availableStudentsList },
});

export default {
  getStudentsError,
  getStudentsRequest,
  getStudentsSuccess,
};
