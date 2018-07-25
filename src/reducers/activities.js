const INITIAL_STATE = {
  activities: null,
  error: null,
  isLoading: false, // !
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/Activities/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Activities/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/Activities/Success':
      return {
        activities: payload.activities,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
