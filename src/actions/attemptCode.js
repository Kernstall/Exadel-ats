export const attemptError = error => ({
  type: 'Entity/Attempt/Error',
  payload: { error },
});

export const attemptRequest = () => ({
  type: 'Entity/Attempt/Request',
});

export const attemptSuccess = attemptCode => ({
  type: 'Entity/Attempt/Success',
  payload: { attemptCode },
});

export default {
  attemptError,
  attemptRequest,
  attemptSuccess,
};
