import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';
import studentTasks from './studentTasks';
import activities from './activities';
import studentHistory from './studentHistory';
import teacherCreateGroup from './teacherCreateGroup';
import studentTests from './studentTests';
import teacherQuestions from './teacherQuestions';
import teacherTasks from './teacherTasks';

export default combineReducers({
  students,
  studentGroups,
  studentTasks,
  activities,
  studentHistory,
  teacherCreateGroup,
  studentTests,
  teacherQuestions,
  teacherTasks,
});
