const INITIAL_STATE = {
  taskInfo: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Teacher/Tasks/Info/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Teacher/Task/Info/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Teacher/Task/Info/Success':
      return {
        taskInfo: payload.taskInfo,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
