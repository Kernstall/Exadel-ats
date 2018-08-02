const INITIAL_STATE = {
  adminStudents: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminStudents/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminStudents/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminStudents/Success':
      return {
        adminStudents: payload.adminStudents,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
