export const questionsError = error => ({
  type: 'Entity/Questions/Error',
  payload: { error },
});

export const questionsRequest = () => ({
  type: 'Entity/Questions/Request',
});

export const questionsSuccess = questionsList => ({
  type: 'Entity/Questions/Success',
  payload: { questionsList },
});

export default {
  questionsError,
  questionsRequest,
  questionsSuccess,
};
