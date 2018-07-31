const INITIAL_STATE = {
  adminGroups: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminGroups/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminGroups/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminGroups/Success':
      return {
        adminGroups: payload.adminGroups,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
