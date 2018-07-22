import { activities as Actions } from '../actions';
import { isNullOrUndefined } from 'util';

// eslint-disable-next-line
export const getActivities = (param) => (dispatch) => {

  function propsToQuery(body, params) {
    let query = body;
    for (const key in params) { // eslint-disable-line
      if (!isNullOrUndefined(params[key]))
        query += `${key}=${params[key]}&&`;
    }
    return query;
  }

  let query = 'api/admin/activities?';
  if (param.role == 'all') { // TODO : delete it immideatly
    param.role = '';
  }
  query = propsToQuery(query, param);
  console.log(query);
  dispatch(Actions.activitiesRequest());
  fetch(query)
    .then(response => response.json())
    .then(body => dispatch(Actions.activitiesSuccess(body)))
    .catch(err => dispatch(Actions.activitiesRequest(err)));
};
