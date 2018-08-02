import { isNullOrUndefined } from 'util';
import englishToRussian from '../util/englishToRussian';
import firstLetterToUpperCase from '../util/firstLetterToUpperCase';
import {
  adminActivities as activitiesActions,
  adminTeachers as teachersActions,
  adminStudents as studentsActions,
  adminGroups as groupsActions,
  adminQuestions as questionsActions,
  adminTasks as tasksActions,
} from '../actions';

const startQuery = '/api/admin/';

const deleteKeysWithCondition = (object, condition) => {
  for (let key in object) { //eslint-disable-line
    if (condition(object[key])) {
      delete object[key];
    }
  }
  return object;
};

function propsToQuery(body, params) {
  let query = body;
  for (const key in params) { // eslint-disable-line
    if (!isNullOrUndefined(params[key])) {
      query += `${key}=${params[key]}&&`;
    }
  }
  return query;
}

export const getAdminActivities = param => (dispatch) => {
  let query = `${startQuery}activities?`;
  if (param.role == 'all') {
    param.role = '';
  }
  if (param.name && !isNullOrUndefined(param.name.match(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/ig))) {
    param.name = englishToRussian(param.name);
  }
  param.name = firstLetterToUpperCase(param.name);
  query = propsToQuery(query, param);
  dispatch(activitiesActions.adminActivitiesRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(activitiesActions.adminActivitiesSuccess(body)))
    .catch(err => dispatch(activitiesActions.adminActivitiesError(err)));
};

export const getAdminTeachers = param => (dispatch) => {
  let query = `${startQuery}teachers?`;
  query += 'skip=0';
  const body = {
    ...param,
  };
  if (body.university === 'all') {
    body.university = '';
  }
  dispatch(teachersActions.adminTeachersRequest());
  fetch(query,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(body => dispatch(teachersActions.adminTeachersSuccess(body)))
    .catch(err => dispatch(teachersActions.adminTeachersError(err)));
};

export const getAdminStudents = param => (dispatch) => {
  let query = `${startQuery}students?`;
  query += 'skip=0';

  const IsStringVoidOrAll = string => string === '' || string === 'all';

  deleteKeysWithCondition(param, IsStringVoidOrAll);
  console.log('param', param, 'query', query);
  dispatch(studentsActions.adminStudentsRequest());
  fetch(query,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
      body: JSON.stringify(param),
    })
    .then(response => response.json())
    .then(body => dispatch(studentsActions.adminStudentsSuccess(body)))
    .catch(err => dispatch(studentsActions.adminStudentsError(err)));
};

export const getAdminGroups = param => (dispatch) => {
  let query = `${startQuery}groups?`;
  query += 'skip=0';

  console.log('a\'m a dispatcher', param);

  const IsStringVoidOrAll = string => string === '';

  deleteKeysWithCondition(param, IsStringVoidOrAll);

  console.log('a\'m a dispatcher', param);

  dispatch(groupsActions.adminGroupsRequest());
  fetch(query,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
      body: JSON.stringify(param),
    })
    .then(response => response.json())
    .then(body => dispatch(groupsActions.adminGroupsSuccess(body)))
    .catch(err => dispatch(groupsActions.adminGroupsError(err)));
};

export const getAdminTasks = param => (dispatch) => {
  let query = `${startQuery}tasks?`;
  query += 'skip=0';

  console.log('a\'m a dispatcher before', param);

  const IsStringVoidOrAll = string => string === '' || string === 'all';

  deleteKeysWithCondition(param, IsStringVoidOrAll);

  console.log('a\'m a dispatcher after', param);

  dispatch(tasksActions.adminTasksRequest());
  fetch(query,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
      body: JSON.stringify(param),
    })
    .then(response => response.json())
    .then(body => dispatch(tasksActions.adminTasksSuccess(body)))
    .catch(err => dispatch(tasksActions.adminTasksRequest(err)));
};

export const getAdminQuestions = param => (dispatch) => {
  let query = `${startQuery}questions?`;
  query += 'skip=0';

  console.log('a\'m a dispatcher before', param);

  const IsStringVoidOrAll = string => string === '' || string === 'all';

  deleteKeysWithCondition(param, IsStringVoidOrAll);

  console.log('a\'m a dispatcher after', param);

  dispatch(questionsActions.adminQuestionsRequest());
  fetch(query,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
      body: JSON.stringify(param),
    })
    .then(response => response.json())
    .then(body => dispatch(questionsActions.adminQuestionsSuccess(body)))
    .catch(err => dispatch(questionsActions.adminQuestionsError(err)));
};
