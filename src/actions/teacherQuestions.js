const getTeacherQuestionsError = error => ({
  type: 'Teacher/Questions/Error',
  payload: { error },
});

const getTeacherQuestionsRequest = () => ({
  type: 'Teacher/Questions/Request',
});

const getTeacherQuestionsSuccess = teacherQuestions => ({
  type: 'Teacher/Questions/Success',
  payload: { teacherQuestions },
});

export default {
  getTeacherQuestionsError,
  getTeacherQuestionsRequest,
  getTeacherQuestionsSuccess,
};
