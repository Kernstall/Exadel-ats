export const adminActivitiesError = error => ({
  type: 'Entity/adminActivities/Error',
  payload: { error },
});

export const adminActivitiesRequest = () => ({
  type: 'Entity/adminActivities/Request',
});

export const adminActivitiesSuccess = adminActivities => ({
  type: 'Entity/adminActivities/Success',
  payload: { adminActivities },
});

export default {
  adminActivitiesError,
  adminActivitiesRequest,
  adminActivitiesSuccess,
};
