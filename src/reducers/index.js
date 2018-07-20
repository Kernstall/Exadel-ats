import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';
import studentTasks from './studentTasks';
import activities from './activities';
import studentHistory from './studentHistory';

export default combineReducers({
  students,
  studentGroups,
  studentTasks,
  activities,
  studentHistory,
});
