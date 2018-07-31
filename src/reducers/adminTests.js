const INITIAL_STATE = {
  adminTests: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminTests/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminTests/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminTests/Success':
      return {
        adminTests: payload.adminTests,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
