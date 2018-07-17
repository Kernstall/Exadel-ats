export const studentGroupsError = error => ({
  type: 'Entity/StudentGroups/Error',
  payload: { error },
});

export const studentGroupsRequest = () => ({
  type: 'Entity/StudentGroups/Request',
});

export const studentGroupsSuccess = studentGroups => ({
  type: 'Entity/StudentGroups/Success',
  payload: { studentGroups },
});

export default {
  studentGroupsError,
  studentGroupsRequest,
  studentGroupsSuccess,
};
