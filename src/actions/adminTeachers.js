export const adminTeachersError = error => ({
  type: 'Entity/adminTeachers/Error',
  payload: { error },
});

export const adminTeachersRequest = () => ({
  type: 'Entity/adminTeachers/Request',
});

export const adminTeachersSuccess = adminTeachers => ({
  type: 'Entity/adminTeachers/Success',
  payload: { adminTeachers },
});

export default {
  adminTeachersError,
  adminTeachersRequest,
  adminTeachersSuccess,
};
