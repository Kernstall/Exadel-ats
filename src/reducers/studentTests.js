const INITIAL_STATE = {
  testsList: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/Tests/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Tests/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/Tests/Success':
      return {
        testsList: payload.testsList,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
