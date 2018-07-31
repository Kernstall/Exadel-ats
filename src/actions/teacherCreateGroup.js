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

const createGroupError = error => ({
  type: 'Entity/TeacherCreateGroup/Error',
  payload: { error },
});

const createGroupRequest = (studentsList, groupName) => ({
  type: 'Entity/TeacherCreateGroup/Request',
  payload: {
    studentsList,
    groupName,
  },
});

const createGroupSuccess = groupId => ({
  type: 'Entity/TeacherCreateGroup/Success',
  payload: groupId,
});

export default {
  getStudentsError,
  getStudentsRequest,
  getStudentsSuccess,
  createGroupError,
  createGroupRequest,
  createGroupSuccess,
};
