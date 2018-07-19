export const activitiesError = error => ({
  type: 'Entity/Activities/Error',
  payload: { error },
});

export const activitiesRequest = () => ({
  type: 'Entity/Activities/Request',
});

export const activitiesSuccess = activities => ({
  type: 'Entity/Activities/Success',
  payload: { activities },
});

export default {
  activitiesError,
  activitiesRequest,
  activitiesSuccess,
};
