const INITIAL_STATE = {
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/StudentSubmitTest/Error':
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case 'Entity/StudentSubmitTest/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/StudentSubmitTest/Success':
      return {
        error: null,
        isLoading: false,
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
