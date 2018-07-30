import { isNullOrUndefined } from 'util';
import { activities as Actions } from '../actions';
import englishToRussian from '../util/englishToRussian';
import firstLetterToUpperCase from '../util/firstLetterToUpperCase';

const startQuery = '/api/admin/';

function propsToQuery(body, params) {
  let query = body;
  for (const key in params) { // eslint-disable-line
    if (!isNullOrUndefined(params[key])) {
      query += `${key}=${params[key]}&&`;
    }
  }
  return query;
}

export const getActivities = param => (dispatch) => {
  let query = `${startQuery}activities?`;
  if (param.role == 'all') {
    param.role = '';
  }
  if (param.name && !isNullOrUndefined(param.name.match(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/ig))) {
    param.name = englishToRussian(param.name);
  }
  param.name = firstLetterToUpperCase(param.name);
  query = propsToQuery(query, param);
  dispatch(Actions.activitiesRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(Actions.activitiesSuccess(body)))
    .catch(err => dispatch(Actions.activitiesRequest(err)));
};

export const getTeachers = param => (dispatch) => {
  console.log('param', param);

  let query = `${startQuery}students?`;

  // if (param.name && !isNullOrUndefined(param.name.match(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/ig))) {
  //   param.name = englishToRussian(param.name);
  // }

  // param.name = firstLetterToUpperCase(param.name);
  // query = propsToQuery(query, param);

  let a = 0;
  query += `skip=${a}`;
  a += 10;

  dispatch(Actions.activitiesRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(Actions.activitiesSuccess(body)))
    .catch(err => dispatch(Actions.activitiesRequest(err)));
};
