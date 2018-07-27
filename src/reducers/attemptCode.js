const INITIAL_STATE = {
  attemptCode: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/Attempt/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Attempt/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/Attempt/Success':
      return {
        attemptCode: payload.attemptCode,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
