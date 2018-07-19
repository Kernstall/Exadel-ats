import { activities as Actions } from '../actions';

// eslint-disable-next-line
export const getActivities = (param) => (dispatch) => {
  dispatch(Actions.activitiesRequest());
  fetch('api/admin/activities')
    .then(response => response.json())
    .then(body => dispatch(Actions.activitiesSuccess(body)))
    .catch(err => dispatch(Actions.activitiesRequest(err)));
};


// example

// const enum = (isFilter)
//   ? [ name, role, activityType ]
//   : null
// const query = api/admin/activities?filter=`${filter}`;
