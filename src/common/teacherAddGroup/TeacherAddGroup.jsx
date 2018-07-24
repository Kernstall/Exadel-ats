import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FilterStudentCard from './FilterFieldsCard.jsx';
import DragAndDropStudents from './DragAndDropStudents';
import { getAvailableStudents } from '../../commands/teacherCreateGroups';
import Spinner from '../shared/spinner';

const styles = {
  FlexContainerHorizontal: {
    display: 'flex',
    'flex-wrap': 'wrap',
    width: '100%',
  },
};

class TeacherAddGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: {
        name: '',
        email: '',
        university: '',
        faculty: '',
        year: undefined,
      },
    };

    this.handleFilterChanges = this.handleFilterChanges.bind(this);
  }

  componentDidMount() {
    this.props.getAvailableStudents(/*{ Filter will be here }*/); // eslint-disable-line
  }

  handleFilterChanges(filterObject) {
    console.log(filterObject);
    this.setState({
      filter: filterObject,
    });
  }

  render() {
    const { classes, availableStudentsList: availableStudentsList } = this.props;
    let filteredArray;
    if (availableStudentsList) {
      filteredArray = availableStudentsList.filter((element) => {
        const fName = (element.firstName + ' ' + element.lastName).indexOf(this.state.filter.name) >= 0;
        const fEmail = element.email.indexOf(this.state.filter.email) >= 0;
        const fUnivesity = element.university === this.state.filter.university || this.state.filter.university === ' ';
        const fYear = element.graduateYear === this.state.filter.year || this.state.filter.year === undefined;
        const fFaculty = element.faculty === this.state.filter.faculty || this.state.filter.faculty === ' ';
        return fName && fEmail;
      });
    } else {
      filteredArray = [];
    }
    return (
      <div className={classes.FlexContainerHorizontal}>
        <FilterStudentCard callback={this.handleFilterChanges} />
        {availableStudentsList ? <DragAndDropStudents studentsPool={filteredArray} /> : <Spinner /> }
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(TeacherAddGroup);

const mapStateToProps = state => ({
  isLoading: state.teacherCreateGroup.isLoading,
  availableStudentsList: state.teacherCreateGroup.availableStudentsList,
});

const mapCommandsToProps = dispatch => ({
  getAvailableStudents: param => dispatch(getAvailableStudents(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(styledComponent);
