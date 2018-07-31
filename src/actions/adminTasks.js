export const adminTasksError = error => ({
  type: 'Entity/adminTasks/Error',
  payload: { error },
});

export const adminTasksRequest = () => ({
  type: 'Entity/adminTasks/Request',
});

export const adminTasksSuccess = adminTasks => ({
  type: 'Entity/adminTasks/Success',
  payload: { adminTasks },
});

export default {
  adminTasksError,
  adminTasksRequest,
  adminTasksSuccess,
};
