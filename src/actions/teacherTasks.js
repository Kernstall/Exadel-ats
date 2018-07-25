const getTeacherTasksError = error => ({
  type: 'Teacher/Tasks/Error',
  payload: { error },
});

const getTeacherTasksRequest = () => ({
  type: 'Teacher/Tasks/Request',
});

const getTeacherTasksSuccess = teacherTasks => ({
  type: 'Teacher/Tasks/Success',
  payload: { teacherTasks },
});

export default {
  getTeacherTasksError,
  getTeacherTasksRequest,
  getTeacherTasksSuccess,
};
