const getStudentsError = error => ({
  type: 'Entity/TeacherGetStudents/Error',
  payload: { error },
});

const getStudentsRequest = () => ({
  type: 'Entity/TeacherGetStudents/Request',
});

const getStudentsSuccess = teacher_AvailableStudentsList => ({
  type: 'Entity/TeacherGetStudents/Success',
  payload: { teacher_AvailableStudentsList },
});

export default {
  getStudentsError,
  getStudentsRequest,
  getStudentsSuccess,
};
