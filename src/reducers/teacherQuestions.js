const INITIAL_STATE = {
  teacherQuestions: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Teacher/Questions/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Teacher/Questions/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Teacher/Questions/Success':
      return {
        teacherQuestions: payload.teacherQuestions,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
