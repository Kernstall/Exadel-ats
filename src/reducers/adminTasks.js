const INITIAL_STATE = {
  adminTasks: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminTasks/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminTasks/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminTasks/Success':
      return {
        adminTasks: payload.adminTasks,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
