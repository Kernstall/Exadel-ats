const INITIAL_STATE = {
  adminStatistics: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminStatistics/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminStatistics/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminStatistics/Success':
      return {
        adminStatistics: payload.adminStatistics,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
