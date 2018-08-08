const INITIAL_STATE = {
  questionsList: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/Questions/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Questions/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/Questions/Success':
      return {
        questionsList: payload.questionsList,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
