const INITIAL_STATE = {
  students: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  console.log('reducer');
  switch (type) {
    case 'Entity/Students/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Students/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/Students/Success':
      return {
        students: payload.students,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
