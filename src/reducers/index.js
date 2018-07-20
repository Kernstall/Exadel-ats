import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';
import studentTasks from './studentTasks';
import activities from './activities';
import studentHistory from './studentHistory';
import teacherCreateGroup from './teacherCreateGroup';

export default combineReducers({
  students,
  studentGroups,
  studentTasks,
  activities,
  studentHistory,
  teacherCreateGroup,

});
