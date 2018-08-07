const getThemesError = error => ({
  type: 'Entity/TeacherGetThemes/Error',
  payload: { error },
});

const getThemesRequest = () => ({
  type: 'Entity/TeacherGetThemes/Request',
});

const getThemesSuccess = themesList => ({
  type: 'Entity/TeacherGetThemes/Success',
  payload: { themesList },
});

const addTaskError = error => ({
  type: 'Entity/TeacherAddTask/Error',
  payload: error.message,
});

const addTaskRequest = taskObject => ({
  type: 'Entity/TeacherAddTask/Request',
  payload: { taskObject },
});

const addTaskSuccess = () => ({
  type: 'Entity/TeacherAddTask/Success',
});

export default {
  getThemesSuccess,
  getThemesRequest,
  getThemesError,
  addTaskError,
  addTaskRequest,
  addTaskSuccess,
};
