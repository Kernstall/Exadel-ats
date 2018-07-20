import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FilterStudentCard from './FilterFieldsCard.jsx';
import DragAndDropStudents from './DragAndDropStudents';
import { getAvailableStudents } from '../../commands/teacherCreateGroups';
import Spinner from "../shared/spinner";

const styles = {
  FlexContainerHorizontal: {
    display: 'flex',
    'flex-wrap': 'wrap',
    width: '100%',
  },
};

class TeacherAddGroup extends React.Component {
  componentDidMount() {
    this.props.getAvailableStudents(/*{ Filter will be here }*/); // eslint-disable-line
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.FlexContainerHorizontal}>
        <FilterStudentCard />
        {this.props.teacher_AvailableStudentsList ? <DragAndDropStudents studentsPool={this.props.teacher_AvailableStudentsList} /> : <Spinner /> }
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(TeacherAddGroup);

const mapStateToProps = state => ({
  isLoading: state.teacherCreateGroup.isLoading,
  teacher_AvailableStudentsList: state.teacherCreateGroup.teacher_AvailableStudentsList,
});

const mapCommandsToProps = dispatch => ({
  getAvailableStudents: param => dispatch(getAvailableStudents(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(styledComponent);
