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
  adminStatistics as statisticsActions,
} from '../actions';

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
    .catch(err => dispatch(activitiesActions.adminActivitiesRequest(err)));
};

export const getAdminTeachers = param => (dispatch) => {
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

  dispatch(teachersActions.adminTeachersRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(teachersActions.adminTeachersSuccess(body)))
    .catch(err => dispatch(teachersActions.adminTeachersRequest(err)));
};

export const getAdminStudents = param => (dispatch) => {
  let pagination = 0;
  const query = `${startQuery}/students?skip=${pagination}`;
  pagination += 15;

  dispatch(studentsActions.adminStudentsRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(studentsActions.adminStudentsSuccess(body)))
    .catch(err => dispatch(studentsActions.adminStudentsRequest(err)));
};

export const getAdminTasks = param => (dispatch) => {
  let pagination = 0;
  const query = `${startQuery}/tasks?skip=${pagination}`;
  pagination += 15;

  dispatch(tasksActions.adminTasksRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(tasksActions.adminTasksSuccess(body)))
    .catch(err => dispatch(tasksActions.adminTasksRequest(err)));
};

export const getAdminQuestions = param => (dispatch) => {
  let pagination = 0;
  const query = `${startQuery}/questions?skip=${pagination}`;
  pagination += 15;

  dispatch(questionsActions.adminQuestionsRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(questionsActions.adminQuestionsSuccess(body)))
    .catch(err => dispatch(questionsActions.adminQuestionsRequest(err)));
};

export const getAdminStatistics = param => (dispatch) => {
  let pagination = 0;
  const query = `${startQuery}/satistics?skip=${pagination}`;
  pagination += 15;

  dispatch(statisticsActions.adminStatisticsRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(statisticsActions.adminStatisticsSuccess(body)))
    .catch(err => dispatch(statisticsActions.adminStatisticsRequest(err)));
};

export const getAdminGroups = param => (dispatch) => {
  let pagination = 0;
  const query = `${startQuery}/groups?skip=${pagination}`;
  pagination += 15;

  dispatch(groupsActions.adminGroupsRequest());
  fetch(query,
    {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(body => dispatch(groupsActions.adminGroupsSuccess(body)))
    .catch(err => dispatch(groupsActions.adminGroupsRequest(err)));
};
