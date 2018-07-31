const INITIAL_STATE = {
  adminActivities: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminActivities/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminActivities/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminActivities/Success':
      return {
        adminActivities: payload.adminActivities,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
