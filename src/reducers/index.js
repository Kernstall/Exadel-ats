import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';
import studentTasks from './studentTasks';
import adminActivities from './adminActivities';
import adminGroups from './adminGroups';
import adminStudents from './adminStudents';
import adminTasks from './adminTasks';
import adminTeachers from './adminTeachers';
import adminQuestions from './adminQuestions';
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
import passingTest from './passingTest';
<<<<<<< HEAD
=======
import studentSubmitTest from './studentSubmitTest';
>>>>>>> 837f0752e274bed584a0451e4da029c0c7bccdca

export default combineReducers({
  students,
  studentGroups,
  studentTasks,
  adminActivities,
  adminGroups,
  adminStudents,
  adminTasks,
  adminTeachers,
  adminQuestions,
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
  passingTest,
<<<<<<< HEAD
=======
  studentSubmitTest,
>>>>>>> 837f0752e274bed584a0451e4da029c0c7bccdca
});
