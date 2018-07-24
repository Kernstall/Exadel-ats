export const historyError = error => ({
  type: 'Entity/History/Error',
  payload: { error },
});

export const historyRequest = () => ({
  type: 'Entity/History/Request',
});

export const historySuccess = historyList => ({
  type: 'Entity/History/Success',
  payload: { historyList },
});

export default {
  historyError,
  historyRequest,
  historySuccess,
};
