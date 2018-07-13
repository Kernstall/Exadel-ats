import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../../Styles/Common';
import StudentInTop from './StudentInTop';
import { getStudents } from '../../commands/students';

const styles = ({
  width: {
    width: '100%',
  },
  ...sharedStyles,
});

class TopStudents extends React.Component {
  componentDidMount() {
    this.props.getStudents({ param: 'param for command' }); // eslint-disable-line
  }

  render() {
    const { classes, topScoreStudentName, students } = this.props;
    return (
      <List component="nav" className={[classes.width]}>
        {
          topScoreStudentName.map(
            (student, index) => (
              <StudentInTop
                student={student}
                key={index} //eslint-disable-line
                number={index}
              />
            ),
          )
        }
        {/*JSON.stringify(students)*/}
      </List>
    );
  }
}

const styledComponent = withStyles(styles)(TopStudents);

const mapStateToProps = state => ({
  isLoading: state.students.isLoading,
  students: state.students.students,
});

const mapCommandsToProps = dispatch => ({
  getStudents: param => dispatch(getStudents(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(styledComponent);
