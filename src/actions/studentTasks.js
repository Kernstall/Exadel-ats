export const tasksError = error => ({
  type: 'Entity/Tasks/Error',
  payload: { error },
});

export const tasksRequest = () => ({
  type: 'Entity/Tasks/Request',
});

export const tasksSuccess = tasksList => ({
  type: 'Entity/Tasks/Success',
  payload: { tasksList },
});

export default {
  tasksError,
  tasksRequest,
  tasksSuccess,
};
