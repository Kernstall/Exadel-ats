const getTaskInfoError = error => ({
  type: 'Teacher/Task/Info/Error',
  payload: { error },
});

const getTaskInfoRequest = () => ({
  type: 'Teacher/Task/Info/Request',
});

const getTaskInfoSuccess = taskInfo => ({
  type: 'Teacher/Task/Info/Success',
  payload: { taskInfo },
});

export default {
  getTaskInfoError,
  getTaskInfoRequest,
  getTaskInfoSuccess,
};
