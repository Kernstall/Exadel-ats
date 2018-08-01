export const adminStudentsError = error => ({
  type: 'Entity/adminStudents/Error',
  payload: { error },
});

export const adminStudentsRequest = () => ({
  type: 'Entity/adminStudents/Request',
});

export const adminStudentsSuccess = adminStudents => ({
  type: 'Entity/adminStudents/Success',
  payload: { adminStudents },
});

export default {
  adminStudentsError,
  adminStudentsRequest,
  adminStudentsSuccess,
};
