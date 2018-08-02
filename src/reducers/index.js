import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';
import studentTasks from './studentTasks';
import adminActivities from './adminActivities';
import adminGroups from './adminGroups';
import adminStatistics from './adminStatistics';
import adminStudents from './adminStudents';
import adminTasks from './adminTasks';
import adminTeachers from './adminTeachers';
import adminTests from './adminTests';
import studentHistory from './studentHistory';
import teacherCreateGroup from './teacherCreateGroup';
import userLogin from './userLogin';
import studentTests from './studentTests';
import teacherQuestions from './teacherQuestions';
import teacherTasks from './teacherTasks';
import errorMessage from './errorMessage';
import attemptCode from './attemptCode';
import taskInfo from './taskInfo';
import teacherCreateTestQuestion from './teacherCreateTestQuestion';

export default combineReducers({
  students,
  studentGroups,
  studentTasks,
  adminActivities,
  adminGroups,
  adminStatistics,
  adminStudents,
  adminTasks,
  adminTeachers,
  adminTests,
  studentHistory,
  teacherCreateGroup,
  userLogin,
  studentTests,
  teacherQuestions,
  teacherTasks,
  errorMessage,
  attemptCode,
  taskInfo,
  teacherCreateTestQuestion,
});
