import { combineReducers } from 'redux';
import students from './students';
import studentGroups from './studentGroups';

export default combineReducers({
  students,
  studentGroups,
});
