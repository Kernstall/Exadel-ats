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

export default {
  getThemesSuccess,
  getThemesRequest,
  getThemesError,
};
