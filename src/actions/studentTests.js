export const testsError = error => ({
  type: 'Entity/Tests/Error',
  payload: { error },
});

export const testsRequest = () => ({
  type: 'Entity/Tests/Request',
});

export const testsSuccess = testsList => ({
  type: 'Entity/Tests/Success',
  payload: { testsList },
});

export default {
  testsError,
  testsRequest,
  testsSuccess,
};
