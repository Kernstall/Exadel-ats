import { isNullOrUndefined } from 'util';
import { activities as Actions } from '../actions';
import englishToRussian from '../util/englishToRussian';
import firstLetterToUpperCase from '../util/firstLetterToUpperCase';

// eslint-disable-next-line
export const getActivities = (param) => (dispatch) => {

  function propsToQuery(body, params) {
    let query = body;
    for (const key in params) { // eslint-disable-line
      if (!isNullOrUndefined(params[key])) {
        query += `${key}=${params[key]}&&`;
      }
    }
    return query;
  }

  let query = '/api/admin/activities?';
  if (param.role == 'all') { // TODO : delete it immideatly
    param.role = '';
  }
  if (param.name && !isNullOrUndefined(param.name.match(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/ig))) {
    param.name = englishToRussian(param.name);
  }
  param.name = firstLetterToUpperCase(param.name);
  query = propsToQuery(query, param);
  console.log(query);
  dispatch(Actions.activitiesRequest());
  fetch(query)
    .then(response => response.json())
    .then(body => dispatch(Actions.activitiesSuccess(body)))
    .catch(err => dispatch(Actions.activitiesRequest(err)));
};
