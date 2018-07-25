const INITIAL_STATE = {
  availableStudentsList: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/TeacherGetStudents/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/TeacherGetStudents/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/TeacherGetStudents/Success':
      return {
        availableStudentsList: payload.availableStudentsList,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
