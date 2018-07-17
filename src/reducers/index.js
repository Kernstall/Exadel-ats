import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';
import studentTasks from './studentTasks';

export default combineReducers({
  students,
  studentGroups,
  studentTasks,
});
