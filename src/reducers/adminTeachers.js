const INITIAL_STATE = {
  adminTeachers: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/adminTeachers/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/adminTeachers/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/adminTeachers/Success':
      return {
        adminTeachers: payload.adminTeachers,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
