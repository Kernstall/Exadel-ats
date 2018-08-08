const studentSubmitTestError = error => ({
  type: 'Entity/StudentSubmitTest/Error',
  payload: error,
});

const studentSubmitTestRequest = testRequestObject => ({
  type: 'Entity/StudentSubmitTest/Request',
  payload: testRequestObject,
});

const studentSubmitTestSuccess = () => ({
  type: 'Entity/StudentSubmitTest/Success',
});

export default {
  studentSubmitTestError,
  studentSubmitTestRequest,
  studentSubmitTestSuccess,
};
