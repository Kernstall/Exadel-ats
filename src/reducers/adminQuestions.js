const INITIAL_STATE = {
  adminQuestions: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminQuestions/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminQuestions/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminQuestions/Success':
      return {
        adminQuestions: payload.adminQuestions,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
