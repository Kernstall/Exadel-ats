import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';
import studentTasks from './studentTasks';
import activities from './activities';
import studentHistory from './studentHistory';
import teacherCreateGroup from './teacherCreateGroup';
import userLogin from './userLogin';
import studentTests from './studentTests';
import teacherQuestions from './teacherQuestions';
import teacherTasks from './teacherTasks';
import errorMessage from './errorMessage';
import attemptCode from './attemptCode';
import taskInfo from './taskInfo';

export default combineReducers({
  students,
  studentGroups,
  studentTasks,
  activities,
  studentHistory,
  teacherCreateGroup,
  userLogin,
  studentTests,
  teacherQuestions,
  teacherTasks,
  errorMessage,
  attemptCode,
  taskInfo,
});
