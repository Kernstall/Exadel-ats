export const adminStatisticsError = error => ({
  type: 'Entity/adminStatistics/Error',
  payload: { error },
});

export const adminStatisticsRequest = () => ({
  type: 'Entity/adminStatistics/Request',
});

export const adminStatisticsSuccess = adminStatistics => ({
  type: 'Entity/adminStatistics/Success',
  payload: { adminStatistics },
});

export default {
  adminStatisticsError,
  adminStatisticsRequest,
  adminStatisticsSuccess,
};
