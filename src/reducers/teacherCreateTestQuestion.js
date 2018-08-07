const INITIAL_STATE = {
  themesList: null,
  error: null,
  isLoading: false,
  taskAddRequestSent: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/TeacherGetThemes/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/TeacherGetThemes/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/TeacherGetThemes/Success':
      return {
        themesList: payload.themesList,
        error: null,
        isLoading: false,
      };

    case 'Entity/TeacherAddTask/Success':
      return {
        error: null,
        taskAddRequestSent: false,
      };
    case 'Entity/TeacherAddTask/Request':
      return {
        error: null,
        taskAddRequestSent: true,
      };
    case 'Entity/TeacherAddTask/Error':
      return {
        error: payload,
        taskAddRequestSent: false,
      };

    default:
      return state;
  }
};

export default reducer;
