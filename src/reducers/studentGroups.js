const INITIAL_STATE = {
  studentGroups: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/StudentGroups/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/StudentGroups/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/StudentGroups/Success':
      return {
        studentGroups: payload.studentGroups,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
