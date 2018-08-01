export const adminGroupsError = error => ({
  type: 'Entity/adminGroups/Error',
  payload: { error },
});

export const adminGroupsRequest = () => ({
  type: 'Entity/adminGroups/Request',
});

export const adminGroupsSuccess = adminGroups => ({
  type: 'Entity/adminGroups/Success',
  payload: { adminGroups },
});

export default {
  adminGroupsError,
  adminGroupsRequest,
  adminGroupsSuccess,
};
