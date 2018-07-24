const INITIAL_STATE = {
  teacherTasks: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Teacher/Tasks/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Teacher/Tasks/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Teacher/Tasks/Success':
      return {
        teacherTasks: payload.teacherTasks,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
