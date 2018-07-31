import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button/Button';
import FilterStudentCard from './FilterFieldsCard.jsx';
import DragAndDropStudents from './DragAndDropStudents';
import { getAvailableStudents, teacherCreateGroup } from '../../commands/teacherCreateGroups';
import Spinner from '../shared/spinner';

const styles = theme => ({
  FlexContainerHorizontal: {
    display: 'flex',
    'flex-wrap': 'wrap',
    width: '100%',
    marginTop: '10px',
    height: '80%',
  },
  button: {
    marginTop: '5px',
    float: 'right',
    backgroundColor: theme.palette.custom.dark,
    width: '100%',
    color: theme.palette.custom.whiteText,
    '&:hover': {
      color: theme.palette.custom.blackText,
    },
  },
  outerWrapper: {
    width: 'fit-content',
    margin: 'auto',
    marginBottom: '15px',
  },
  dragAndDropWrapper: {
  },
});

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

    this.selectedStudents = [];
    this.groupName = '';

    this.handleFilterChanges = this.handleFilterChanges.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
  }

  componentDidMount() {
    this.props.getAvailableStudents(/*{ Filter will be here }*/); // eslint-disable-line
  }

  handleFilterChanges(filterObject) {
    this.setState({
      filter: filterObject,
    });
  }

  handleGroupNameChange(newName) {
    this.groupName = newName;
  }

  handleCreateGroup() {
    const studentIdArray = this.selectedStudents.map(element => element._id);
    const groupObject = {
      studentsList: studentIdArray,
      groupName: this.groupName,
    };
    this.props.teacherCreateGroup(groupObject);
  }

  render() {
    const { classes, availableStudentsList } = this.props;
    let filteredArray;
    if (availableStudentsList) {
      filteredArray = availableStudentsList.filter((element) => {
        const fName = (`${element.firstName} ${element.lastName}`).indexOf(this.state.filter.name) >= 0;
        const fEmail = element.email.indexOf(this.state.filter.email) >= 0;
        const fUnivesity = element.university === this.state.filter.university || this.state.filter.university === '';
        const fYear = isNaN(element.graduateYear === this.state.filter.year || this.state.filter.year);
        const fFaculty = element.faculty === this.state.filter.faculty || this.state.filter.faculty === '';
        return fName && fEmail && fFaculty && fUnivesity && fYear;
      });
    } else {
      filteredArray = [];
    }
    return (
      <div className={classes.outerWrapper}>
        <div className={classes.FlexContainerHorizontal}>
          <FilterStudentCard callback={this.handleFilterChanges} />

          {availableStudentsList
            ? (
              <div className={classes.dragAndDropWrapper}>
                <DragAndDropStudents studentsPool={filteredArray} selectedStudents={this.selectedStudents} nameChangedCallback={this.handleGroupNameChange} />
                <Button
                  className={classes.button}
                  onClick={this.handleCreateGroup}
                >
                  Создать группу
                </Button>
              </div>
            )
            : <Spinner />
          }
        </div>
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
  teacherCreateGroup: param => dispatch(teacherCreateGroup(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(styledComponent);
