const INITIAL_STATE = {
  taskList: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/Tasks/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Tasks/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/Tasks/Success':
      return {
        taskList: payload.studentTasks,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;