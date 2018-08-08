import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/es/Input/Input';
import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
  dragAndDropOuterWrapper: {
    display: 'flex',
    height: '500px',
    width: '700px',
  },
  studentsContainer: {
    display: 'flex',
    'flex-direction': 'column',
    width: '50%',
    'border-right': `${theme.palette.custom.grayDivider} 1px`,
  },
  studentsHeader: {
    'line-height': '55px',
    background: theme.palette.custom.dark,
    color: theme.palette.custom.whiteText,
    padding: '0.25rem',
    height: '55px',
  },
  contentFit: {
    'font-size': '1em !important',
    color: `${theme.palette.custom.whiteText} !important`,
  },
  studentsWrap: {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
    'background-color': theme.palette.custom.background,
  },
  studentsLiner: {
    display: 'flex',
    'flex-direction': 'column',
    flex: 1,
    'flex-basis': 0,
    padding: '0.5rem',
    transition: 'all 0.15s ease-in-out',
    overflow: 'auto',
    '$::-webkit-scrollbar': {
      width: '8px',
    },
    '$::-webkit-scrollbar-track': {
      'background-color': 'rgba(255, 255, 255, .05)',
      'border-radius': '0 0 2px',
    },
    '$::-webkit-scrollbar-thumb': {
      'border-radius': '2px',
      'background-color': 'rgba(0, 0, 0, .25)',
      'margin-right': '2px',
    },
    '$::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
    '$::-webkit-scrollbar-button': {
      width: 0,
      height: 0,
    },
    '$::-webkit-scrollbar-thumb:active': {
      background: 'rgba(0, 0, 0, 0.4)',
    },
  },
  student: {
    background: theme.palette.custom.primary,
    padding: '0.75rem',
    color: theme.palette.custom.whiteText,
    cursor: 'pointer',
    position: 'relative',
    'list-style-type': 'none',
    marginBottom: '0.5rem',
  },
  studentContent: {
    fontSize: '1.25rem',
  },
});

class DragAndDropStudents extends React.Component {
  constructor(props) {
    super();
    this.state = {
      changeFlag: true,
    };
    this.selectedStudents = props.selectedStudents;
  }

  handleSingleLiClick(id) {
    let moveElem = this.availableStudents.find(element => element._id === id);
    if (moveElem !== undefined) {
      const index = this.availableStudents.indexOf(moveElem);
      this.availableStudents.splice(index, 1);
      this.selectedStudents.push(moveElem);
    } else {
      moveElem = this.selectedStudents.find(element => element._id === id);
      const index = this.selectedStudents.indexOf(moveElem);
      this.selectedStudents.splice(index, 1);
      this.availableStudents.push(moveElem);
    }
    this.setState({
      changeFlag: !this.state.changeFlag,
    });
  }

  render() {
    const { classes } = this.props;

    this.availableStudents = this.props.studentsPool.filter(
      element => this.selectedStudents.find(selElem => selElem._id === element._id) === undefined,
    );

    return (
      <div className={classes.dragAndDropOuterWrapper}>
        <div className={classes.studentsContainer}>
          <div className={classes.studentsHeader}>Студенты</div>
          <div className={classes.studentsWrap}>
            <ul className={classes.studentsLiner} id="students">
              {this.availableStudents.map(student => (
                <li
                  className={classes.student}
                  key={student._id}
                  onClick={() => this.handleSingleLiClick(student._id)}
                >
                  <div className={classes.studentContent}>
                    {`${student.firstName} ${student.lastName}`}
                  </div>
                  <div className={classes.studentContent}>
                    {`${student.email}`}
                  </div>
                  <div className={classes.studentContent}>
                    {`${student.university}`}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={classes.studentsContainer}>
          <Input
            id="Student Email"
            placeholder="Введите имя"
            className={`${classes.contentFit} ${classes.studentsHeader}`}
            onChange={event => this.props.nameChangedCallback(event.target.value)}
          />
          <div className={classes.studentsWrap}>
            <ul className={classes.studentsLiner} id="students">
              {this.selectedStudents.map(student => (
                <li
                  className={classes.student}
                  key={student._id}
                  onClick={() => this.handleSingleLiClick(student._id)}
                >
                  <div className={classes.studentContent}>
                    {`${student.firstName} ${student.lastName}`}
                  </div>
                  <div className={classes.studentContent}>
                    {`${student.email}`}
                  </div>
                  <div className={classes.studentContent}>
                    {`${student.university}`}
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

DragAndDropStudents.propTypes = {
  studentsPool: PropTypes.array.isRequired,
  nameChangedCallback: PropTypes.func.isRequired,
  selectedStudents: PropTypes.array.isRequired,
};

export default withStyles(styles)(DragAndDropStudents);
