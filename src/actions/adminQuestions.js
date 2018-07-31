export const adminQuestionsError = error => ({
  type: 'Entity/adminQuestions/Error',
  payload: { error },
});

export const adminQuestionsRequest = () => ({
  type: 'Entity/adminQuestions/Request',
});

export const adminQuestionsSuccess = adminQuestions => ({
  type: 'Entity/adminQuestions/Success',
  payload: { adminQuestions },
});

export default {
  adminQuestionsError,
  adminQuestionsRequest,
  adminQuestionsSuccess,
};
