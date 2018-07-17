export const studentsError = error => ({
  type: 'Entity/Students/Error',
  payload: { error },
});

export const studentsRequest = () => ({
  type: 'Entity/Students/Request',
});

export const studentsSuccess = students => ({
  type: 'Entity/Students/Success',
  payload: { students },
});

export default {
  studentsError,
  studentsRequest,
  studentsSuccess,
};
