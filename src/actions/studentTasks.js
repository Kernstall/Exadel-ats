export const tasksError = error => ({
  type: 'Entity/Tasks/Error',
  payload: { error },
});

export const tasksRequest = () => ({
  type: 'Entity/Tasks/Request',
});

export const tasksSuccess = taskList => ({
  type: 'Entity/Tasks/Success',
  payload: { taskList },
});

export default {
  tasksError,
  tasksRequest,
  tasksSuccess,
};
