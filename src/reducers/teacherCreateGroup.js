const INITIAL_STATE = {
  teacher_AvailableStudentsList: null,
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
        teacher_AvailableStudentsList: payload.teacher_AvailableStudentsList,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
