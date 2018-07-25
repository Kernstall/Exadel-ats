const INITIAL_STATE = {
  historyList: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/History/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/History/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/History/Success':
      return {
        historyList: payload.historyList,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
